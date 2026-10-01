
import { LenormandCard, LenormandHouse, Polarity, Timing, FundamentalModule, StudyBalloon } from './types';

export const GEOMETRY_GUIDE = {
  BRIDGE: { title: "Ponte Bridge", desc: "O dono da casa onde a carta caiu revela a causa raiz." },
  MIRROR: { title: "Espelho 🪞", desc: "Dobre a mesa. Pontas opostas revelam o equilíbrio secreto." },
  KNIGHT: { title: "Cavalo 🐎", desc: "2 casas + 1 (em L). Revela fofocas e o que está 'dobrando a esquina'." },
  FRAME: { title: "Moldura 🖼️", desc: "Casas 1, 8, 25 e 32. O clima geral da vida." },
  VEREDITO: { title: "Veredito Final ⚖️", desc: "Casas 33, 34, 35 e 36. O destino inevitável." },
  DIAGONALS: { title: "Diagonais 🔺🔻", desc: "Influências ascendentes e descendentes que modulam a força da carta." }
};

export const PIRAMIDE_HOUSES: LenormandHouse[] = [
  { id: 301, name: "Topo 1 (Mental/Opção A)", polarity: Polarity.NEUTRAL, theme: "Cenário Atual", technicalDescription: "Representa o plano das ideias, possibilidades ou o cenário mental do consulente.", pedagogicalRule: "Base do pensamento." },
  { id: 302, name: "Topo 2 (Mental/Opção B)", polarity: Polarity.NEUTRAL, theme: "Cenário Atual", technicalDescription: "Outra vertente de pensamento ou possibilidade no horizonte.", pedagogicalRule: "Alternativa mental." },
  { id: 303, name: "Topo 3 (Mental/Opção C)", polarity: Polarity.NEUTRAL, theme: "Cenário Atual", technicalDescription: "Terceiro aspecto do contexto ou influência externa imediata.", pedagogicalRule: "Contexto expandido." },
  { id: 304, name: "Meio 1 (Ação/Sentimento)", polarity: Polarity.NEUTRAL, theme: "Caminho de Ação", technicalDescription: "Como as ideias descem para o plano da ação ou sentimento. O filtro emocional.", pedagogicalRule: "Afunilamento da energia." },
  { id: 305, name: "Meio 2 (Ação/Sentimento)", polarity: Polarity.NEUTRAL, theme: "Caminho de Ação", technicalDescription: "A postura prática ou reação emocional diante das opções do topo.", pedagogicalRule: "Afunilamento da energia." },
  { id: 306, name: "Base (Síntese)", polarity: Polarity.NEUTRAL, theme: "Resultado Final", technicalDescription: "A conclusão inevitável, a soma de todas as influências anteriores.", pedagogicalRule: "O ponto de materialização." }
];

export const AFRODITE_HOUSES: LenormandHouse[] = [
  { id: 201, name: "Mental do Consultante", polarity: Polarity.NEUTRAL, theme: "Planos Mentais", technicalDescription: "O que o consultante pensa e projeta racionalmente sobre a relação.", pedagogicalRule: "Compare com o Mental do Parceiro." },
  { id: 202, name: "Sentimental do Consultante", polarity: Polarity.NEUTRAL, theme: "Planos Emocionais", technicalDescription: "Os sentimentos reais e profundos que o consultante nutre.", pedagogicalRule: "Compare com o Sentimental do Parceiro." },
  { id: 203, name: "Atitudes do Consultante", polarity: Polarity.NEUTRAL, theme: "Planos Físicos/Ação", technicalDescription: "Como o consultante se comporta na prática e o que demonstra externamente.", pedagogicalRule: "Compare com as Atitudes do Parceiro." },
  { id: 204, name: "Mental do Parceiro(a)", polarity: Polarity.NEUTRAL, theme: "Planos Mentais", technicalDescription: "O que a outra pessoa pensa e projeta racionalmente sobre a relação.", pedagogicalRule: "Compare com o Mental do Consultante." },
  { id: 205, name: "Sentimental do Parceiro(a)", polarity: Polarity.NEUTRAL, theme: "Planos Emocionais", technicalDescription: "Os sentimentos reais e profundos que a outra pessoa nutre.", pedagogicalRule: "Compare com o Sentimental do Consultante." },
  { id: 206, name: "Atitudes do Parceiro(a)", polarity: Polarity.NEUTRAL, theme: "Planos Físicos/Ação", technicalDescription: "Como a outra pessoa se comporta na prática e o que demonstra externamente.", pedagogicalRule: "Compare com as Atitudes do Consultante." },
  { id: 207, name: "Síntese / Destino", polarity: Polarity.NEUTRAL, theme: "Futuro e Conexão", technicalDescription: "A energia resultante da interação e a tendência futura da relação.", pedagogicalRule: "Sintetiza todos os planos comparados." },
];

