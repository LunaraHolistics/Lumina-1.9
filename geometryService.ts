
export const getMoldura = () => [0, 7, 24, 31];

export const getEspelhamentos = (index: number) => {
  if (index >= 32) return []; // Somente para a grade 8x4

  const row = Math.floor(index / 8);
  const col = index % 8;

  const mirrorH = row * 8 + (7 - col);
  const mirrorV = (3 - row) * 8 + col;
  const mirrorD = (3 - row) * 8 + (7 - col);

  return [mirrorH, mirrorV, mirrorD].filter(i => i >= 0 && i < 32 && i !== index);
};

export const getCavalo = (index: number) => {
  if (index >= 32) return [];

  const row = Math.floor(index / 8);
  const col = index % 8;
  const moves = [
    [2, 1], [2, -1], [-2, 1], [-2, -1],
    [1, 2], [1, -2], [-1, 2], [-1, -2]
  ];

  return moves.map(([dr, dc]) => {
    const nr = row + dr;
    const nc = col + dc;
    if (nr >= 0 && nr < 4 && nc >= 0 && nc < 8) return nr * 8 + nc;
    return -1;
  }).filter(i => i !== -1);
};

export const getDiagonaisSuperiores = (index: number) => {
  if (index >= 32) return [];
  const row = Math.floor(index / 8);
  const col = index % 8;
  const results: number[] = [];
  
  [[row - 1, col - 1], [row - 1, col + 1]].forEach(([r, c]) => {
    if (r >= 0 && r < 4 && c >= 0 && c < 8) results.push(r * 8 + c);
  });
  return results;
};

export const getDiagonaisInferiores = (index: number) => {
  if (index >= 32) return [];
  const row = Math.floor(index / 8);
  const col = index % 8;
  const results: number[] = [];
  
  [[row + 1, col - 1], [row + 1, col + 1]].forEach(([r, c]) => {
    if (r >= 0 && r < 4 && c >= 0 && c < 8) results.push(r * 8 + c);
  });
  return results;
};

// ==========================================
// NOVA LÓGICA AGREGADORA (v1.8)
// ==========================================

export interface CardGeometry {
  mirrors: number[];
  knights: number[];
  diagonals: number[];
  frame: number[];
}

export const getCardGeometry = (index: number, spreadType: string): CardGeometry | null => {
  if (spreadType !== 'mesa-real') return null;
  
  return {
    mirrors: getEspelhamentos(index),
    knights: getCavalo(index),
    diagonals: [...getDiagonaisSuperiores(index), ...getDiagonaisInferiores(index)],
    frame: getMoldura()
  };
};

export const getRelativeCoords = (index: number) => {
  // Para Mesa Real 8x4
  const cols = 8;
  const row = Math.floor(index / cols);
  const col = index % cols;
  
  // Tratamento para o Veredito (cartas 33-36 / índices 32-35)
  // Elas são centralizadas visualmente, mas para vetorização simples,
  // vamos mapeá-las abaixo da grade principal.
  if (index >= 32) {
     return { x: (index - 32) + 2, y: 4.2 }; // Offset visual para centralizar
  }

  return { x: col, y: row };
};

// ==========================================
// LÓGICA MESA DE 9 CARTAS (3x3)
// ==========================================

export const getDiagonais9Cards = (index: number) => {
  // Retorna vizinhos diagonais (exclui o próprio index)
  const mainDiag = [0, 4, 8];
  const antiDiag = [2, 4, 6];
  let result: number[] = [];
  if (mainDiag.includes(index)) result = [...result, ...mainDiag.filter(i => i !== index)];
  if (antiDiag.includes(index)) result = [...result, ...antiDiag.filter(i => i !== index)];
  return [...new Set(result)];
};

export const getCruz9Cards = (index: number) => {
  // Retorna vizinhos em cruz (exclui o próprio index)
  const vertical = [1, 4, 7];
  const horizontal = [3, 4, 5];
  let result: number[] = [];
  if (vertical.includes(index)) result = [...result, ...vertical.filter(i => i !== index)];
  if (horizontal.includes(index)) result = [...result, ...horizontal.filter(i => i !== index)];
  return [...new Set(result)];
};

export const isCenter9Cards = (index: number) => index === 4;

// Funções para Visualização Pedagógica (Formas Completas)
export const getFixedCross9 = () => [1, 3, 4, 5, 7];
export const getFixedDiagonals9 = () => [0, 2, 4, 6, 8];
export const getFixedColumns9 = () => [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Todas as cartas fazem parte das colunas

// ==========================================
// LÓGICA RELÓGIO
// ==========================================

export const getOposicaoRelogio = (index: number) => {
  if (index >= 12) return -1;
  return (index + 6) % 12;
};

export interface RelogioAxis {
  name: string;
  type: 'Horizontal' | 'Vertical' | 'Oblíquo';
  description: string;
  tensionKey: string;
}

export const getAxisDataRelogio = (index: number): RelogioAxis | null => {
  const normalizedIndex = index % 6;
  switch (normalizedIndex) {
    case 0: return {
      name: "Eixo da Identidade (1-7)",
      type: 'Horizontal',
      description: "Analisa a projeção do Eu sobre o Outro. É o eixo do encontro e do confronto pessoal.",
      tensionKey: "O desafio aqui é não se anular nas parcerias (Casa 7) nem se isolar no ego (Casa 1)."
    };
    case 1: return {
      name: "Eixo dos Recursos (2-8)",
      type: 'Oblíquo',
      description: "Mede a tensão entre o que eu possuo e o que eu transformo ou compartilho com o coletivo.",
      tensionKey: "Equilibre a segurança material com a necessidade de morte simbólica e renascimento."
    };
    case 2: return {
      name: "Eixo do Conhecimento (3-9)",
      type: 'Oblíquo',
      description: "Equilibra a mente concreta/cotidiana com as grandes filosofias e visões de longo alcance.",
      tensionKey: "Evite o excesso de detalhes práticos que impedem a visão do horizonte expandido."
    };
    case 3: return {
      name: "Eixo da Segurança (4-10)",
      type: 'Vertical',
      description: "O pilar entre a vida privada (raízes) e a vida pública (carreira/reputação).",
      tensionKey: "Sem uma base emocional sólida (Casa 4), o sucesso público (Casa 10) torna-se frágil."
    };
    case 4: return {
      name: "Eixo da Criação (5-11)",
      type: 'Oblíquo',
      description: "Trata da relação entre a alegria individual e os projetos para o bem comum.",
      tensionKey: "Transforme seu prazer pessoal em algo que sirva à rede e ao futuro da comunidade."
    };
    case 5: return {
      name: "Eixo do Serviço (6-12)",
      type: 'Oblíquo',
      description: "Investiga o equilíbrio entre as obrigações da rotina física e a dissolução no espiritual.",
      tensionKey: "Não se perca no dever diário a ponto de esquecer a transcendência e o descanso da alma."
    };
    default: return null;
  }
};

export const getEixoConceitualRelogio = (index: number): string | null => {
  return getAxisDataRelogio(index)?.name || null;
};

export const getDescricaoEixoRelogio = (index: number): string => {
  return getAxisDataRelogio(index)?.description || "Eixo de modulação temporal.";
}
