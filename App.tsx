import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { Quiz } from './pages/Quiz';
import { Result } from './pages/Result';
import { ViewState, ResultType, UserResponses } from './types';
import { sendToWebhook } from './services/webhook';

function App() {
  const [view, setView] = useState<ViewState>(ViewState.LANDING);
  const [finalResult, setFinalResult] = useState<ResultType>(ResultType.LOW);

  const calculateResult = (responses: UserResponses) => {
    let totalScore = 0;
    
    // Sum scores
    Object.values(responses).forEach(score => {
      totalScore += score;
    });

    // Check for "killer" answers
    const hasDisqualifier = Object.values(responses).some(score => score <= -5);

    if (hasDisqualifier) return ResultType.LOW;
    
    // Logic Thresholds
    if (totalScore >= 7) return ResultType.HIGH;
    if (totalScore >= 3) return ResultType.MEDIUM;
    return ResultType.LOW;
  };

  const handleQuizCompletion = (responses: UserResponses) => {
    const result = calculateResult(responses);
    setFinalResult(result);
    
    // Send data to n8n (Fire and forget, don't block UI)
    sendToWebhook({
      responses,
      result,
      timestamp: new Date().toISOString()
    });

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