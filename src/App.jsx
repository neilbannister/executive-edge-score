import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import QuizPage from './pages/QuizPage';
import ResultsPage from './pages/ResultsPage';

export default function App() {
  const [quizData, setQuizData] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/quiz" element={<QuizPage onComplete={setQuizData} />} />
      <Route
        path="/results"
        element={
          quizData
            ? <ResultsPage quizData={quizData} />
            : <Navigate to="/" replace />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
