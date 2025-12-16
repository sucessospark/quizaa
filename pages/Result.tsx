import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle, MessageCircle, Siren } from 'lucide-react';
import { Button } from '../components/Button';
import { ResultType, UserResponses, LeadData } from '../types';
import { RESULT_CONTENT, LINKS, QUIZ_QUESTIONS } from '../constants';

interface ResultProps {
  resultType: ResultType;
  onReset: () => void;
  userResponses?: UserResponses;
  leadData?: LeadData | null;
}

export const Result: React.FC<ResultProps> = ({ resultType, onReset, userResponses, leadData }) => {
  const content = resultType === ResultType.LOW 
    ? RESULT_CONTENT.low 
    : resultType === ResultType.MEDIUM 
      ? RESULT_CONTENT.medium 
      : RESULT_CONTENT.high;

  // Configuração visual baseada na prioridade
  const theme = {
    [ResultType.LOW]: { 
        icon: <XCircle size={64} className="text-red-500" />,
        badgeIcon: <AlertTriangle size={16} />,
        borderColor: "border-red-200",
        bgColor: "bg-red-50",
        textColor: "text-red-800",
        btnVariant: "secondary" as const
    },
    [ResultType.MEDIUM]: { 
        icon: <AlertTriangle size={64} className="text-amber-500" />,
        badgeIcon: <AlertTriangle size={16} />,
        borderColor: "border-amber-200",
        bgColor: "bg-amber-50",
        textColor: "text-amber-800",
        btnVariant: "primary" as const
    },
    [ResultType.HIGH]: { 
        icon: <CheckCircle2 size={64} className="text-emerald-600" />,
        badgeIcon: <Siren size={16} className="animate-pulse" />, // Sirene piscando
        borderColor: "border-emerald-200",
        bgColor: "bg-emerald-50",
        textColor: "text-emerald-800",
        btnVariant: "primary" as const
    }
  }[resultType];

  const handleContactClick = () => {
    // Constrói a lista de respostas em texto
    let answersList = "";
    if (userResponses) {
        QUIZ_QUESTIONS.forEach((q, index) => {
            const selected = q.options.find(opt => opt.score === userResponses[q.id]);
            if (selected) {
                answersList += `\n${index + 1}. *${q.question}*\nR: ${selected.label}\n`;
            }
        });
    }

    const name = leadData?.name ? leadData.name : "Visitante";
    
    // Cabeçalho da Mensagem
    let baseMessage = `Olá, meu nome é *${name}*.\nFiz a triagem do Auxílio-Acidente.\n\n*RESULTADO:* ${content.title}\n`;
    
    // Adiciona as respostas ao corpo da mensagem
    baseMessage += `\n*MINHAS RESPOSTAS:*${answersList}\n\nGostaria de uma análise detalhada.`;

    let url = "";

    if (resultType === ResultType.HIGH) {
        // ALTA PRIORIDADE -> Dr. Cintra
        url = `${LINKS.whatsapp}?text=${encodeURIComponent(baseMessage)}`;
    } else {
        // MÉDIA/BAIXA -> Equipe (Amanda)
        url = `${LINKS.whatsapp_team}?text=${encodeURIComponent(baseMessage)}`;
    }
    
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 flex items-center justify-center fade-in">
      <div className={`max-w-2xl w-full bg-white rounded-xl shadow-2xl overflow-hidden border-2 ${theme.borderColor}`}>
        
        {/* Status Bar */}
        <div className={`p-4 flex items-center justify-center gap-2 font-bold tracking-widest uppercase text-sm ${theme.bgColor} ${theme.textColor}`}>
            {theme.badgeIcon}
            {content.priority_label}
            {theme.badgeIcon}
        </div>

        <div className="p-8 md:p-12 text-center">
            
            <div className="flex justify-center mb-6">
                <div className="p-4 bg-gray-50 rounded-full shadow-inner">
                    {theme.icon}
                </div>
            </div>

            <h2 className="text-3xl font-serif font-bold text-brand-black mb-4">{content.title}</h2>
            
            <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-lg mx-auto">
                {content.description}
            </p>

            <div className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-100">
                <p className="text-sm text-gray-500 italic">
                    "{content.subtext}"
                </p>
            </div>

            <div className="flex flex-col gap-4">
                <Button 
                    variant={theme.btnVariant} 
                    fullWidth 
                    className="py-5 text-lg shadow-xl animate-pulse"
                    onClick={handleContactClick}
                >
                    <MessageCircle size={24} />
                    {content.action}
                </Button>

                <button onClick={onReset} className="text-xs text-gray-400 hover:text-brand-charcoal underline mt-4">
                    Refazer Triagem
                </button>
            </div>

        </div>
      </div>
    </div>
  );
};