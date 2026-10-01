import { GoogleGenAI } from "@google/genai";
import { LENORMAND_CARDS, LENORMAND_HOUSES, AFRODITE_HOUSES, PIRAMIDE_HOUSES } from "./constants";
import { SpreadType, StudyLevel, ReadingTheme } from "./types";
import * as Geometry from "./geometryService";

// ==========================================
// CHAVE DE API — localStorage (pessoal, sem custos extras)
// A MESMA chave do AuxCards pode ser usada aqui: a cota free
// é por conta Google, não por aplicativo.
// ==========================================
const KEY_STORAGE = "lumina_gemini_key";
const MODELO_LUMINA = "gemini-3.6-flash";
const MAX_TENTATIVAS = 4;
const ESPERA_BASE_MS = 4000;

export const getApiKey = (): string => {
  if (typeof localStorage === "undefined") return "";
  return localStorage.getItem(KEY_STORAGE) || "";
};

export const setApiKey = (key: string): void => {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem(KEY_STORAGE, key.trim());
};

const ensureApiKey = (): string => {
  let key = getApiKey();
  if (!key && typeof window !== "undefined") {
    const typed = window.prompt(
      "Cole sua chave Gemini gratuita (Google AI Studio).\nEla fica salva SOMENTE neste navegador:"
    );
    if (typed && typed.trim()) {
      setApiKey(typed);
      key = typed.trim();
    }
  }
  return key;
};

// ==========================================
// CLASSIFICAÇÃO DE ERROS + RETRY COM BACKOFF
// ==========================================
type ClasseErro = "chave" | "cota" | "demanda" | "rede" | "desconhecido";

const classificarErro = (e: any): ClasseErro => {
  const status = e?.status ?? e?.response?.status ?? e?.code;
  const msg = String(e?.message || e || "").toUpperCase();
  if (
    status === 400 || status === 401 || status === 403 ||
    msg.includes("API_KEY_INVALID") || msg.includes("PERMISSION_DENIED") ||
    msg.includes("API KEY NOT VALID")
  ) return "chave";
  if (status === 429 || msg.includes("RESOURCE_EXHAUSTED") || msg.includes("QUOTA")) return "cota";
  if (
    status === 503 || status === 502 || status === 500 ||
    msg.includes("UNAVAILABLE") || msg.includes("HIGH DEMAND") || msg.includes("OVERLOADED")
  ) return "demanda";
  if (msg.includes("FAILED TO FETCH") || msg.includes("NETWORK") || msg.includes("ERR_NETWORK")) return "rede";
  return "desconhecido";
};

const ehRetentavel = (c: ClasseErro) => c === "demanda" || c === "cota" || c === "rede";

const mensagemErro = (c: ClasseErro): string => {
  switch (c) {
    case "chave":
      return "Chave Gemini inválida ou sem permissão. No console (F12), rode localStorage.removeItem('lumina_gemini_key'), recarregue e cole a chave novamente.";
    case "cota":
      return "Cota gratuita do minuto esgotada (429). A chave é compartilhada com o AuxCards, então os usos se somam. Aguarde ~1 minuto e tente de novo.";
    case "demanda":
      return "Alta demanda no Gemini (503). O Lumina já refez várias tentativas automaticamente. Aguarde 1–2 minutos e clique novamente.";
    case "rede":
      return "Falha de rede ao contatar o Gemini. Verifique sua conexão e tente novamente.";
    default:
      return "Erro de conexão com o Mentor. Verifique sua chave ou aguarde (cota gratuita).";
  }
};

const getCardName = (id: number | null) => {
  if (id === null) return "Vazio";
  return LENORMAND_CARDS.find(c => c.id === id)?.name || "Desconhecido";
};

