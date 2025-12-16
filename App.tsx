import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { LeadForm } from './pages/LeadForm';
import { ViewState, ResultType, UserResponses, CrmPayload, LeadData } from './types';
import { saveResultToSupabase } from './services/supabase';
import { sendToWebhook } from './services/webhook';
import { QUIZ_QUESTIONS } from './constants';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [finalResult, setFinalResult] = useState<ResultType>(ResultType.LOW);
  const [responses, setResponses] = useState<UserResponses>({});
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  const calculateResult = (currentResponses: UserResponses) => {
    let totalScore = 0;
    Object.values(currentResponses).forEach(score => totalScore += score);
    const hasDisqualifier = Object.values(currentResponses).some(score => score <= -5);
    
    if (hasDisqualifier) return ResultType.LOW;
    if (totalScore >= 7) return ResultType.HIGH;
    if (totalScore >= 3) return ResultType.MEDIUM;
    return ResultType.LOW;
  };

  // Converte IDs em Texto (Usado tanto para WhatsApp quanto para Supabase)
  const getReadableAnswers = (userResp: UserResponses) => {
    const readable: Record<string, string> = {};
    
    QUIZ_QUESTIONS.forEach(q => {
        const selectedOption = q.options.find(opt => opt.score === userResp[q.id]);
        if (selectedOption) {
            // Chave simples para facilitar leitura no JSON do banco
            readable[q.question] = selectedOption.label;
        }
    });
    return readable;
  };

  const generateTelegramAlert = (data: LeadData, resType: ResultType, score: number) => {
    let emoji = "⚪";
    let priorityText = "Baixa";
    
    if (resType === ResultType.HIGH) {
        emoji = "🚨🔴";
        priorityText = "ALTA / URGENTE";
    } else if (resType === ResultType.MEDIUM) {
        emoji = "🟡";
        priorityText = "Média";
    }

    return `${emoji} *NOVO LEAD - ${priorityText}*\n\n` +
           `👤 *Nome:* ${data.name}\n` +
           `📱 *WhatsApp:* ${data.phone}\n` +
           `🎯 *Score:* ${score}\n` +
           `📊 *Classificação:* ${resType}`;
  };

  const processAndSaveData = async (resType: ResultType, userResp: UserResponses, contactData: LeadData) => {
    
    const leadScore = Object.values(userResp).reduce((a, b) => a + b, 0);
    const readableAnswers = getReadableAnswers(userResp);
    const telegramMsg = generateTelegramAlert(contactData, resType, leadScore);

    // ESTRUTURA OTIMIZADA PARA O SUPABASE
    // Colocamos as perguntas como chaves diretas do JSON para leitura fácil na tabela
    const answersForDb = {
        ...readableAnswers, // Espalha as perguntas:respostas como campos principais
        _metadata: {
            raw_scores: userResp,
            telegram_alert: telegramMsg,
            prioridade: resType === ResultType.HIGH ? 'ALTA' : (resType === ResultType.MEDIUM ? 'MEDIA' : 'BAIXA')
        }
    };

    const payload: CrmPayload = {
      lead_source: 'site_auxilio_acidente',
      lead_score: leadScore,
      classification: resType,
      answers_json: answersForDb, // Envia objeto direto, o service trata o stringify se precisar
      timestamp: new Date().toISOString(),
      device_info: {
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`
      },
      contact: contactData
    };

    console.log("Enviando dados estruturados...", payload);

    Promise.allSettled([
      saveResultToSupabase(payload),
      sendToWebhook(payload)
    ]).then((results) => {
      console.log("Dados sincronizados.", results);
    });
  };

  const handleQuizCompletion = (userResponses: UserResponses) => {
    const result = calculateResult(userResponses);
    setFinalResult(result);
    setResponses(userResponses);
    setView(ViewState.LEAD_FORM);
    window.scrollTo(0,0);
  };

  const handleLeadSubmit = (data: LeadData) => {
    setLeadData(data); // Guarda dados para usar na tela de resultado (WhatsApp)
    processAndSaveData(finalResult, responses, data);
    setView(ViewState.RESULT);
    window.scrollTo(0,0);
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-brand-white text-brand-charcoal">
      <Header />
      <main className="flex-grow">
        {view === ViewState.LANDING && (
          <LandingPage onStartQuiz={() => {
            setView(ViewState.QUIZ);
            window.scrollTo(0,0);
          }} />
        )}
        {view === ViewState.QUIZ && (
          <Quiz 
            onComplete={handleQuizCompletion} 
            onBack={() => setView(ViewState.LANDING)}
          />
        )}
        {view === ViewState.LEAD_FORM && (
          <LeadForm onSubmit={handleLeadSubmit} />
        )}
        {view === ViewState.RESULT && (
          <Result 
            resultType={finalResult} 
            onReset={() => setView(ViewState.LANDING)}
            userResponses={responses}
            leadData={leadData}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;