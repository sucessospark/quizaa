import React from 'react';
import { CheckCircle2, AlertCircle, FileText, Download, MessageCircle } from 'lucide-react';
import { Button } from '../components/Button';
import { ResultType } from '../types';
import { RESULT_CONTENT, COMPANY, LINKS } from '../constants';

interface ResultProps {
  resultType: ResultType;
  onReset: () => void;
}

export const Result: React.FC<ResultProps> = ({ resultType, onReset }) => {
  const content = resultType === ResultType.LOW 
    ? RESULT_CONTENT.low 
    : resultType === ResultType.MEDIUM 
      ? RESULT_CONTENT.medium 
      : RESULT_CONTENT.high;

  // Colors and Icons based on result
  const theme = {
    [ResultType.LOW]: { 
        icon: <FileText size={48} className="text-slate-400" />,
        color: "bg-slate-100 border-slate-200",
        btnVariant: "outline" as const,
        btnIcon: <Download size={20} />
    },
    [ResultType.MEDIUM]: { 
        icon: <AlertCircle size={48} className="text-amber-500" />,
        color: "bg-amber-50 border-amber-100",
        btnVariant: "primary" as const,
        btnIcon: <FileText size={20} />
    },
    [ResultType.HIGH]: { 
        icon: <CheckCircle2 size={48} className="text-emerald-600" />,
        color: "bg-emerald-50 border-emerald-100",
        btnVariant: "primary" as const,
        btnIcon: <MessageCircle size={20} />
    }
  }[resultType];

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 flex items-center justify-center fade-in">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-brand-black p-8 text-center border-b-4 border-brand-gold">
          <h2 className="text-white font-serif text-2xl">Resultado da Análise</h2>
          <p className="text-brand-steel text-sm mt-2 uppercase tracking-widest">Protocolo de Triagem Digital</p>
        </div>

        <div className="p-8 md:p-12">
            
            {/* Classification Badge */}
            <div className={`flex items-center gap-4 p-6 rounded-xl border mb-8 ${theme.color}`}>
                <div className="shrink-0 bg-white p-3 rounded-full shadow-sm">
                    {theme.icon}
                </div>
                <div>
                    <h3 className="font-bold text-lg text-slate-800">{content.title}</h3>
                    <p className="text-slate-600 text-sm mt-1 leading-relaxed">{content.description}</p>
                </div>
            </div>

            {/* Disclaimer for Medium/High */}
            {resultType !== ResultType.LOW && (
                <div className="bg-blue-50 p-4 rounded-md mb-8 border border-blue-100">
                    <p className="text-blue-800 text-sm">
                        <strong>Importante:</strong> Este resultado não é uma sentença judicial. Ele indica apenas que seu relato contém elementos técnicos compatíveis com a concessão do benefício na esfera administrativa ou judicial.
                    </p>
                </div>
            )}

            {/* Action Area */}
            <div className="flex flex-col items-center text-center space-y-6">
                <p className="text-slate-500 max-w-lg">{content.subtext}</p>
                
                <Button 
                    variant={theme.btnVariant} 
                    className="w-full md:w-auto min-w-[300px] text-lg py-4"
                    onClick={() => {
                         if (resultType === ResultType.HIGH) {
                             window.open(`${LINKS.whatsapp}?text=Olá, fiz a triagem do Auxílio-Acidente e deu chance alta. Gostaria de falar com o escritório.`, '_blank');
                         } else {
                             alert("Em um ambiente real, isso abriria o checkout do Parecer ou download do Ebook.");
                         }
                    }}
                >
                    {theme.btnIcon}
                    {content.action}
                </Button>

                <button onClick={onReset} className="text-slate-400 text-sm hover:text-brand-black underline underline-offset-4">
                    Refazer simulação
                </button>
            </div>
        </div>

        {/* Footer of Card */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
            <p className="text-xs text-slate-400">Responsável Técnico: {COMPANY.attorney} - {COMPANY.oab_mg}</p>
        </div>

      </div>
    </div>
  );
};