export const LENORMAND_CARDS: LenormandCard[] = [
  { 
    id: 1, 
    name: "Cavaleiro", 
    suit: "Nove de Copas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Extrovertido", "comunicativo", "confiante", "elegante", "ativo"],
    briefInterpretation: "Indica chegada rápida de notícias, informações ou acontecimentos. Representa movimento, ação imediata, avanço e algo que vem ao encontro do consulente.", 
    interpretationAtOrigin: "Notícia chegando, mensagem importante, visita inesperada, entrega, início rápido de algo novo, deslocamento ou mudança em andamento.",
    description: "Indica chegada rápida de notícias, informações ou acontecimentos.",
    amor: "Chegada de uma nova pessoa, início acelerado de um relacionamento, mensagens românticas ou alguém tomando iniciativa.",
    trabalho: "Resposta aguardada, proposta profissional, mudança no ambiente de trabalho, entrega de projetos ou novidades rápidas.",
    dinheiro: "Notícias financeiras, orçamentos, propostas, investimentos em movimento ou dinheiro a caminho.",
    conselhos: "Avance, tome iniciativa, siga em frente sem hesitação. Aja enquanto o movimento está favorável."
  },
  { 
    id: 2, 
    name: "Trevo", 
    suit: "Seis de Ouros", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Leve", "otimista", "alegre", "despreocupado", "alguém naturalmente afortunado"],
    briefInterpretation: "Indica sorte rápida, oportunidades inesperadas e pequenas bênçãos. Atua como carta de alívio, suavizando dificuldades próximas.", 
    interpretationAtOrigin: "Oportunidade inesperada, golpe de sorte, mudança positiva repentina, surpresa agradável.",
    description: "Indica sorte rápida, oportunidades inesperadas e pequenas bênçãos.",
    amor: "Segunda chance, encontro inesperado, momento leve e feliz no relacionamento.",
    trabalho: "Boa oportunidade, resultado favorável, promoção rápida ou ganhos por sorte.",
    dinheiro: "Bônus inesperado, pagamento extra, melhoria súbita na situação financeira.",
    conselhos: "Aproveite a chance, arrisque com consciência, confie na sorte."
  },
  { 
    id: 3, 
    name: "Navio", 
    suit: "Dez de Espadas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Aventureiro", "impulsivo", "estrangeiro ou alguém ligado a outros lugares"],
    briefInterpretation: "Representa deslocamento, viagens, mudanças e expansão. Indica ir além do conhecido.", 
    interpretationAtOrigin: "Viagem, mudança, partida, transição ou algo vindo de longe.",
    description: "Representa deslocamento, viagens, mudanças e expansão.",
    amor: "Relacionamento à distância, mudança no vínculo, viagens a dois.",
    trabalho: "Negócios internacionais, transporte, mudança de empresa ou setor.",
    dinheiro: "Ganhos ligados a comércio, exterior ou investimentos em expansão.",
    conselhos: "Expanda horizontes, mova-se, aceite o novo, faça uma viagem/tire férias, ouse."
  },
  { 
    id: 4, 
    name: "Casa", 
    suit: "Rei de Copas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa protetora", "confiável", "caseira", "emocionalmente estável", "com forte senso de responsabilidade e pertencimento"],
    briefInterpretation: "A Casa simboliza segurança, estabilidade, proteção e estrutura sólida. Representa aquilo que serve como base emocional, material ou familiar.", 
    interpretationAtOrigin: "Situação estável, sensação de segurança, fortalecimento de bases, permanência ou consolidação de algo importante.",
    description: "A Casa simboliza segurança, estabilidade, proteção e estrutura sólida.",
    amor: "Relacionamento seguro, compromisso, construção de família, vínculo baseado em confiança e acolhimento.",
    trabalho: "Emprego estável, empresa familiar, projeto sólido, ambiente previsível e seguro.",
    dinheiro: "Estabilidade financeira, patrimônio protegido, gastos voltados ao lar ou segurança.",
    conselhos: "Fortaleça suas bases, preserve o que traz segurança, valorize o que é sólido e confiável."
  },
  { 
    id: 5, 
    name: "Árvore", 
    suit: "Sete de Copas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa equilibrada", "paciente", "madura", "com visão de longo prazo e forte ligação com suas raízes"],
    briefInterpretation: "A Árvore representa crescimento, saúde, maturidade e tudo aquilo que se desenvolve ao longo do tempo. Simboliza algo enraizado, estável e duradouro.", 
    interpretationAtOrigin: "Crescimento gradual, fortalecimento, desenvolvimento consistente, resultados a longo prazo.",
    description: "A Árvore representa crescimento, saúde, maturidade e tudo aquilo que se desenvolve ao longo do tempo.",
    amor: "Relacionamento profundo, duradouro e estável, com conexão emocional sólida e crescimento mútuo.",
    trabalho: "Evolução lenta porém segura, carreira construída com constância, progresso sustentável.",
    dinheiro: "Investimentos de longo prazo, crescimento financeiro gradual e consistente.",
    conselhos: "Tenha paciência, cuide das raízes, respeite o tempo natural de crescimento."
  },
  { 
    id: 6, 
    name: "Nuvens", 
    suit: "Rei de Paus", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa confusa", "insegura", "instável emocionalmente ou mentalmente", "com dificuldade de foco"],
    briefInterpretation: "As Nuvens simbolizam confusão, incerteza e instabilidade temporária. Representam situações nebulosas, falta de clareza, mal-entendidos ou problemas.", 
    interpretationAtOrigin: "Período de dúvidas, informações confusas, risco de erro por falta de clareza.",
    description: "As Nuvens simbolizam confusão, incerteza e instabilidade temporária.",
    amor: "Relacionamento indefinido, instável ou cercado por dúvidas e inseguranças.",
    trabalho: "Ambiente confuso, decisões mal definidas, projetos pouco claros.",
    dinheiro: "Contratempos financeiros, incertezas, risco de erro ou perda por falta de informação.",
    conselhos: "Espere a situação clarear antes de agir, busque informações, evite decisões impulsivas."
  },
  { 
    id: 7, 
    name: "Cobra", 
    suit: "Rainha de Paus", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa sedutora", "astuta", "invejosa", "manipuladora ou ciumenta"],
    briefInterpretation: "A Cobra simboliza engano, traição, inveja, ciúmes e jogos de poder. Representa situações maliciosas, manipulação e desejos perigosos.", 
    interpretationAtOrigin: "Armadilhas, conflitos ocultos, traições ou situações que exigem atenção redobrada.",
    description: "A Cobra simboliza engano, traição, inveja, ciúmes e jogos de poder.",
    amor: "Ciúmes, traição, jogos emocionais, relação tóxica ou altamente sexualizada.",
    trabalho: "Intrigas, deslealdade, ações pelas costas, ambiente competitivo e perigoso.",
    dinheiro: "Pequenas perdas, golpes, mau investimento ou abuso de confiança.",
    conselhos: "Seja cauteloso, observe antes de confiar, proteja-se de manipulações."
  },
  { 
    id: 8, 
    name: "Caixão", 
    suit: "Nove de Ouros", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa abatida", "cansada", "pessimista ou em processo de luto emocional"],
    briefInterpretation: "O Caixão representa fins, encerramentos, perdas e transformações profundas. Indica o término de um ciclo que já não pode continuar.", 
    interpretationAtOrigin: "Fim inevitável, encerramento de fase, transformação profunda ou pausa forçada.",
    description: "O Caixão representa fins, encerramentos, perdas e transformações profundas.",
    amor: "Fim de relacionamento, estagnação emocional ou necessidade de encerrar algo que não vive mais.",
    trabalho: "Demissão, fim de contrato, encerramento de projeto ou atividade desgastante.",
    dinheiro: "Perda significativa, falência ou necessidade de recomeçar financeiramente.",
    conselhos: "Aceite o fim, permita-se descansar, prepare-se para renascer."
  },
  { 
    id: 9, 
    name: "Buquê", 
    suit: "Rainha de Espadas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa encantadora", "otimista", "criativa", "carismática e apreciada"],
    briefInterpretation: "O Buquê simboliza alegria, gratidão, beleza, reconhecimento e presentes. Representa gestos de carinho, boas surpresas e momentos agradáveis.", 
    interpretationAtOrigin: "Boa notícia, surpresa positiva, momento de felicidade e reconhecimento.",
    description: "O Buquê simboliza alegria, gratidão, beleza, reconhecimento e presentes.",
    amor: "Relacionamento feliz, harmônico, gestos românticos e valorização mútua.",
    trabalho: "Oferta atrativa, ambiente agradável, reconhecimento profissional.",
    dinheiro: "Ganhos positivos, vantagens financeiras, estabilidade momentânea.",
    conselhos: "Aprecie o que é belo, espalhe gentileza, permita-se desfrutar."
  },
  { 
    id: 10, 
    name: "Foice", 
    suit: "Valete de Ouros", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa direta", "incisiva", "agressiva ou extremamente objetiva"],
    briefInterpretation: "A Foice representa cortes abruptos, rupturas repentinas e decisões rápidas. Indica situações que se encerram de forma súbita, exigindo ação imediata.", 
    interpretationAtOrigin: "Mudança brusca, separação, decisão inesperada ou evento repentino.",
    description: "A Foice representa cortes abruptos, rupturas repentinas e decisões rápidas.",
    amor: "Separação súbita, término necessário ou libertação de relação nociva.",
    trabalho: "Demissão, rescisão, quebra de contrato ou decisão radical.",
    dinheiro: "Perda súbita, corte financeiro ou reversão rápida de situação.",
    conselhos: "Corte o que não serve mais, aja com precisão, evite hesitações."
  },
  { 
    id: 11, 
    name: "Chicote", 
    suit: "Valete de Paus", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa intensa", "argumentativa", "competitiva", "impulsiva e provocadora"],
    briefInterpretation: "O Chicote representa conflitos, tensões, discussões, repetição e energia intensa. Está ligado a disputas verbais, padrões que se repetem e sexualidade.", 
    interpretationAtOrigin: "Discussões, confrontos, situações que se repetem ou tensão acumulada vindo à tona.",
    description: "O Chicote representa conflitos, tensões, discussões, repetição e energia intensa.",
    amor: "Relação marcada por brigas, paixão intensa, sexualidade forte ou dinâmica tóxica.",
    trabalho: "Ambiente conflituoso, cobranças excessivas, tarefas repetitivas ou competição agressiva.",
    dinheiro: "Problemas recorrentes, gastos repetitivos ou insatisfação financeira.",
    conselhos: "Controle os impulsos, rompa ciclos negativos, use a energia de forma consciente."
  },
  { 
    id: 12, 
    name: "Pássaros", 
    suit: "Sete de Ouros", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa falante", "curiosa", "ansiosa", "comunicativa e inquieta"],
    briefInterpretation: "Os Pássaros simbolizam comunicação, conversas, trocas rápidas, nervosismo e encontros. Representam diálogos importantes, fofocas, reuniões.", 
    interpretationAtOrigin: "Conversas importantes, notícias rápidas, encontros breves ou reuniões.",
    description: "Os Pássaros simbolizam comunicação, conversas, trocas rápidas, nervosismo e encontros.",
    amor: "Trocas de mensagens, conversas decisivas, aproximação ou tensão verbal no casal.",
    trabalho: "Reuniões, negociações, telefonemas, ambiente comunicativo.",
    dinheiro: "Entradas e saídas rápidas, comércio, instabilidade financeira momentânea.",
    conselhos: "Comunique-se com clareza, evite fofocas, escute antes de reagir."
  },
  { 
    id: 13, 
    name: "Criança", 
    suit: "Valete de Espadas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa jovem", "imatura", "curiosa", "ingênua ou inexperiente"],
    briefInterpretation: "A Criança representa novos começos, inocência, curiosidade e leveza. Indica algo pequeno, em fase inicial ou que ainda precisa amadurecer.", 
    interpretationAtOrigin: "Novo início, algo pequeno surgindo, fase inicial de um projeto ou relação.",
    description: "A Criança representa novos começos, inocência, curiosidade e leveza.",
    amor: "Novo relacionamento, relação leve, começo sem grandes compromissos.",
    trabalho: "Novo projeto, início de carreira, aprendizado, estágio ou trabalho simples.",
    dinheiro: "Pequenos ganhos, investimentos iniciais, recursos limitados.",
    conselhos: "Comece sem medo, aprenda, mantenha a leveza e a curiosidade."
  },
  { 
    id: 14, 
    name: "Raposa", 
    suit: "Nove de Paus", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa astuta", "charmosa", "manipuladora ou excessivamente estratégica"],
    briefInterpretation: "A Raposa simboliza astúcia, engano, interesses ocultos e necessidade de inteligência estratégica. Pode indicar falsidade, mas também esperteza.", 
    interpretationAtOrigin: "Situação enganosa, armadilha ou necessidade de agir com cautela.",
    description: "A Raposa simboliza astúcia, engano, interesses ocultos e necessidade de inteligência estratégica.",
    amor: "Relacionamento com segundas intenções, sedução interessada, desconfiança.",
    trabalho: "Trapaças, ambiente falso, necessidade de agir com inteligência.",
    dinheiro: "Risco financeiro, necessidade de cautela, ganhos por esperteza.",
    conselhos: "Observe com atenção, seja estratégico, não confie cegamente."
  },
  { 
    id: 15, 
    name: "Urso", 
    suit: "Dez de Paus", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa forte", "dominante", "protetora", "poderosa ou controladora"],
    briefInterpretation: "O Urso representa poder, autoridade, proteção e força. Pode indicar apoio sólido ou controle excessivo. Está ligado a figuras dominantes.", 
    interpretationAtOrigin: "Figura de autoridade em destaque, proteção ou situação de controle.",
    description: "O Urso representa poder, autoridade, proteção e força.",
    amor: "Relação protetora ou possessiva, ciúmes e domínio.",
    trabalho: "Cargo de liderança, poder financeiro, necessidade de assumir controle.",
    dinheiro: "Prosperidade, grandes valores, estabilidade material.",
    conselhos: "Use o poder com equilíbrio, evite excessos de controle."
  },
  { 
    id: 16, 
    name: "Estrelas", 
    suit: "Seis de Copas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa sonhadora", "otimista", "inspiradora e espiritualizada"],
    briefInterpretation: "As Estrelas simbolizam esperança, orientação, fé e clareza espiritual. Representam sonhos, inspiração e caminhos iluminados.", 
    interpretationAtOrigin: "Esperança renovada, sucesso, orientação clara e harmonia.",
    description: "As Estrelas simbolizam esperança, orientação, fé e clareza espiritual.",
    amor: "Relação sincera, leve, guiada por sonhos e ideais comuns.",
    trabalho: "Planejamento claro, progresso gradual, sucesso alinhado ao propósito.",
    dinheiro: "Situação equilibrada, planos financeiros promissores.",
    conselhos: "Acredite, siga sua estrela, mantenha a fé."
  },
  { 
    id: 17, 
    name: "Cegonha", 
    suit: "Rainha de Copas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa elegante", "adaptável", "em constante evolução"],
    briefInterpretation: "A Cegonha representa mudanças positivas, renovação e transições necessárias. Está ligada a ciclos naturais de transformação e progresso.", 
    interpretationAtOrigin: "Mudança benéfica, transição, renovação ou nascimento de algo novo.",
    description: "A Cegonha representa mudanças positivas, renovação e transições necessárias.",
    amor: "Evolução do relacionamento, próximo passo, mudança necessária.",
    trabalho: "Promoção, transferência, nova fase profissional.",
    dinheiro: "Melhora financeira, mudança de fonte de renda.",
    conselhos: "Aceite a mudança, evolua, não resista ao novo."
  },
  { 
    id: 18, 
    name: "Cachorro", 
    suit: "Dez de Copas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa fiel", "honesta", "confiável e solidária"],
    briefInterpretation: "O Cachorro simboliza lealdade, amizade, apoio e confiança. Representa alianças sinceras e proteção emocional.", 
    interpretationAtOrigin: "Apoio verdadeiro, parceria confiável, segurança emocional.",
    description: "O Cachorro simboliza lealdade, amizade, apoio e confiança.",
    amor: "Relação baseada em amizade, confiança e lealdade.",
    trabalho: "Ambiente colaborativo, ajuda de colegas, parceria sólida.",
    dinheiro: "Estabilidade, ajuda financeira ou apoio de alguém próximo.",
    conselhos: "Valorize quem é leal, seja fiel aos seus princípios."
  },
  { 
    id: 19, 
    name: "Torre", 
    suit: "Seis de Espadas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa reservada", "orgulhosa", "independente", "racional", "com necessidade de espaço e controle"],
    briefInterpretation: "A Torre representa isolamento, estrutura, hierarquia, limites e distanciamento. Pode indicar solidão, introspecção ou necessidade de afastamento.", 
    interpretationAtOrigin: "Situação que exige distanciamento, formalização, isolamento temporário ou atuação dentro de regras rígidas.",
    description: "A Torre representa isolamento, estrutura, hierarquia, limites e distanciamento.",
    amor: "Relacionamento sério e estruturado ou, em negativo, frio, distante e emocionalmente isolado.",
    trabalho: "Instituições, cargos formais, grandes empresas, trabalho remoto ou hierárquico.",
    dinheiro: "Recursos protegidos, investimentos seguros, patrimônio guardado.",
    conselhos: "Estabeleça limites claros, organize sua vida, preserve sua autonomia."
  },
  { 
    id: 20, 
    name: "Jardim", 
    suit: "Oito de Espadas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa sociável", "carismática", "conhecida", "acessível e comunicativa"],
    briefInterpretation: "O Jardim simboliza socialização, convivência, exposição pública e encontros coletivos. Representa ambientes abertos, eventos, círculos sociais.", 
    interpretationAtOrigin: "Eventos sociais, encontros, reuniões públicas ou exposição social.",
    description: "O Jardim simboliza socialização, convivência, exposição pública e encontros coletivos.",
    amor: "Relacionamentos leves, encontros, flertes ou relações ainda não privadas.",
    trabalho: "Networking, eventos profissionais, relações públicas, marketing.",
    dinheiro: "Ganhos coletivos, investimentos em grupo, oportunidades através de contatos.",
    conselhos: "Apareça, socialize, construa conexões, cuide da sua imagem."
  },
  { 
    id: 21, 
    name: "Montanha", 
    suit: "Oito de Paus", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa rígida", "teimosa", "resistente", "séria ou emocionalmente distante"],
    briefInterpretation: "A Montanha representa obstáculos grandes, bloqueios, atrasos e desafios difíceis de superar. Indica algo sólido, pesado e resistente.", 
    interpretationAtOrigin: "Atrasos, bloqueios persistentes ou necessidade de enfrentar grandes desafios.",
    description: "A Montanha representa obstáculos grandes, bloqueios, atrasos e desafios difíceis de superar.",
    amor: "Bloqueios emocionais, frieza, dificuldade de aproximação.",
    trabalho: "Projetos parados, burocracia pesada, desafios profissionais significativos.",
    dinheiro: "Recursos bloqueados, dificuldades financeiras ou lentidão em ganhos.",
    conselhos: "Tenha paciência, busca caminhos alternativos, não force agora."
  },
  { 
    id: 22, 
    name: "Caminhos", 
    suit: "Rainha de Ouros", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa indecisa", "versátil", "livre", "curiosa ou em fase de transição"],
    briefInterpretation: "Os Caminhos representam escolhas, decisões e múltiplas possibilidades. Indicam livre-arbítrio, bifurcações e a necessidade de definir rumos.", 
    interpretationAtOrigin: "Decisão importante, mudança de direção ou escolha inevitável.",
    description: "Os Caminhos representam escolhas, decisões e múltiplas possibilidades.",
    amor: "Escolha entre opções amorosas, definição do rumo da relação.",
    trabalho: "Decisão profissional, novas oportunidades ou mudança de carreira.",
    dinheiro: "Escolhas financeiras, diversificação ou decisão pendente.",
    conselhos: "Decida com consciência, assuma seu caminho, não adie."
  },
  { 
    id: 23, 
    name: "Ratos", 
    suit: "Sete de Paus", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa ansiosa", "preocupada", "inquieta ou exausta"],
    briefInterpretation: "Os Ratos simbolizam perdas graduais, desgaste, estresse e corrosão emocional ou material. Indicam algo que vai sendo consumido aos poucos.", 
    interpretationAtOrigin: "Desgaste contínuo, perdas pequenas porém acumulativas.",
    description: "Os Ratos simbolizam perdas graduais, desgaste, estresse e corrosão emocional ou material.",
    amor: "Relação desgastante, desconfiança, desgaste emocional.",
    trabalho: "Ambiente tóxico, perda de energia, intrigas e roubo de ideias.",
    dinheiro: "Gastos inesperados, perdas lentas, dívidas.",
    conselhos: "Elimine o que drena sua energia, proteja-se, reorganize."
  },
  { 
    id: 24, 
    name: "Coração", 
    suit: "Valete de Copas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa amorosa", "sensível", "generosa e emocional"],
    briefInterpretation: "O Coração representa amor, afeto, emoções profundas, felicidade e entrega emocional. É a carta da conexão verdadeira e da expressão sincera.", 
    interpretationAtOrigin: "Fase de alegria emocional, novo amor ou fortalecimento afetivo.",
    description: "O Coração representa amor, afeto, emoções profundas, felicidade e entrega emocional.",
    amor: "Amor verdadeiro, paixão, harmonia afetiva.",
    trabalho: "Trabalho feito com amor, vocação, ambiente harmonioso.",
    dinheiro: "Fluxo positivo ligado a parcerias e prazer.",
    conselhos: "Siga seus sentimentos, ame sem medo."
  },
  { 
    id: 25, 
    name: "Anel", 
    suit: "Ás de Paus", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa comprometida", "leal", "confiável e constante"],
    briefInterpretation: "O Anel simboliza compromissos, contratos, alianças e ciclos que se fecham ou se renovam. Representa vínculos formais e promessas duradouras.", 
    interpretationAtOrigin: "Compromisso firmado, contrato assinado ou união consolidada.",
    description: "O Anel simboliza compromissos, contratos, alianças e ciclos que se fecham ou se renovam.",
    amor: "Casamento, noivado, relação séria e duradoura.",
    trabalho: "Contratos, parcerias profissionais, estabilidade.",
    dinheiro: "Acordos financeiros, ganhos por parcerias.",
    conselhos: "Honre seus compromissos, firme alianças."
  },
  { 
    id: 26, 
    name: "Livro", 
    suit: "Dez de Ouros", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa reservada", "estudiosa", "misteriosa e observadora"],
    briefInterpretation: "O Livro representa segredos, conhecimentos ocultos, estudos e informações ainda não reveladas. Indica aprendizado, mistério e algo oculto.", 
    interpretationAtOrigin: "Descoberta futura, aprendizado, revelação gradual.",
    description: "O Livro representa segredos, conhecimentos ocultos, estudos e informações ainda não reveladas.",
    amor: "Segredos no relacionamento, amor discreto ou oculto.",
    trabalho: "Estudos, especialização, pesquisa, documentos confidenciais.",
    dinheiro: "Informações financeiras ocultas, necessidade de estudar investimentos.",
    conselhos: "Busque conhecimento, observe antes de agir."
  },
  { 
    id: 27, 
    name: "Carta", 
    suit: "Sete de Espadas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Pessoa comunicativa", "objetiva", "formal e informativa"],
    briefInterpretation: "A Carta simboliza comunicações escritas, documentos, mensagens oficiais e notícias formais. Representa tudo que deixa registro.", 
    interpretationAtOrigin: "Notícia escrita, documento, convite ou aviso formal.",
    description: "A Carta simboliza comunicações escritas, documentos, mensagens oficiais e notícias formais.",
    amor: "Mensagens importantes, declarações escritas.",
    trabalho: "Contratos, e-mails, relatórios, burocracia.",
    dinheiro: "Boletos, faturas, documentos financeiros.",
    conselhos: "Leia com atenção, documente tudo, seja claro."
  },
  { 
    id: 28, 
    name: "Homem", 
    suit: "Ás de Copas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Ativo", "racional ou emocional conforme cartas adjacentes", "assertivo"],
    briefInterpretation: "O Homem representa o consulente quando este é do sexo masculino ou uma figura masculina central na questão. Simboliza ação, presença ativa.", 
    interpretationAtOrigin: "Envolvimento direto com um homem ou situação conduzida por energia masculina.",
    description: "O Homem representa o consulente quando este é do sexo masculino ou uma figura masculina central na questão.",
    amor: "Parceiro, interesse romântico masculino, foco no homem da relação.",
    trabalho: "Chefe, colega ou figura masculina influente no ambiente profissional.",
    dinheiro: "Ação prática para ganhos, influência masculina nas finanças.",
    conselhos: "Assuma a iniciativa, aja com clareza e objetividade."
  },
  { 
    id: 29, 
    name: "Mulher", 
    suit: "Ás de Espadas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Intuitiva", "sensível", "receptiva", "observadora"],
    briefInterpretation: "A Mulher representa a consulente quando esta é do sexo feminino ou uma figura feminina central na questão. Simboliza intuição, sensibilidade.", 
    interpretationAtOrigin: "Envolvimento direto com uma mulher ou situação guiada por energia feminina.",
    description: "A Mulher representa a consulente quando esta é do sexo feminino ou uma figura feminina central na questão.",
    amor: "Parceira, interesse romântico feminino, foco na mulher da relação.",
    trabalho: "Colega, chefe ou figura feminina relevante no trabalho.",
    dinheiro: "Influência feminina nas finanças, decisões guiadas pela intuição.",
    conselhos: "Confie na sua percepção, use sensibilidade e clareza mental."
  },
  { 
    id: 30, 
    name: "Lírios", 
    suit: "Rei de Espadas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Sábio", "experiente", "calmo", "íntegro"],
    briefInterpretation: "Os Lírios simbolizam paz, maturidade, sabedoria, ética e harmonia. Representam estabilidade emocional, sexualidade equilibrada e virtude.", 
    interpretationAtOrigin: "Fase de tranquilidade, resolução pacífica e maturidade.",
    description: "Os Lírios simbolizam paz, maturidade, sabedoria, ética e harmonia.",
    amor: "Relacionamento maduro, sexualidade plena e equilibrada.",
    trabalho: "Carreira consolidada, mentoria, ambiente ético.",
    dinheiro: "Estabilidade financeira sólida e duradoura.",
    conselhos: "Mantenha a serenidade, aja com ética e sabedoria."
  },
  { 
    id: 31, 
    name: "Sol", 
    suit: "Ás de Ouros", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Radiante", "confiante", "carismático", "positivo"],
    briefInterpretation: "O Sol representa sucesso absoluto, vitalidade, clareza, alegria e realização. É a carta da vitória, da verdade revelada e do brilho pessoal.", 
    interpretationAtOrigin: "Vitória garantida, felicidade plena, sucesso evidente.",
    description: "O Sol representa sucesso absoluto, vitalidade, clareza, alegria e realização.",
    amor: "Relacionamento feliz, transparente e cheio de alegria.",
    trabalho: "Reconhecimento, metas alcançadas, destaque profissional.",
    dinheiro: "Prosperidade, ganhos significativos, abundância.",
    conselhos: "Confie, brilhe, aproveite o momento de luz."
  },
  { 
    id: 32, 
    name: "Lua", 
    suit: "Oito de Copas", 
    polarity: Polarity.NEUTRAL, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Intuitivo", "sensível", "sonhador", "emocional"],
    briefInterpretation: "A Lua simboliza reconhecimento, intuição, emoções profundas e instabilidade emocional. Representa sensibilidade elevada, ciclos emocionais.", 
    interpretationAtOrigin: "Reconhecimento público ou fase de intensa sensibilidade emocional.",
    description: "A Lua simboliza reconhecimento, intuição, emoções profundas e instabilidade emocional.",
    amor: "Conexão emocional profunda, romance com nuances e oscilações.",
    trabalho: "Criatividade, reconhecimento, trabalhos artísticos ou noturnos.",
    dinheiro: "Ganhos variáveis, fluxo financeiro instável.",
    conselhos: "Ouça sua intuição, respeite seus ciclos emocionais."
  },
  { 
    id: 33, 
    name: "Chave", 
    suit: "Oito de Ouros", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Resoluto", "confiável", "prático e analítico"],
    briefInterpretation: "A Chave representa solução, desbloqueio, resposta definitiva e sucesso garantido. Indica que o caminho está aberto e a resposta está acessível.", 
    interpretationAtOrigin: "Solução clara, abertura de caminhos, êxito.",
    description: "A Chave representa solução, desbloqueio, resposta definitiva e sucesso garantido.",
    amor: "Resolução de conflitos, abertura para nova fase.",
    trabalho: "Promoção, solução profissional, oportunidade certeira.",
    dinheiro: "Abertura financeira, segurança e crescimento.",
    conselhos: "Tome a iniciativa, confie na solução."
  },
  { 
    id: 34, 
    name: "Peixes", 
    suit: "Rei de Ouros", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Próspero", "negociador", "ambicioso e flexível"],
    briefInterpretation: "Os Peixes simbolizam abundância, prosperidade, fluidez e recursos materiais. Representam dinheiro em movimento e expansão financeira.", 
    interpretationAtOrigin: "Entrada de dinheiro, crescimento e prosperidade.",
    description: "Os Peixes simbolizam abundância, prosperidade, fluidez e recursos materiais.",
    amor: "Relação estável com foco em construção material.",
    trabalho: "Expansão profissional, sucesso comercial.",
    dinheiro: "Excelente fase financeira, fluxo constante.",
    conselhos: "Invista, confie no fluxo, administre bem."
  },
  { 
    id: 35, 
    name: "Âncora", 
    suit: "Nove de Espadas", 
    polarity: Polarity.POSITIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Persistente", "fiel", "conservador"],
    briefInterpretation: "A Âncora representa estabilidade, segurança e firmeza, mas também pode indicar estagnação e apego excessivo.", 
    interpretationAtOrigin: "Situação estabilizada, segurança alcançada.",
    description: "A Âncora representa estabilidade, segurança e firmeza.",
    amor: "Relacionamento sólido e duradouro.",
    trabalho: "Emprego estável, metas de longo prazo.",
    dinheiro: "Segurança financeira, investimentos conservadores.",
    conselhos: "Mantenha-se firme, mas evite estagnar."
  },
  { 
    id: 36, 
    name: "Cruz", 
    suit: "Seis de Paus", 
    polarity: Polarity.NEGATIVE, 
    timingSpeed: Timing.UNCERTAIN, timingScale: "Não informado", timingCategory: "N/A", symbolicEnergy: "N/A",
    keywords: ["Resiliente", "espiritualizado", "perseverante"],
    briefInterpretation: "A Cruz simboliza destino, carma, provações e sacrifícios necessários. Representa fardos que levam à evolução e à superação espiritual.", 
    interpretationAtOrigin: "Fim de um ciclo difícil, superação após sofrimento.",
    description: "A Cruz simboliza destino, carma, provações e sacrifícios necessários.",
    amor: "Relação cármica, amor que exige sacrifícios.",
    trabalho: "Desafios intensos com recompensa futura.",
    dinheiro: "Ganhos difíceis, quitação de dívidas pesadas.",
    conselhos: "Aceite o aprendizado, tenha fé, persevere."
  }
];

