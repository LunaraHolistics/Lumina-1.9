// ================================
// CONFIG — IMAGENS DO ECOSSISTEMA AUXCARDS
// Fonte única: repositório AuxCards (GitHub público)
// ================================

export const CARDS_BASE_URL =
  "https://raw.githubusercontent.com/LunaraHolistics/AuxCards/main/assets/cartas/baralho_cigano/";

// ================================
// FALLBACKS (necessários para o App.tsx)
// ================================

// Fallback visual estável: usa a própria carta 01 do nosso baralho
// (assim, se alguma URL específica falhar, mostra outra carta do deck
// em vez de depender do Unsplash externo).
export const FALLBACK_IMAGE = CARDS_BASE_URL + "01_mensageiro.jpg";

// Fallback base64 de emergência (1x1 transparente, último recurso)
export const BASE64_FALLBACK =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==";

// ================================
// CARD FILE KEYS (id Lumina -> arquivo AuxCards)
// ================================

export const CARD_IMAGE_KEYS: Record<number, string> = {
  1: "01_mensageiro.jpg",
  2: "02_trevo.jpg",
  3: "03_navio.jpg",
  4: "04_casa.jpg",
  5: "05_arvore.jpg",
  6: "06_nuvens.jpg",
  7: "07_cobra.jpg",
  8: "08_caixao.jpg",
  9: "09_buque.jpg",
  10: "10_foice.jpg",
  11: "11_chicote.jpg",
  12: "12_passaros.jpg",
  13: "13_crianca.jpg",
  14: "14_raposa.jpg",
  15: "15_urso.jpg",
  16: "16_estrela.jpg",
  17: "17_cegonha.jpg",
  18: "18_cachorro.jpg",
  19: "19_torre.jpg",
  20: "20_jardim.jpg",
  21: "21_montanha.jpg",
  22: "22_caminhos.jpg",
  23: "23_ratos.jpg",
  24: "24_coracao.jpg",
  25: "25_anel.jpg",
  26: "26_livro.jpg",
  27: "27_cartas.jpg",
  28: "28_cigano.jpg",
  29: "29_cigana.jpg",
  30: "30_lirios.jpg",
  31: "31_sol.jpg",
  32: "32_lua.jpg",
  33: "33_chave.jpg",
  34: "34_peixes.jpg",
  35: "35_ancora.jpg",
  36: "36_cruz.jpg",
};

// ================================
// MAIN EXPORT (API LEGADA)
// ================================

// ⚠️ NÃO REMOVER — usado por vários componentes
export const CARD_IMAGES: Record<number, string> = Object.fromEntries(
  Object.entries(CARD_IMAGE_KEYS).map(([key, file]) => [
    Number(key),
    CARDS_BASE_URL + file,
  ])
);