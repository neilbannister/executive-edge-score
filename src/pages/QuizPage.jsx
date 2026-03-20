import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QUESTIONS, calculateResults } from '../data/quizData';
import './QuizPage.css';

const NAME_STEP_INDEX = 1; // After question 0 (growth_area), ask name
const JOB_ROLE_STEP_INDEX = 4; // After 2 more questions, ask job role

export default function QuizPage({ onComplete }) {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [firstName, setFirstName] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [jobRole, setJobRole] = useState('');
  const [jobRoleInput, setJobRoleInput] = useState('');
  const [answers, setAnswers] = useState({});
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [phoneInput, setPhoneInput] = useState('');
  const nameRef = useRef(null);
  const jobRoleRef = useRef(null);

  // Map step to question index (accounting for name step at 1, job role step at 4)
  const getQuestionIndex = (s) => {
    if (s === 0) return 0;
    if (s === NAME_STEP_INDEX) return null; // name step
    if (s === JOB_ROLE_STEP_INDEX) return null; // job role step
    // Steps 2-3 map to questions 1-2, steps 5+ map to questions 3+
    if (s < JOB_ROLE_STEP_INDEX) return s - 1;
    return s - 2; // subtract 2 for the two special steps (name + job role)
  };

  const totalSteps = QUESTIONS.length + 2 + 2; // questions + name + jobRole + email + phone
  const currentQuestionIndex = getQuestionIndex(step);
  const isNameStep = step === NAME_STEP_INDEX;
  const isJobRoleStep = step === JOB_ROLE_STEP_INDEX;
  const isEmailStep = step === QUESTIONS.length + 2;
  const isPhoneStep = step === QUESTIONS.length + 3;
  const currentQuestion = currentQuestionIndex !== null ? QUESTIONS[currentQuestionIndex] : null;

  // Progress: count answered questions + name
  const answeredCount = Object.keys(answers).length + (firstName ? 1 : 0);
  const progressPercent = Math.round((answeredCount / (QUESTIONS.length + 1)) * 100);

  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
    setCurrentFeedback('');
  }, [step]);

  useEffect(() => {
    if (isNameStep && nameRef.current) {
      setTimeout(() => nameRef.current?.focus(), 100);
    }
    if (isJobRoleStep && jobRoleRef.current) {
      setTimeout(() => jobRoleRef.current?.focus(), 100);
    }
  }, [isNameStep, isJobRoleStep]);

  const handleAnswer = (value) => {
    if (isTransitioning) return;
    const q = currentQuestion;
    setSelectedOption(value);

    const newAnswers = { ...answers, [q.id]: value };
    setAnswers(newAnswers);

    // Auto-advance after brief selection highlight
    setTimeout(() => {
      proceedToNext();
    }, 400);
  };

  const proceedToNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(s => s + 1);
      setIsTransitioning(false);
    }, 350);
  };

  const handleNameSubmit = () => {
    if (!nameInput.trim()) return;
    setFirstName(nameInput.trim());
    proceedToNext();
  };

  const handleJobRoleSubmit = () => {
    if (!jobRoleInput.trim()) return;
    setJobRole(jobRoleInput.trim());
    proceedToNext();
  };

  const handleEmailSubmit = () => {
    proceedToNext();
  };

  const handlePhoneSubmit = () => {
    // Final step — calculate results
    const results = calculateResults(answers);
    onComplete({
      firstName: firstName || 'there',
      jobRole: jobRole || '',
      answers,
      email: emailInput,
      phone: phoneInput,
      ...results,
    });
    navigate('/results');
  };

  const handleKeyDown = (e, submitFn) => {
    if (e.key === 'Enter') submitFn();
  };

  const renderProgressBar = () => (
    <div className="quiz-progress">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progressPercent}%` }} />
      </div>
      <span className="progress-label">
        {firstName ? `${firstName}'s Executive Edge Score` : 'Your Executive Edge Score'}
      </span>
    </div>
  );

  const renderQuestion = () => {
    const q = currentQuestion;
    if (!q) return null;
    const isIncomeQuestion = q.id === 'income';

    return (
      <div className={`quiz-card ${isTransitioning ? 'transitioning' : ''}`}>
        <div className="question-meta">
          <span className="question-number">
            Question {currentQuestionIndex + 1} of {QUESTIONS.length}
          </span>
        </div>

        <h2 className="question-text">
          {firstName ? q.question.replace('your', `${firstName}'s`).replace('You', firstName) : q.question}
        </h2>

        {q.subtitle && (
          <p className="question-subtitle">{q.subtitle}</p>
        )}

        <div className={`options-grid ${isIncomeQuestion ? 'options-grid-income' : ''}`}>
          {q.options.map((option) => (
            <button
              key={option.value}
              className={`option-btn ${selectedOption === option.value ? 'option-selected' : ''} ${selectedOption && selectedOption !== option.value ? 'option-dimmed' : ''}`}
              onClick={() => handleAnswer(option.value)}
              disabled={!!selectedOption}
            >
              {option.icon && (
                <span className="option-icon">{option.icon}</span>
              )}
              <span className="option-label">{option.label}</span>
              <span className="option-check">
                {selectedOption === option.value ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : null}
              </span>
            </button>
          ))}
        </div>

      </div>
    );
  };

  const renderNameStep = () => (
    <div className={`quiz-card ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="name-step">
        <div className="name-step-icon">👋</div>
        <h2 className="question-text">
          Great start. What's your first name?
        </h2>
        <p className="question-subtitle">
          We'll personalise every remaining question and your results just for you.
        </p>
        <div className="name-input-group">
          <input
            ref={nameRef}
            type="text"
            className="text-input"
            placeholder="Your first name"
            value={nameInput}
            onChange={e => setNameInput(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handleNameSubmit)}
            maxLength={40}
          />
          <button
            className="btn-next btn-next-full"
            onClick={handleNameSubmit}
            disabled={!nameInput.trim()}
          >
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const renderJobRoleStep = () => (
    <div className={`quiz-card ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="name-step">
        <div className="name-step-icon">💼</div>
        <h2 className="question-text">
          What's your current or most recent job role, {firstName}?
        </h2>
        <p className="question-subtitle">
          This helps us tailor your Executive Edge Score and action plan to your exact career level and context.
        </p>
        <div className="name-input-group">
          <input
            ref={jobRoleRef}
            type="text"
            className="text-input"
            placeholder="e.g. Marketing Director, Founder & CEO, Senior Software Engineer"
            value={jobRoleInput}
            onChange={e => setJobRoleInput(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handleJobRoleSubmit)}
            maxLength={100}
          />
          <button
            className="btn-next btn-next-full"
            onClick={handleJobRoleSubmit}
            disabled={!jobRoleInput.trim()}
          >
            Continue
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmailStep = () => (
    <div className={`quiz-card ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="name-step">
        <div className="name-step-icon">📩</div>
        <h2 className="question-text">
          {firstName}, where should we send your results?
        </h2>
        <p className="question-subtitle">
          Your personalised Executive Edge Score, action plan, and letter from Ilana will be sent here instantly.
        </p>
        <div className="name-input-group">
          <input
            type="email"
            className="text-input"
            placeholder="Your email address"
            value={emailInput}
            onChange={e => setEmailInput(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handleEmailSubmit)}
          />
          <button
            className="btn-next btn-next-full"
            onClick={handleEmailSubmit}
            disabled={!emailInput.trim()}
          >
            Send My Results
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <p className="privacy-note">
          🔒 Your data is private and never sold. Unsubscribe anytime.
        </p>
      </div>
    </div>
  );

  const renderPhoneStep = () => (
    <div className={`quiz-card ${isTransitioning ? 'transitioning' : ''}`}>
      <div className="name-step">
        <div className="name-step-icon">📱</div>
        <h2 className="question-text">
          One last step, {firstName} — where can we reach you?
        </h2>
        <p className="question-subtitle">
          By providing your number, you give us consent to send your results and follow up via text and/or call.
        </p>
        <div className="name-input-group">
          <input
            type="tel"
            className="text-input"
            placeholder="Your phone number (with country code)"
            value={phoneInput}
            onChange={e => setPhoneInput(e.target.value)}
            onKeyDown={e => handleKeyDown(e, handlePhoneSubmit)}
          />
          <button
            className="btn-next btn-next-full"
            onClick={handlePhoneSubmit}
          >
            See My Executive Edge Score
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
        <button
          className="skip-link"
          onClick={handlePhoneSubmit}
        >
          Skip this step →
        </button>
        <p className="privacy-note">
          🔒 We respect your privacy. No spam, ever.
        </p>
      </div>
    </div>
  );

  return (
    <div className="quiz-page">
      <div className="quiz-bg">
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-1" />
      </div>

      <header className="quiz-header">
        <div className="header-logo">
          <img src="/leap-logo.png" alt="Leap Academy" className="logo-img" />
        </div>
        <div className="header-title">The Executive Edge Score</div>
      </header>

      <main className="quiz-main">
        <div className="container">
          {renderProgressBar()}

          <div className="quiz-content">
            {isNameStep && renderNameStep()}
            {isJobRoleStep && renderJobRoleStep()}
            {isEmailStep && renderEmailStep()}
            {isPhoneStep && renderPhoneStep()}
            {!isNameStep && !isJobRoleStep && !isEmailStep && !isPhoneStep && renderQuestion()}
          </div>

          {/* Reassurance */}
          <div className="quiz-footer-note">
            <span>🔒 Your answers are completely confidential</span>
            <span>·</span>
            <span>Used by leaders at Google, JPMorgan & McKinsey</span>
          </div>
        </div>
      </main>
    </div>
  );
}