export const LENORMAND_HOUSES: LenormandHouse[] = [
  { id: 1, name: "Cavaleiro", polarity: Polarity.POSITIVE, theme: "Notícias e Movimento", technicalDescription: "Traz movemento, chegada de novidades e agilidade para o tema.", pedagogicalRule: "Espelhamento: 08 e 25." },
  { id: 2, name: "Trevos", polarity: Polarity.NEUTRAL, theme: "Obstáculos/Sorte", technicalDescription: "Impõe pequenos obstáculos passageiros ou confere sorte momentânea.", pedagogicalRule: "Espelhamento: 07 e 26." },
  { id: 3, name: "Navio", polarity: Polarity.POSITIVE, theme: "Expansão/Viagem", technicalDescription: "Promove a expansão, viagens or indica que o tema vem de longe/demora.", pedagogicalRule: "Espelhamento: 06 e 27." },
  { id: 4, name: "Casa", polarity: Polarity.POSITIVE, theme: "Lar/Estabilidade", technicalDescription: "Oferece base, segurança, proteção familiar e estabilidade ao tema.", pedagogicalRule: "Espelhamento: 05 e 28." },
  { id: 5, name: "Árvore", polarity: Polarity.POSITIVE, theme: "Crescimento/Saúde", technicalDescription: "Consolida o crescimento orgânico, vitalidade e enraizamento do assunto.", pedagogicalRule: "Espelhamento: 04 e 29." },
  { id: 6, name: "Nuvens", polarity: Polarity.NEGATIVE, theme: "Incerteza/Confusão", technicalDescription: "Gera incerteza, confusão mental e instabilidade temporária sobre o tema.", pedagogicalRule: "Espelhamento: 03 e 30." },
  { id: 7, name: "Cobra", polarity: Polarity.NEGATIVE, theme: "Traição/Rivalidade", technicalDescription: "Alerta para traições, rivalidades, desvios ou perigos no caminho.", pedagogicalRule: "Espelhamento: 02 e 31." },
  { id: 8, name: "Caixão", polarity: Polarity.NEGATIVE, theme: "Fim/Transformação", technicalDescription: "Determina o encerramento de um ciclo, perdas ou transformações profundas.", pedagogicalRule: "Espelhamento: 01 e 32." },
  { id: 9, name: "Buquê", polarity: Polarity.POSITIVE, theme: "Harmonia/Beleza", technicalDescription: "Concede beleza, harmonia, surpresas agradáveis e reconhecimento.", pedagogicalRule: "Espelhamento: 16 e 17." },
  { id: 10, name: "Foice", polarity: Polarity.NEGATIVE, theme: "Corte/Decisão", technicalDescription: "Provoca cortes bruscos, rompimentos ou o momento de colheita imediata.", pedagogicalRule: "Espelhamento: 15 e 18." },
  { id: 11, name: "Chicote", polarity: Polarity.NEGATIVE, theme: "Tensões/Conflitos", technicalDescription: "Gera conflitos, discussões repetitivas, estresse ou desgaste físico.", pedagogicalRule: "Espelhamento: 14 e 19." },
  { id: 12, name: "Pássaros", polarity: Polarity.NEUTRAL, theme: "Comunicação social", technicalDescription: "Estimula a comunicação, conversas, fofocas e agitação momentânea.", pedagogicalRule: "Espelhamento: 13 e 20." },
  { id: 13, name: "Criança", polarity: Polarity.POSITIVE, theme: "Novo/Inocência", technicalDescription: "Indica um novo começo, pureza, ingenuidade ou imaturidade no assunto.", pedagogicalRule: "Espelhamento: 12 e 21." },
  { id: 14, name: "Raposa", polarity: Polarity.NEGATIVE, theme: "Estratégia/Armadilha", technicalDescription: "Exige estratégia e cautela; indica armadilhas ou situações enganosas.", pedagogicalRule: "Espelhamento: 11 e 22." },
  { id: 15, name: "Urso", polarity: Polarity.NEUTRAL, theme: "Poder/Ciúmes", technicalDescription: "Exerce poder, domínio, proteção pesada ou ciúmes sobre a situação.", pedagogicalRule: "Espelhamento: 10 e 23." },
  { id: 16, name: "Estrela", polarity: Polarity.POSITIVE, theme: "Sorte/Êxito", technicalDescription: "Traz brilho, sorte, proteção espiritual e êxito nos objetivos.", pedagogicalRule: "Espelhamento: 09 e 24." },
  { id: 17, name: "Cegonha", polarity: Polarity.POSITIVE, theme: "Mudança/Renovação", technicalDescription: "Promove novidades, mudanças de fase, renovação ou gravidez.", pedagogicalRule: "Espelhamento: 24 e 09." },
  { id: 18, name: "Cão", polarity: Polarity.POSITIVE, theme: "Fidelidade/Confiança", technicalDescription: "Garante lealdade, apoio fiel e manutenção da confiança no tema.", pedagogicalRule: "Espelhamento: 23 e 10." },
  { id: 19, name: "Torre", polarity: Polarity.NEUTRAL, theme: "Isolamento/Justiça", technicalDescription: "Promove o isolamento, a reflexão solitária ou questões institucionais.", pedagogicalRule: "Espelhamento: 22 e 11." },
  { id: 20, name: "Jardim", polarity: Polarity.POSITIVE, theme: "Social/Público", technicalDescription: "Expõe o assunto ao público, à vida social e à coletividade.", pedagogicalRule: "Espelhamento: 21 e 12." },
  { id: 21, name: "Montanha", polarity: Polarity.NEGATIVE, theme: "Bloqueio/Dificuldade", technicalDescription: "Impõe bloqueios, grandes desafios, atrasos e dificuldades de progresso.", pedagogicalRule: "Espelhamento: 20 e 13." },
  { id: 22, name: "Caminho", polarity: Polarity.NEUTRAL, theme: "Escolhas/Dualidade", technicalDescription: "Oferece escolhas, bifurcações e múltiplas direções a seguir.", pedagogicalRule: "Espelhamento: 19 e 14." },
  { id: 23, name: "Ratos", polarity: Polarity.NEGATIVE, theme: "Desgaste/Perda", technicalDescription: "Causa desgaste, estresse, perdas, roubos ou diminução de energia.", pedagogicalRule: "Espelhamento: 18 e 15." },
  { id: 24, name: "Coração", polarity: Polarity.POSITIVE, theme: "Amor/Entrega", technicalDescription: "Coloca a emoção, a paixão e a entrega afetiva no centro da questão.", pedagogicalRule: "Espelhamento: 17 e 16." },
  { id: 25, name: "Anel", polarity: Polarity.POSITIVE, theme: "Compromisso/União", technicalDescription: "Firma compromissos, sela acordos, uniões ou parcerias duradouras.", pedagogicalRule: "Espelhamento: 32 e 01." },
  { id: 26, name: "Livro", polarity: Polarity.NEUTRAL, theme: "Segredo/Estudo", technicalDescription: "Mantagem segredos, revela o oculto ou indica necessidade de estudos.", pedagogicalRule: "Espelhamento: 31 e 02." },
  { id: 27, name: "Carta", polarity: Polarity.NEUTRAL, theme: "Avisos/Documentos", technicalDescription: "Traz avisos, documentos, mensagens ou notícias diretas.", pedagogicalRule: "Espelhamento: 30 e 03." },
  { id: 28, name: "Homem", polarity: Polarity.NEUTRAL, theme: "Consulente Masculino", technicalDescription: "Representa a influência da energia masculina ou racional na questão.", pedagogicalRule: "Espelhamento: 29 e 04." },
  { id: 29, name: "Mulher", polarity: Polarity.NEUTRAL, theme: "Consulente Feminina", technicalDescription: "Representa a influência da energia feminina ou receptiva na questão.", pedagogicalRule: "Espelhamento: 28 e 05." },
  { id: 30, name: "Lírios", polarity: Polarity.POSITIVE, theme: "Paz/Maturidade", technicalDescription: "Traz paz, frieza, maturidade, sabedoria ou virtude à situação.", pedagogicalRule: "Espelhamento: 27 e 06." },
  { id: 31, name: "Sol", polarity: Polarity.POSITIVE, theme: "Sucesso/Vitalidade", technicalDescription: "Revela a verdade, traz sucesso, clareza total e vitalidade.", pedagogicalRule: "Espelhamento: 26 e 07." },
  { id: 32, name: "Lua", polarity: Polarity.POSITIVE, theme: "Intuição/Mérito", technicalDescription: "Confere reconhecimento, méritos, intuição ou flutuação emocional.", pedagogicalRule: "Espelhamento: 25 e 08." },
  { id: 33, name: "Chave", polarity: Polarity.POSITIVE, theme: "Veredito/Solução", technicalDescription: "Abre caminhos e entrega a solução para o problema.", pedagogicalRule: "Espelha c/ 36." },
  { id: 34, name: "Peixes", polarity: Polarity.POSITIVE, theme: "Veredito/Recursos", technicalDescription: "Movimenta recursos financeiros e garante falicidade material.", pedagogicalRule: "Espelha c/ 35." },
  { id: 35, name: "Âncora", polarity: Polarity.POSITIVE, theme: "Veredito/Segurança", technicalDescription: "Estabiliza, fixa e traz segurança (ou estagnação) ao resultado.", pedagogicalRule: "Espelha c/ 34." },
  { id: 36, name: "Cruz", polarity: Polarity.NEUTRAL, theme: "Veredito/Destino", technicalDescription: "Determina o destino, provações de fé e a vitória final.", pedagogicalRule: "Espelha c/ 33." },

  // Casas do Relógio
  { id: 101, name: "Casa 1 (Áries)", polarity: Polarity.POSITIVE, theme: "O Eu / Identidade", technicalDescription: "Representa o 'Eu', iniciativa pessoal e começos.", pedagogicalRule: "O início da jornada no ano.", isClockHouse: true, month: "Janeiro", zodiac: "Áries" },
  { id: 102, name: "Casa 2 (Touro)", polarity: Polarity.NEUTRAL, theme: "Valores e Finanças", technicalDescription: "Bens materiais, segurança financeira e valores pessoais.", pedagogicalRule: "Recursos para o ano.", isClockHouse: true, month: "Fevereiro", zodiac: "Touro" },
  { id: 103, name: "Casa 3 (Gêmeos)", polarity: Polarity.NEUTRAL, theme: "Comunicação e Ideias", technicalDescription: "Circulação de informações, aprendizado e ambiente imediato.", pedagogicalRule: "O fluxo mental e contatos.", isClockHouse: true, month: "Março", zodiac: "Gêmeos" },
  { id: 104, name: "Casa 4 (Câncer)", polarity: Polarity.POSITIVE, theme: "Família e Lar", technicalDescription: "Foca em família, lar, passado e segurança emocional.", pedagogicalRule: "As bases emocionais do ciclo.", isClockHouse: true, month: "Abril", zodiac: "Câncer" },
  { id: 105, name: "Casa 5 (Leão)", polarity: Polarity.POSITIVE, theme: "Criatividade e Lazer", technicalDescription: "Assuntos de prazer, lazer, filhos, romance e autoexpressão.", pedagogicalRule: "A alegria e a criação.", isClockHouse: true, month: "Maio", zodiac: "Leão" },
  { id: 106, name: "Casa 6 (Virgem)", polarity: Polarity.NEUTRAL, theme: "Saúde e Trabalho", technicalDescription: "Trabalho cotidiano, deveres, saúde física e rotina.", pedagogicalRule: "O esforço diário e cuidado.", isClockHouse: true, month: "Junho", zodiac: "Virgem" },
  { id: 107, name: "Casa 7 (Libra)", polarity: Polarity.POSITIVE, theme: "Relações e Parcerias", technicalDescription: "Relacionamentos sérios, parcerias, harmonia e acordos sociais.", pedagogicalRule: "O outro no seu caminho.", isClockHouse: true, month: "Julho", zodiac: "Libra" },
  { id: 108, name: "Casa 8 (Escorpião)", polarity: Polarity.NEGATIVE, theme: "Transformação", technicalDescription: "Transformações profundas, recursos compartilhados, sexualidade.", pedagogicalRule: "Onde o desapego é necessário.", isClockHouse: true, month: "Agosto", zodiac: "Escorpião" },
  { id: 109, name: "Casa 9 (Sagitário)", polarity: Polarity.POSITIVE, theme: "Expansão e Visões", technicalDescription: "Viagens, ensino superior, filosofia e visões de futuro.", pedagogicalRule: "O crescimento espiritual.", isClockHouse: true, month: "Setembro", zodiac: "Sagitário" },
  { id: 110, name: "Casa 10 (Capricórnio)", polarity: Polarity.NEUTRAL, theme: "Carreira e Reputação", technicalDescription: "Objetivos de longo prazo, autoridade e sucesso profissional.", pedagogicalRule: "A realização no mundo.", isClockHouse: true, month: "Outubro", zodiac: "Capricórnio" },
  { id: 111, name: "Casa 11 (Aquário)", polarity: Polarity.POSITIVE, theme: "Amigos e Futuro", technicalDescription: "Amigos, inovação, projetos sociais e ideias futuristas.", pedagogicalRule: "A rede de apoio e planos.", isClockHouse: true, month: "Novembro", zodiac: "Aquário" },
  { id: 112, name: "Casa 12 (Peixes)", polarity: Polarity.NEUTRAL, theme: "Espiritualidade", technicalDescription: "Sonhos, sacrifícios finais, isolamento e espiritualidade.", pedagogicalRule: "O encerramento e a transcendência.", isClockHouse: true, month: "Dezembro", zodiac: "Peixes" }
];

