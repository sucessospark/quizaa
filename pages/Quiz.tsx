import React, { useState } from 'react';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { Button } from '../components/Button';
import { QUIZ_QUESTIONS } from '../constants';
import { UserResponses } from '../types';

interface QuizProps {
  onComplete: (responses: UserResponses) => void;
  onBack: () => void;
}

export const Quiz: React.FC<QuizProps> = ({ onComplete, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponses>({});
  const [isExiting, setIsExiting] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  const handleOptionSelect = (score: number) => {
    const newResponses = { ...responses, [currentQuestion.id]: score };
    setResponses(newResponses);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      // Small delay for UX
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
      }, 250);
    } else {
      setIsExiting(true);
      setTimeout(() => {
        onComplete(newResponses);
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen bg-slate-50 py-8 px-4 flex flex-col items-center justify-center transition-opacity duration-500 ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      <div className="w-full max-w-2xl">
        {/* Progress Header */}
        <div className="mb-8 flex items-center justify-between text-sm text-slate-500 font-medium">
          <button onClick={onBack} className="flex items-center hover:text-brand-navy transition-colors">
            <ArrowLeft size={16} className="mr-1" /> Voltar
          </button>
          <span>Questão {currentQuestionIndex + 1} de {QUIZ_QUESTIONS.length}</span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 h-2 rounded-full mb-8 overflow-hidden">
          <div 
            className="bg-brand-gold h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-xl shadow-lg border border-slate-100 p-8 md:p-10 fade-in key={currentQuestion.id}">
          <h2 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">
            {currentQuestion.question}
          </h2>
          
          {currentQuestion.description && (
            <p className="text-slate-500 mb-8 text-lg">
              {currentQuestion.description}
            </p>
          )}

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleOptionSelect(option.score)}
                className="w-full text-left p-5 rounded-lg border-2 border-slate-100 hover:border-brand-navy/30 hover:bg-slate-50 transition-all duration-200 flex items-center justify-between group focus:outline-none focus:ring-2 focus:ring-brand-gold"
              >
                <span className="text-slate-700 font-medium text-lg group-hover:text-brand-navy">
                  {option.label}
                </span>
                <ChevronRight className="text-slate-300 group-hover:text-brand-gold transition-colors" />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
            <p className="text-xs text-slate-400">
                <span className="font-bold text-brand-navy">Confidencialidade:</span> Suas respostas são utilizadas apenas para este cálculo preliminar.
            </p>
        </div>
      </div>
    </div>
  );
};