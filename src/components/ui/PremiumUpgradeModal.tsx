
// src/components/ui/PremiumUpgradeModal.tsx
import React from 'react';
import { Lock, Crown, FileText, History, Sparkles, ArrowRight } from 'lucide-react';

export const PremiumUpgradeModal = ({ isOpen, onClose, trialExpired }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="bg-indigo-600 p-6 text-white text-center relative">
          <Crown className="w-12 h-12 mx-auto mb-2 opacity-80" />
          <h2 className="text-2xl font-serif">Acesso Completo</h2>
          <p className="text-indigo-100 text-sm">Desbloqueie o poder total do seu Mentor IA</p>
        </div>
        
        <div className="p-6 space-y-4">
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-slate-600">
              <FileText className="w-5 h-5 text-indigo-500 shrink-0" />
              <span><strong>PDFs de Estudo:</strong> Gere apostilas com mapas geométricos e setas de conexão.</span>
            </li>
            <li className="flex items-start gap-3 text-slate-600">
              <History className="w-5 h-5 text-indigo-500 shrink-0" />
              <span><strong>Histórico Ilimitado:</strong> Suas leituras salvas na nuvem para consultar quando quiser.</span>
            </li>
            <li className="flex items-start gap-3 text-slate-600">
              <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
              <span><strong>IA Profunda:</strong> Interpretações sem limites de tamanho e com cruzamento de dados.</span>
            </li>
          </ul>

          <div className="pt-4 space-y-3 flex flex-col items-center">
            <a 
              href="https://luminapage-sbjbhhka.manus.space" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-200 text-center"
            >
              ADQUIRIR ACESSO COMPLETO
            </a>

            <a
              href="https://novoscaminhos.github.io/portal-lumina/index.html"
              target="_blank"
              className="flex items-center justify-center gap-2 w-full border-2 border-indigo-600 text-indigo-600 font-bold py-3 rounded-xl hover:bg-indigo-50 transition-all uppercase text-xs tracking-widest text-center"
            >
              <Lock size={16} /> JÁ TENHO UMA CHAVE / ATIVAR PORTAL
            </a>

            {trialExpired ? (
              <button 
                onClick={() => window.location.href = 'https://novoscaminhos.github.io/portal-lumina/index.html'}
                className="w-full py-3 bg-slate-800 text-white rounded-xl font-bold text-[11px] uppercase tracking-widest hover:bg-black transition-all mt-2"
              >
                Acesso Expirado - Ir para o Portal de Assinatura
              </button>
            ) : (
              <button 
                onClick={onClose}
                className="w-full text-slate-400 text-sm py-2 hover:text-slate-600 transition-colors"
              >
                Continuar no modo limitado
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