export const FUNDAMENTALS_DATA: FundamentalModule[] = [
  {
    id: 'f_mesa_real',
    title: 'Fundamentos da Mesa Real',
    description: 'A Mesa Real é uma disposição ampla e sistêmica das cartas do Baralho Cigano, utilizada para leituras profundas, evolutivas e de longo alcance.',
    content: 'Diferente de tiragens simples, ela trabalha com múltiplas camadas de interpretação simultâneas.',
    concepts: [
      {
        id: 'gt-principles',
        title: 'Princípios Fundamentais',
        text: 'A leitura não é linear, mas relacional. As cartas dialogam por proximidade, distância e geometria.',
        details: 'O sentido real emerge do conjunto, não de cartas isoladas.',
        practiceTarget: 'mesa-real'
      },
      { 
        id: 'gt-frame',
        title: 'A Moldura', 
        text: 'As quatro cartas dos cantos extremos da mesa formam o cenário geral da vida do consulente no momento.',
        details: 'Elas emolduram toda a experiência apresentada na leitura.',
        practiceTarget: 'mesa-real'
      },
      { 
        id: 'gt-diagonals',
        title: 'Diagonais', 
        text: 'As diagonais que partem do significador revelam o fluxo de pensamento, ação, destino e bases inconscientes.',
        details: 'Dividem a experiência em quatro quadrantes simbólicos.',
        practiceTarget: 'mesa-real'
      },
      { 
        id: 'gt-mirror',
        title: 'Espelhamento', 
        text: 'Leitura de cartas posicionadas de forma simétrica na mesa.',
        details: 'Revela o que é mostrado versus o que é ocultado, trazendo reflexos internos e externos.',
        practiceTarget: 'mesa-real'
      },
      { 
        id: 'gt-knight',
        title: 'Cavalaria', 
        text: 'Técnica baseada no movimento do cavalo no xadrez, utilizada para investigar intenções ocultas, segredos e influências indiretas sobre uma carta ou casa.',
        practiceTarget: 'mesa-real'
      },
      { 
        id: 'gt-time',
        title: 'Dinâmica do Tempo',
        text: 'A contagem de tempo é determinada pela distância entre o significador e a carta tema, bem como pela velocidade simbólica das cartas.',
        details: 'Critérios:\n• Cartas próximas indicam eventos iminentes.\n• Cartas distantes indicam eventos de médio ou longo prazo.\n• Cartas rápidas aceleram o tempo.\n• Cartas lentas indicam demora ou processos prolongados.',
        practiceTarget: 'mesa-real'
      },
      { 
        id: 'gt-veredict',
        title: 'Veredito Final', 
        text: 'As casas 33 a 36 mostram o destino inevitável e o conselho final da leitura.',
        details: 'As quatro últimas casas fornecem a síntese final da leitura, destino inevitável e o conselho maior.',
        practiceTarget: 'mesa-real'
      }
    ]
  },
  {
    id: 'f_afrodite',
    title: 'Templo de Afrodite',
    description: 'Análise detalhada de relacionamentos através da comparação de planos mentais, emocionais e físicos de duas pessoas.',
    content: 'O Templo de Afrodite utiliza 7 cartas para mapear a dinâmica de um casal ou parceria.',
    concepts: [
      {
        id: 'afrodite-structure',
        title: 'Estrutura de Planos',
        text: 'As cartas comparam o Mental (1 e 4), o Sentimental (2 e 5) e o Físico (3 e 6).',
        details: 'A carta 7 atua como a síntese e tendência de destino da conexão.',
        practiceTarget: 'templo-afrodite'
      }
    ]
  },
  {
    id: 'f_mesa_9',
    title: 'Fundamentos da Tiragem de 9 Cartas',
    description: 'A Tiragem de 9 Cartas, também chamada de Quadrado de 9 ou Mini-Tableau, é uma leitura intermediária que une profundidade simbólica e clareza estratégica.',
    content: 'Esta tiragem funciona como ponte entre leituras simples e a complexidade da Mesa Real.',
    concepts: [
      {
        id: 'm9-center',
        title: 'Formato e Foco',
        text: 'Matriz 3x3. A carta central representa o foco principal da questão e organiza toda a interpretação.',
        practiceTarget: 'mesa-9'
      },
      {
        id: 'm9-columns',
        title: 'Colunas de Tempo',
        text: 'Leitura vertical das colunas indicando a linha do tempo.',
        details: '• Esquerda: Passado – causas e origens da situação.\n• Centro: Presente – estado atual e desenvolvimento.\n• Direita: Futuro – tendência e desfecho.',
        practiceTarget: 'mesa-9'
      },
      {
        id: 'm9-rows',
        title: 'Leitura das Linhas (Planos)',
        text: 'Leitura horizontal das linhas indicando níveis de consciência.',
        details: '• Superior: Plano mental e consciente.\n• Central: Plano emocional e ações.\n• Inferior: Plano físico, base e resultados.',
        practiceTarget: 'mesa-9'
      },
      {
        id: 'm9-cross',
        title: 'A Cruz',
        text: 'Eixo vertical e horizontal que revela a estrutura central do problema.',
        practiceTarget: 'mesa-9'
      },
      {
        id: 'm9-diagonals',
        title: 'Diagonais',
        text: 'Caminhos do destino e lições kármicas.',
        practiceTarget: 'mesa-9'
      },
      {
        id: 'm9-frame',
        title: 'Moldura',
        text: 'As quatro cartas dos cantos indicam o clima geral da situação.',
        practiceTarget: 'mesa-9'
      },
      {
        id: 'm9-time',
        title: 'Dinâmica do Tempo',
        text: 'A carta 9 indica o ritmo do desfecho, influenciada pela natureza da carta central.',
        details: '• Cartas rápidas indicam resolução em dias ou semanas.\n• Cartas lentas indicam processos longos ou demorados.',
        practiceTarget: 'mesa-9'
      },
      {
        id: 'm9-function',
        title: 'Função da Tiragem',
        text: 'Esta tiragem funciona como ponte entre leituras simples e a complexidade da Mesa Real.',
        practiceTarget: 'mesa-9'
      }
    ]
  },
  {
    id: 'f_relogio',
    title: 'Fundamentos da Tiragem do Relógio',
    description: 'A Tiragem do Relógio, também conhecida como Mandala Astrológica, utiliza o arquétipo das 12 casas para mapear ciclos, áreas da vida e o fluxo do tempo.',
    content: 'A Tiragem em Relógio organiza 12 cartas em formato circular, representando um ciclo de 12 meses.',
    concepts: [
      { 
        id: 'clock-structure',
        title: 'Estrutura e Carta Central', 
        text: '12 cartas dispostas em círculo e 1 carta central.',
        details: 'A carta central atua como tema, síntese ou energia regente do período analisado.',
        practiceTarget: 'relogio'
      },
      {
        id: 'clock-houses',
        title: 'As 12 Casas',
        text: 'Cada casa representa uma área da vida.',
        details: '• Casa 1: O Eu, estado mental e vitalidade\n• Casa 2: Valores, finanças e recursos\n• Casa 3: Comunicação e cotidiano\n• Casa 4: Lar, família e base emocional\n• Casa 5: Prazer, romances e criatividade\n• Casa 6: Rotina, trabalho e saúde física\n• Casa 7: Parcerias e relacionamentos\n• Casa 8: Transformações e crises\n• Casa 9: Expansão, espiritualidade e estudos\n• Casa 10: Carreira e realização social\n• Casa 11: Amigos e projetos futuros\n• Casa 12: Karma, inconsciente e provações',
        practiceTarget: 'relogio'
      },
      {
        id: 'clock-axes',
        title: 'Eixos de Oposição',
        text: 'Tensões e equilíbrios entre casas opostas.',
        details: '• 1 x 7: Identidade versus o Outro\n• 2 x 8: Posse versus compartilhamento\n• 3 x 9: Conhecimento prático versus espiritual\n• 4 x 10: Vida privada versus vida pública\n• 5 x 11: Prazer pessoal versus coletivo\n• 6 x 12: Corpo físico versus espírito',
        practiceTarget: 'relogio'
      },
      { 
        id: 'clock-temporality',
        title: 'Dinâmica do Tempo', 
        text: 'Cartas rápidas antecipam eventos; cartas lentas indicam atrasos.',
        details: 'Métodos:\n• Método Mensal: cada casa representa um mês a partir da consulta.\n• Método Estacional: casas angulares marcam mudanças de estação.',
        practiceTarget: 'relogio'
      },
      { 
        id: 'clock-absence',
        title: 'Carta Esperada Ausente', 
        text: 'Indica que a concretização completa ultrapassa o ciclo anual de 12 meses.',
        details: 'Quando a carta foco não aparece nas 12 casas principais, indica que a concretização completa ultrapassa o ciclo anual. A aparição em tiragens secundárias mostra preparação.',
        practiceTarget: 'relogio'
      },
      { 
        id: 'clock-second-draw',
        title: 'Segunda Tiragem', 
        text: 'Utiliza as cartas restantes para aprofundar desdobramentos e obstáculos ocultos.',
        details: 'A segunda tiragem utiliza as cartas restantes para aprofundar desdobramentos, obstáculos ocultos e fases intermediárias do processo.',
        practiceTarget: 'relogio'
      }
    ]
  }
];

