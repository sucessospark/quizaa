import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { ViewState, ResultType, UserResponses, CrmPayload } from './types';
import { saveResultToSupabase } from './services/supabase';
import { sendToWebhook } from './services/webhook';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [finalResult, setFinalResult] = useState<ResultType>(ResultType.LOW);

  const calculateResult = (currentResponses: UserResponses) => {
    let totalScore = 0;
    Object.values(currentResponses).forEach(score => totalScore += score);
    const hasDisqualifier = Object.values(currentResponses).some(score => score <= -5);
    
    if (hasDisqualifier) return ResultType.LOW;
    if (totalScore >= 7) return ResultType.HIGH;
    if (totalScore >= 3) return ResultType.MEDIUM;
    return ResultType.LOW;
  };

  // Função centralizada para salvar em todos os lugares (Supabase + N8N)
  const processAndSaveData = async (resType: ResultType, userResp: UserResponses) => {
    
    // Monta o payload único
    const payload: CrmPayload = {
      lead_source: 'site_auxilio_acidente',
      lead_score: Object.values(userResp).reduce((a, b) => a + b, 0),
      classification: resType,
      answers_json: JSON.stringify(userResp),
      timestamp: new Date().toISOString(),
      device_info: {
        userAgent: navigator.userAgent,
        screen: `${window.screen.width}x${window.screen.height}`
      },
      // Como removemos o formulário, enviamos como Anônimo
      contact: {
        name: 'Anônimo (Quiz Completo)',
        phone: ''
      }
    };

    console.log("Processando salvamento...", payload);

    // Executa Supabase e Webhook (N8N) em paralelo para não travar a UI
    // Não usamos 'await' aqui para a transição de tela ser instantânea, 
    // mas logamos o resultado no console.
    Promise.allSettled([
      saveResultToSupabase(payload),
      sendToWebhook(payload)
    ]).then((results) => {
      console.log("Sincronização concluída:", results);
    });
  };

  const handleQuizCompletion = (userResponses: UserResponses) => {
    const result = calculateResult(userResponses);
    setFinalResult(result);
    
    // 1. Salva os dados (Supabase + N8N)
    processAndSaveData(result, userResponses);

    // 2. Vai direto para o resultado, sem pedir nome/telefone
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

        {/* LeadForm foi removido conforme solicitado */}

        {view === ViewState.RESULT && (
          <Result 
            resultType={finalResult} 
            onReset={() => setView(ViewState.LANDING)}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;