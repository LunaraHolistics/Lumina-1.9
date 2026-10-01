
import React from 'react';
import { LENORMAND_HOUSES, AFRODITE_HOUSES } from '../../../constants';
import { SpreadType } from '../../../types';

interface StudyGuidePDFProps {
  board: (number | null)[];
  spreadType: SpreadType;
  selectedHouse: number | null;
  cardAnalysis: string | null;
  userName: string;
}

export const StudyGuidePDF = React.forwardRef<HTMLDivElement, StudyGuidePDFProps>(
  ({ spreadType, userName }, ref) => {

    const getTitle = () => {
      switch(spreadType) {
        case 'mesa-real': return 'Mesa Real (Grand Tableau)';
        case 'relogio': return 'Mandala Astrológica (Relógio)';
        case 'templo-afrodite': return 'Templo de Afrodite';
        case 'mesa-9': return 'Quadrado de 9 (Mini Tableau)';
        case 'piramide': return 'Pirâmide da Síntese';
        default: return 'Guia de Estudo';
      }
    };

    const renderHeader = () => (
      <div className="flex justify-between items-end border-b-2 border-slate-900 pb-4 mb-6">
        <div>
          <h1 className="text-4xl font-cinzel font-black text-slate-900 tracking-widest">LUMINA</h1>
          <p className="text-sm font-bold uppercase tracking-[0.2em] mt-1 text-slate-600">Guia Técnico de Estudo</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-slate-900">{userName}</p>
          <p className="text-xs uppercase font-medium text-slate-500">Método: {getTitle()}</p>
        </div>
      </div>
    );

    const renderMesaReal = () => (
      <div className="flex gap-6 h-full">
        {/* Coluna 1: Diagrama (60%) */}
        <div className="w-3/5 flex flex-col">
          <div className="flex items-center gap-2 mb-2">
             <h3 className="font-bold uppercase text-xs bg-slate-900 text-white px-2 py-1">Diagrama Mestre</h3>
             <span className="text-[10px] text-slate-500 uppercase">36 Casas • Estrutura Fixa</span>
          </div>
          
          <div className="border-2 border-slate-900 p-2 flex-grow relative bg-slate-50">
             <div className="grid grid-cols-8 gap-1 h-full content-start">
                {/* 32 Cartas */}
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="aspect-[2/3] border border-slate-300 bg-white relative flex items-start justify-start p-1">
                    <span className="text-[10px] font-black text-slate-900 absolute top-0.5 left-1">{i + 1}</span>
                    <span className="text-[6px] uppercase leading-tight mt-4 text-slate-500">{LENORMAND_HOUSES[i]?.name || ''}</span>
                  </div>
                ))}
                
                {/* Veredito */}
                <div className="col-span-8 flex justify-center gap-1 mt-2 pt-2 border-t border-dashed border-slate-300">
                   {[32, 33, 34, 35].map((i) => (
                      <div key={i} className="w-[12%] aspect-[2/3] border border-slate-300 bg-white relative flex items-start justify-start p-1">
                        <span className="text-[10px] font-black text-slate-900 absolute top-0.5 left-1">{i + 1}</span>
                        <span className="text-[6px] uppercase leading-tight mt-4 text-slate-500">{LENORMAND_HOUSES[i]?.name || ''}</span>
                      </div>
                   ))}
                </div>
             </div>

             {/* SVG Example Overlay (Static Pedagogical Lines) */}
             <svg className="absolute inset-0 w-full h-full pointer-events-none p-2">
                <defs>
                   <marker id="dot" markerWidth="8" markerHeight="8" refX="4" refY="4">
                      <circle cx="4" cy="4" r="3" fill="black" />
                   </marker>
                   <marker id="square" markerWidth="8" markerHeight="8" refX="4" refY="4">
                      <rect x="1" y="1" width="6" height="6" fill="black" />
                   </marker>
                   <marker id="tri" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
                      <path d="M0,0 L8,4 L0,8 z" fill="black" />
                   </marker>
                </defs>
                
                {/* Exemplo: Espelhamento Simbólico */}
                <path d="M6% 10% Q 50% -5% 94% 10%" fill="none" stroke="black" strokeWidth="2" markerStart="url(#dot)" markerEnd="url(#dot)" opacity="0.15" />
             </svg>
          </div>
        </div>

        {/* Coluna 2: Teoria (40%) */}
        <div className="w-2/5 flex flex-col gap-4">
           {/* Glossário Geométrico */}
           <div className="border border-slate-200 p-4 rounded-lg bg-slate-50">
              <h3 className="font-bold uppercase text-xs mb-3 border-b border-slate-300 pb-1">Técnicas de Leitura</h3>
              
              <div className="space-y-3">
                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center border border-slate-900 bg-white shrink-0">
                       <svg width="20" height="20" viewBox="0 0 20 20"><line x1="2" y1="10" x2="18" y2="10" stroke="black" strokeWidth="2" markerEnd="url(#dot)" /></svg>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-bold uppercase">Espelhamento (Reflexo)</h4>
                       <p className="text-[9px] leading-tight text-slate-600">Cartas em posições simétricas. Revela o que está oculto, o contrapeso ou a intenção por trás da ação.</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center border border-slate-900 bg-white shrink-0">
                       <svg width="20" height="20" viewBox="0 0 20 20"><line x1="2" y1="10" x2="18" y2="10" stroke="black" strokeWidth="1.5" strokeDasharray="4,2" markerEnd="url(#square)" /></svg>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-bold uppercase">Cavalo (Movimento em L)</h4>
                       <p className="text-[9px] leading-tight text-slate-600">Passo do xadrez (2 casas + 1). Indica intenções, pensamentos secretos e eventos que estão chegando (dobrando a esquina).</p>
                    </div>
                 </div>

                 <div className="flex items-start gap-3">
                    <div className="w-8 h-8 flex items-center justify-center border border-slate-900 bg-white shrink-0">
                       <svg width="20" height="20" viewBox="0 0 20 20"><line x1="2" y1="10" x2="18" y2="10" stroke="black" strokeWidth="1" strokeDasharray="1,2" markerEnd="url(#tri)" /></svg>
                    </div>
                    <div>
                       <h4 className="text-[10px] font-bold uppercase">Diagonais (Modulação)</h4>
                       <p className="text-[9px] leading-tight text-slate-600">As influências que cruzam a carta. Modulam a força (para melhor ou pior) e dão o "clima" da situação.</p>
                    </div>
                 </div>
              </div>
           </div>

           {/* Tabela Rápida */}
           <div className="flex-grow border border-slate-200 p-4 rounded-lg bg-white overflow-hidden">
              <h3 className="font-bold uppercase text-xs mb-2">Casas & Significados</h3>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 overflow-y-auto h-full content-start">
                 {LENORMAND_HOUSES.map(h => (
                    <div key={h.id} className="flex justify-between items-baseline text-[8px] border-b border-slate-100 pb-0.5">
                       <span className="font-bold mr-1">{h.id}. {h.name}</span>
                       <span className="text-slate-500 truncate">{h.theme}</span>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    );

    const renderRelogio = () => (
       <div className="flex gap-6 h-full">
          <div className="w-1/2 flex flex-col items-center justify-center border-2 border-slate-200 rounded-full bg-slate-50 relative p-8">
             {/* Center */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-32">
                <div className="border-2 border-slate-900 w-20 h-28 mx-auto bg-white flex items-center justify-center mb-2">
                   <span className="font-bold text-xs uppercase">Tema Central</span>
                </div>
                <p className="text-[9px] uppercase font-bold">Síntese do Ano</p>
             </div>
             
             {/* 12 Houses */}
             {Array.from({length: 12}).map((_, i) => {
                const rad = ((i * 30) - 60) * (Math.PI / 180);
                const radius = 42; // percent
                const x = 50 + (radius * Math.cos(rad));
                const y = 50 + (radius * Math.sin(rad));
                
                const houseInfo = LENORMAND_HOUSES.find(h => h.id === 101 + i);

                return (
                   <div key={i} className="absolute w-24 text-center" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}>
                      <div className="border border-slate-400 bg-white w-12 h-16 mx-auto flex flex-col items-center justify-center mb-1">
                         <span className="font-bold text-[10px]">{i + 1}</span>
                      </div>
                      <p className="text-[7px] font-bold uppercase leading-tight">{houseInfo?.month}</p>
                      <p className="text-[6px] text-slate-500 uppercase">{houseInfo?.zodiac}</p>
                   </div>
                );
             })}
          </div>

          <div className="w-1/2 flex flex-col">
             <h3 className="font-bold uppercase text-sm mb-4 border-b border-slate-900 pb-2">Correspondências das Casas</h3>
             <div className="grid grid-cols-1 gap-2 overflow-y-auto">
                {LENORMAND_HOUSES.filter(h => h.isClockHouse).map(h => (
                   <div key={h.id} className="flex flex-col p-2 border border-slate-200 rounded bg-white">
                      <div className="flex justify-between items-center mb-1">
                         <span className="font-bold text-xs uppercase">{h.name}</span>
                         <span className="text-[9px] bg-slate-100 px-1 rounded">{h.month}</span>
                      </div>
                      <p className="text-[9px] text-slate-700 italic">{h.technicalDescription}</p>
                      <p className="text-[8px] text-slate-400 mt-1 uppercase tracking-wider">{h.pedagogicalRule}</p>
                   </div>
                ))}
             </div>
          </div>
       </div>
    );

    return (
      <div id="printable-guide" ref={ref} className="bg-white text-slate-900 font-inter w-[297mm] h-[210mm] p-8 relative overflow-hidden flex flex-col box-border">
        {renderHeader()}
        <div className="flex-grow relative">
           {spreadType === 'mesa-real' && renderMesaReal()}
           {spreadType === 'relogio' && renderRelogio()}
           {spreadType === 'templo-afrodite' && (
              <div className="flex h-full items-center justify-center flex-col">
                 <div className="grid grid-cols-3 gap-8 w-full max-w-4xl mb-8">
                    <div className="col-span-1 text-center border-b-2 border-slate-900 pb-2"><h3 className="font-bold uppercase">Consulente</h3></div>
                    <div className="col-span-1 text-center border-b-2 border-slate-900 pb-2"><h3 className="font-bold uppercase">Síntese</h3></div>
                    <div className="col-span-1 text-center border-b-2 border-slate-900 pb-2"><h3 className="font-bold uppercase">Parceiro(a)</h3></div>
                 </div>
                 
                 <div className="grid grid-cols-3 gap-12 w-full max-w-4xl flex-grow">
                    <div className="space-y-8">
                       {[0, 1, 2].map(i => <div key={i} className="border-2 border-slate-300 h-24 flex items-center justify-center bg-slate-50"><span className="font-bold text-sm uppercase">{AFRODITE_HOUSES[i].theme}</span></div>)}
                    </div>
                    <div className="flex items-center justify-center">
                       <div className="border-4 border-slate-900 h-32 w-full flex items-center justify-center bg-white shadow-xl"><span className="font-bold text-lg uppercase">Destino (7)</span></div>
                    </div>
                    <div className="space-y-8">
                       {[3, 4, 5].map(i => <div key={i} className="border-2 border-slate-300 h-24 flex items-center justify-center bg-slate-50"><span className="font-bold text-sm uppercase">{AFRODITE_HOUSES[i].theme}</span></div>)}
                    </div>
                 </div>
                 
                 <div className="mt-8 w-full border-t border-slate-200 pt-4">
                    <p className="text-[10px] text-center text-slate-500 uppercase">Utilize as linhas horizontais para comparar os planos Mental (Topo), Emocional (Meio) e Físico (Baixo).</p>
                 </div>
              </div>
           )}
           {spreadType === 'mesa-9' && (
              <div className="flex gap-8 h-full">
                 <div className="w-1/2 flex items-center justify-center">
                    <div className="grid grid-cols-3 gap-2 w-full aspect-square">
                       {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => (
                          <div key={i} className={`border-2 flex flex-col items-center justify-center p-4 ${i === 4 ? 'border-slate-900 bg-slate-100' : 'border-slate-300 bg-white'}`}>
                             <span className="font-black text-2xl mb-2">{i + 1}</span>
                             <span className="text-[8px] uppercase font-bold text-center">
                                {i === 4 ? 'FOCO CENTRAL' : 
                                 [0, 3, 6].includes(i) ? 'PASSADO' :
                                 [1, 7].includes(i) ? 'PRESENTE' : 'FUTURO'}
                             </span>
                          </div>
                       ))}
                    </div>
                 </div>
                 <div className="w-1/2 flex flex-col justify-center space-y-4">
                    <div className="border-l-4 border-slate-900 pl-4">
                       <h3 className="font-bold uppercase text-sm">A Cruz (Horizontal/Vertical)</h3>
                       <p className="text-xs text-slate-600 mt-1">Representa a estrutura estática do momento atual. O que está na mente e no concreto.</p>
                    </div>
                    <div className="border-l-4 border-slate-400 pl-4">
                       <h3 className="font-bold uppercase text-sm">Diagonais (X)</h3>
                       <p className="text-xs text-slate-600 mt-1">Representa o movimento, o destino e as influências de entrada e saída (Karma).</p>
                    </div>
                    <div className="border-l-4 border-slate-200 pl-4">
                       <h3 className="font-bold uppercase text-sm">Moldura (Cantos)</h3>
                       <p className="text-xs text-slate-600 mt-1">Cartas 1, 3, 7 e 9 formam o contexto geral e o ambiente da questão.</p>
                    </div>
                 </div>
              </div>
           )}
           {spreadType === 'piramide' && (
              <div className="flex flex-col items-center justify-center h-full gap-8">
                 <div className="max-w-xl w-full flex flex-col items-center gap-4">
                    <div className="flex gap-4">
                       {[0, 1, 2].map(i => (
                          <div key={i} className="border-2 border-slate-300 w-24 h-36 flex flex-col items-center justify-center bg-white">
                             <span className="font-bold text-lg mb-2">{i + 1}</span>
                             <span className="text-[8px] uppercase font-bold text-center text-slate-500">Mental / Opções</span>
                          </div>
                       ))}
                    </div>
                    <div className="flex gap-4">
                       {[3, 4].map(i => (
                          <div key={i} className="border-2 border-slate-300 w-24 h-36 flex flex-col items-center justify-center bg-white">
                             <span className="font-bold text-lg mb-2">{i + 1}</span>
                             <span className="text-[8px] uppercase font-bold text-center text-slate-500">Ação / Caminho</span>
                          </div>
                       ))}
                    </div>
                    <div className="flex gap-4">
                       <div className="border-4 border-slate-900 w-28 h-40 flex flex-col items-center justify-center bg-slate-50 shadow-lg">
                          <span className="font-black text-2xl mb-2">6</span>
                          <span className="text-[10px] uppercase font-black text-center text-slate-900">Síntese</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="max-w-2xl w-full grid grid-cols-3 gap-6 text-center border-t border-slate-200 pt-6">
                    <div>
                       <h3 className="font-bold uppercase text-sm mb-2 text-slate-900">Topo (Contexto)</h3>
                       <p className="text-[10px] text-slate-600">Representa as opções, o cenário mental e as possibilidades abertas.</p>
                    </div>
                    <div>
                       <h3 className="font-bold uppercase text-sm mb-2 text-slate-900">Meio (Filtro)</h3>
                       <p className="text-[10px] text-slate-600">O funil da escolha. Como o pensamento se traduz em sentimento ou ação prática.</p>
                    </div>
                    <div>
                       <h3 className="font-bold uppercase text-sm mb-2 text-slate-900">Base (Resultado)</h3>
                       <p className="text-[10px] text-slate-600">A conclusão inevitável. Onde a energia pousa e se concretiza.</p>
                    </div>
                 </div>
              </div>
           )}
        </div>
      </div>
    );
  }
);

StudyGuidePDF.displayName = 'StudyGuidePDF';
