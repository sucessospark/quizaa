import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { LeadForm } from './pages/LeadForm';
import { ViewState, ResultType, UserResponses, LeadData, CrmPayload } from './types';
import { saveResultToSupabase } from './services/supabase';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [finalResult, setFinalResult] = useState<ResultType>(ResultType.LOW);
  const [responses, setResponses] = useState<UserResponses>({});

  const calculateResult = (currentResponses: UserResponses) => {
    let totalScore = 0;
    Object.values(currentResponses).forEach(score => totalScore += score);
    const hasDisqualifier = Object.values(currentResponses).some(score => score <= -5);
    
    if (hasDisqualifier) return ResultType.LOW;
    if (totalScore >= 7) return ResultType.HIGH;
    if (totalScore >= 3) return ResultType.MEDIUM;
    return ResultType.LOW;
  };

  // Funcao auxiliar para montar o payload e salvar
  const saveToDb = async (resType: ResultType, userResp: UserResponses, contact?: LeadData) => {
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
      contact: contact
    };
    await saveResultToSupabase(payload);
  };

  const handleQuizCompletion = async (userResponses: UserResponses) => {
    const result = calculateResult(userResponses);
    setResponses(userResponses);
    setFinalResult(result);
    
    // LOGICA PRINCIPAL:
    // Se for HIGH, manda para o Formulario de Lead antes de mostrar o resultado.
    // Se for MEDIUM/LOW, mostra o resultado direto (e salva como anônimo).
    
    if (result === ResultType.HIGH) {
      setView(ViewState.LEAD_FORM);
    } else {
      await saveToDb(result, userResponses); // Salva anônimo
      setView(ViewState.RESULT);
      window.scrollTo(0,0);
    }
  };

  const handleLeadSubmit = async (data: LeadData) => {
    // Agora salvamos no banco com os dados do lead
    // Aguarda o salvamento antes de mostrar o resultado
    await saveToDb(finalResult, responses, data);
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
          />
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;