export const STUDY_BALLOONS: Record<string, StudyBalloon[]> = {
  "mesa-real": [
    { target: "frame", title: "Moldura", text: "Clima geral da vida do consulente. Casas 1, 8, 25 e 32." },
    { target: "diagonal", title: "Diagonal", text: "Mostra crescimento ou sustentação da situação através das influências ascendentes e descendentes." },
    { target: "veredict", title: "Veredito Final", text: "Destino inevitável e conselho. Casas 33 a 36 fornecem a síntese final." }
  ],
  "mesa-9": [
    { target: "center", title: "Foco Central", text: "A carta 5 é o coração da leitura. Tudo deve ser lido em relação a ela." },
    { target: "diagonals", title: "Diagonais (X)", text: "Cruzamento de influências passadas e futuras que definem o destino." },
    { target: "cross", title: "Cruz Central", text: "O momento imediato: o que está na mente (horizontal) e no concreto (vertical)." }
  ],
  "relogio": [
    { target: "center", title: "Centro do Relógio", text: "Origem do ciclo anual e energia base da leitura que regula todo o período." },
    { target: "house", title: "Casa do Mês", text: "Cada posição representa um mês e um tema específico da jornada cíclica." }
  ],
  "templo-afrodite": [
    { target: "structure", title: "Comparação de Planos", text: "Observe as correspondências horizontais entre consultante e parceiro para ver a harmonia ou conflito." }
  ],
  "piramide": [
    { target: "flow", title: "Fluxo de Síntese", text: "A Pirâmide Invertida funila a energia: das muitas possibilidades (topo) para a síntese única (base)." }
  ]
};