export const getDetailedCardAnalysis = async (
  boardState: (number | null)[],
  selectedIndex: number,
  theme: ReadingTheme = 'Geral',
  spreadType: SpreadType = 'mesa-real',
  level: StudyLevel = 'Iniciante',
  isStudyMode: boolean = false,
  accessType: string = 'full'
) => {
  const apiKey = ensureApiKey();
  if (!apiKey) return "Chave Gemini não informada. Recarregue a página e cole sua chave gratuita.";

  const selectedCardId = boardState[selectedIndex];
  if (selectedCardId === null) return "Selecione uma casa ocupada para análise.";

  const card = LENORMAND_CARDS.find(c => c.id === selectedCardId);

  let house;
  if (spreadType === 'relogio') {
    if (selectedIndex === 12) {
      house = { id: 113, name: "Tom da Leitura", theme: "Síntese Anual", month: "Centro", zodiac: "N/A" } as any;
    } else {
      house = LENORMAND_HOUSES.find(h => h.id === (101 + selectedIndex));
    }
  } else if (spreadType === 'templo-afrodite') {
    house = AFRODITE_HOUSES[selectedIndex];
  } else if (spreadType === 'piramide') {
    house = PIRAMIDE_HOUSES[selectedIndex];
  } else {
    house = LENORMAND_HOUSES[selectedIndex];
  }

  if (!house) return "Erro ao localizar contexto da casa.";

  let geometries: any = {};
  const includeDeepGeometry = accessType === 'full' || accessType === 'premium' || accessType === 'admin';

  if (spreadType === 'mesa-real') {
    const rawGeometry = Geometry.getCardGeometry(selectedIndex, spreadType);

    if (rawGeometry && includeDeepGeometry) {
      geometries = {
        card_at_house_meaning: `A carta ${card?.name} na casa ${house.name} (Casa ${selectedIndex + 1})`,
        technical_connections: {
          mirrors: rawGeometry.mirrors.map(idx => ({ card: getCardName(boardState[idx]), house: idx + 1 })),
          knights: rawGeometry.knights.map(idx => ({ card: getCardName(boardState[idx]), house: idx + 1 })),
          diagonals: rawGeometry.diagonals.map(idx => ({ card: getCardName(boardState[idx]), house: idx + 1 }))
        },
        frame_cards: rawGeometry.frame.map(idx => getCardName(boardState[idx]))
      };
    } else {
      geometries = {
        significado_basico: "Análise direta da carta na casa.",
      };
    }
  } else if (spreadType === 'relogio') {
    const centerCardName = getCardName(boardState[12]);
    geometries = {
      temporal_context: {
        month: house.month,
        zodiac: house.zodiac,
        house_theme: house.theme
      },
      central_influence: {
        center_card: centerCardName,
        role: "Filtro Central e Regente do Ano"
      },
      oposto: includeDeepGeometry ? getCardName(boardState[Geometry.getOposicaoRelogio(selectedIndex)]) : "Conteúdo Premium",
      eixo_conceitual: includeDeepGeometry ? Geometry.getEixoConceitualRelogio(selectedIndex) : "Conteúdo Premium",
    };
  } else if (spreadType === 'mesa-9') {
    const isCenter = selectedIndex === 4;
    geometries = {
      posicao_na_grade: isCenter ? "CENTRO (Foco)" : "Periferia/Influência",
      foco_central_leitura: getCardName(boardState[4])
    };
  } else if (spreadType === 'templo-afrodite') {
    geometries = {
      plano_relacional: house.theme,
      tipo_de_fluxo: "Comparativo entre polos"
    };
  } else if (spreadType === 'piramide') {
    geometries = {
      hierarquia_piramide: "Invertida (Funil)",
      camada: selectedIndex < 3 ? "Topo (Opções/Mental)" : selectedIndex < 5 ? "Meio (Ação/Sentimento)" : "Base (Síntese)",
      instrucao_especial: "As cartas do topo (1-3) são o contexto, as do meio (4-5) a evolução, e a base (6) a conclusão. Analise a carta selecionada considerando essa hierarquia."
    };
  }

  const context = {
    spreadType,
    level,
    selected: {
      card: card?.name,
      house: house.name,
      house_theme_original: house.theme,
      polarity: card?.polarity,
    },
    reading_expansion_theme: theme,
    geometries
  };

  const systemBase = isStudyMode
    ? `Aja como um Professor Sênior de Lenormand (Escola Alemã). Foco: Didática, Sintaxe e Mecânica.`
    : `Aja como um Oráculo Moderno e Místico. Foco: Interpretação, Aconselhamento e Síntese.`;

  const restrictions = `
  MODO COMPLETO (ACESSO TOTAL):
  1. Forneça uma análise técnica profunda, detalhada e sem limites de tamanho.
  2. Explique as conexões geométricas (espelhos, cavalos, diagonais) se aplicável.
  3. Cruze os significados da Carta com a Casa de forma rica.
  `;

  const systemPrompt = `${systemBase}\n${restrictions}`;

  const userPrompt = `
      DADOS DA LEITURA:
      Carta: ${card?.name}
      Casa: ${house.name} (Tema: ${house.theme})
      Contexto: ${JSON.stringify(geometries)}
      Nível do Estudante: ${level}
      Tema da Pergunta: ${theme}

      Gere a resposta em Markdown estruturado.
  `;

  const ai = new GoogleGenAI({ apiKey });

  // Retry com backoff para erros transitórios (503/429/rede)
  let ultimoErro: any = null;
  for (let tentativa = 1; tentativa <= MAX_TENTATIVAS; tentativa++) {
    try {
      const response = await ai.models.generateContent({
        model: MODELO_LUMINA,
        contents: systemPrompt + "\n" + userPrompt,
      });
      return response.text || "Erro na síntese.";
    } catch (error) {
      ultimoErro = error;
      const classe = classificarErro(error);
      if (!ehRetentavel(classe) || tentativa === MAX_TENTATIVAS) {
        return mensagemErro(classe);
      }
      await new Promise(r => setTimeout(r, ESPERA_BASE_MS * tentativa));
    }
  }
  return mensagemErro(classificarErro(ultimoErro));
};