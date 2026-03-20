import React, { useState, useEffect, useRef } from 'react';
import { RESULT_TIERS, QUESTIONS } from '../data/quizData';
import { fetchPersonalizedContent } from '../api/personalize';
import { buildPersonalizedContent } from '../data/personalizeContent';
import './ResultsPage.css';

// ─── ANIMATED SCORE COUNTER ─────────────────────────────────────────────────
function AnimatedScore({ target, duration = 1800, delay = 0 }) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
    }, delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCurrent(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, target, duration]);

  return <>{current}</>;
}

// ─── SCORE RING ──────────────────────────────────────────────────────────────
function ScoreRing({ score, size = 140, strokeWidth = 10, color, delay = 0 }) {
  const [animated, setAnimated] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = animated ? circumference - (score / 100) * circumference : circumference;

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), delay + 200);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth={strokeWidth} />
      <circle
        cx={size / 2} cy={size / 2} r={radius}
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: `stroke-dashoffset 1.6s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms` }}
      />
    </svg>
  );
}

// ─── SECTION DIVIDER ────────────────────────────────────────────────────────
function SectionDivider({ label }) {
  return (
    <div className="section-divider">
      <div className="divider-line" />
      {label && <span className="divider-label">{label}</span>}
      <div className="divider-line" />
    </div>
  );
}

// ─── LOADING SCREEN ─────────────────────────────────────────────────────────
function LoadingScreen({ firstName }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const messages = [
    `Ilana is reviewing your answers, ${firstName}...`,
    'Crafting your personalized results...',
    'Analyzing your Executive Edge pattern...',
    'Building your custom action plan...',
    'Almost ready...',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-logo">
          <img src="/leap-logo.png" alt="Leap Academy" className="logo-img logo-img-light" />
        </div>
        <div className="loading-spinner">
          <svg width="64" height="64" viewBox="0 0 64 64">
            <circle cx="32" cy="32" r="28" fill="none" stroke="rgba(214,182,95,0.15)" strokeWidth="4" />
            <circle
              cx="32" cy="32" r="28" fill="none" stroke="var(--gold)" strokeWidth="4"
              strokeDasharray="176" strokeDashoffset="132" strokeLinecap="round"
              className="loading-ring"
            />
          </svg>
        </div>
        <p className="loading-message">{messages[messageIndex]}</p>
        <p className="loading-sub">This takes a few seconds</p>
      </div>
    </div>
  );
}

// ─── MAIN RESULTS PAGE ──────────────────────────────────────────────────────
export default function ResultsPage({ quizData }) {
  const { firstName, answers, overallScore, subScores, tier } = quizData;
  const tierData = RESULT_TIERS[tier];
  const [sectionsVisible, setSectionsVisible] = useState({});
  const observerRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [aiContent, setAiContent] = useState(null);

  // ─── Fetch AI-personalized content ───────────────────────────────────────
  useEffect(() => {
    const loadPersonalizedContent = async () => {
      try {
        // Build answer labels for the prompt
        const answerLabels = {};
        QUESTIONS.forEach(q => {
          const answer = answers[q.id];
          if (answer) {
            const option = q.options.find(o => o.value === answer);
            answerLabels[q.id] = option?.label || answer;
          }
        });

        // Build tier context for reference
        const staticLetter = typeof tierData.ilanaLetter === 'function'
          ? tierData.ilanaLetter(firstName, answers)
          : '';

        const tierContext = {
          label: tierData.label,
          incomeRange: tierData.incomeRange,
          heroMessage: tierData.heroMessage,
          ilanaLetterText: staticLetter,
          opportunityCost: tierData.opportunityCost,
          actionPlan: tierData.actionPlan,
        };

        const result = await fetchPersonalizedContent({
          firstName,
          answers,
          answerLabels,
          tier,
          overallScore,
          subScores,
          tierContext,
        });

        setAiContent(result);
      } catch (err) {
        console.warn('AI personalization failed, using static content:', err.message);
        // aiContent stays null — fallback to static
      } finally {
        setIsLoading(false);
      }
    };

    loadPersonalizedContent();
  }, []);

  // ─── Intersection Observer (runs after loading completes) ────────────────
  useEffect(() => {
    if (isLoading) return;
    window.scrollTo(0, 0);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            setSectionsVisible(prev => ({ ...prev, [e.target.dataset.section]: true }));
          }
        });
      },
      { threshold: 0.08 }
    );
    // Small delay to ensure DOM is painted
    const t = setTimeout(() => {
      document.querySelectorAll('[data-section]').forEach(el => observerRef.current.observe(el));
    }, 100);
    return () => {
      clearTimeout(t);
      observerRef.current?.disconnect();
    };
  }, [isLoading]);

  const isVisible = (id) => !!sectionsVisible[id];

  // ─── Show loading screen while AI content generates ──────────────────────
  if (isLoading) {
    return <LoadingScreen firstName={firstName} />;
  }

  // ─── Merge AI content with personalized static fallbacks ─────────────────
  const staticLetter = typeof tierData.ilanaLetter === 'function'
    ? tierData.ilanaLetter(firstName, answers)
    : '';

  // Build deeply personalized static content (uses answers + scores)
  const personalizedStatic = buildPersonalizedContent(tierData, firstName, answers, subScores, overallScore);

  const displayHeroMessage = aiContent?.heroMessage || personalizedStatic.heroMessage;
  const displayLetter = aiContent?.ilanaLetter || staticLetter;
  const displayOpportunityCost = aiContent?.opportunityCost || personalizedStatic.opportunityCost;
  const displayActionPlan = aiContent?.actionPlan || personalizedStatic.actionPlan;

  const letter = displayLetter;

  const subScoreLabels = {
    brand: { label: 'Brand Power', icon: '🏛️', desc: 'How visible and compelling your professional brand is to decision-makers.' },
    confidence: { label: 'Confidence Index', icon: '💎', desc: 'Your ability to command rooms, pursue opportunities, and back yourself.' },
    leadership: { label: 'Leadership Presence', icon: '⚡', desc: 'How others experience you as a leader, strategist, and visionary.' },
    authority: { label: 'Opportunity Radar', icon: '🎯', desc: 'Your ability to attract, recognise, and convert high-value opportunities.' },
  };

  const scoreColor = (s) => s >= 70 ? '#2d7a5a' : s >= 50 ? '#d6b65f' : '#8b2d2d';
  const scoreLabel = (s) => s >= 75 ? 'Strong' : s >= 55 ? 'Developing' : s >= 40 ? 'Needs Focus' : 'Critical Gap';

  const BOOK_CALL_URL = 'https://www.leapacademy.com/strategy-call';

  return (
    <div className="results-page">
      {/* Background */}
      <div className="results-bg">
        <div className="bg-grid" />
        <div className="bg-glow bg-glow-top" style={{ '--glow-color': tierData.color }} />
      </div>

      {/* Header */}
      <header className="results-header">
        <div className="header-logo">
          <img src="/leap-logo.png" alt="Leap Academy" className="logo-img" />
        </div>
        <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="header-cta-btn">
          Book Your Strategy Call →
        </a>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1: SCORE DASHBOARD
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="score-hero" data-section="score" style={{ '--tier-color': tierData.color }}>
        <div className="container">
          <div className={`score-hero-inner ${isVisible('score') ? 'visible' : ''}`}>
            <div className="score-eyebrow">
              <span className="tier-badge">{tierData.label}</span>
              <span className="tier-range">{tierData.incomeRange}</span>
            </div>

            <h1 className="score-headline">
              {firstName}, here's your<br />
              <em>Executive Edge Score</em>
            </h1>

            <p className="score-tagline">{tierData.tagline}</p>

            {/* Overall score */}
            <div className="overall-score-display">
              <div className="score-ring-wrapper">
                <ScoreRing score={overallScore} size={180} strokeWidth={14} color={tierData.color} delay={300} />
                <div className="score-ring-center">
                  <span className="score-number" style={{ color: tierData.color }}>
                    <AnimatedScore target={overallScore} delay={500} />
                  </span>
                  <span className="score-out-of">/100</span>
                </div>
              </div>
              <div className="score-meta">
                <div className="score-title-text">Executive Edge Score</div>
                <p className="score-hero-message">{displayHeroMessage}</p>
              </div>
            </div>

            {/* Sub-scores */}
            <div className="sub-scores-grid">
              {Object.entries(subScores).map(([key, value], i) => {
                const info = subScoreLabels[key];
                return (
                  <div key={key} className="sub-score-card">
                    <div className="sub-score-header">
                      <span className="sub-score-icon">{info.icon}</span>
                      <span className="sub-score-label">{info.label}</span>
                      <span
                        className="sub-score-badge"
                        style={{ background: `${scoreColor(value)}20`, color: scoreColor(value) }}
                      >
                        {scoreLabel(value)}
                      </span>
                    </div>
                    <div className="sub-score-bar-track">
                      <div
                        className="sub-score-bar-fill"
                        style={{
                          '--target': `${value}%`,
                          background: scoreColor(value),
                          animationDelay: `${600 + i * 150}ms`
                        }}
                      />
                    </div>
                    <div className="sub-score-values">
                      <span className="sub-score-num" style={{ color: scoreColor(value) }}>
                        <AnimatedScore target={value} delay={700 + i * 150} />
                      </span>
                      <span className="sub-score-desc">{info.desc}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Answer-specific feedback recap */}
            <div className="answer-recap">
              <h3 className="recap-title">How we scored you, {firstName}</h3>
              <div className="recap-grid">
                {QUESTIONS.slice(0, 6).map((q) => {
                  const answer = answers[q.id];
                  const option = q.options.find(o => o.value === answer);
                  const feedback = q.feedback?.[answer];
                  if (!answer || !feedback) return null;
                  return (
                    <div key={q.id} className="recap-item">
                      <div className="recap-question">
                        {option?.icon && <span className="recap-icon">{option.icon}</span>}
                        <span className="recap-answer-label">"{option?.label}"</span>
                      </div>
                      <p className="recap-feedback">{feedback}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider label="Your Opportunity Cost" />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1B: OPPORTUNITY COST
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="opp-cost-section" data-section="oppcost" style={{ '--tier-color': tierData.color }}>
        <div className="container">
          <div className={`opp-cost-inner ${isVisible('oppcost') ? 'visible' : ''}`}>
            <div className="opp-cost-eyebrow">⏳ The Cost of Standing Still</div>
            <h2 className="opp-cost-headline">
              {firstName}, {displayOpportunityCost.headline}
            </h2>

            <div className="opp-cost-financial-card">
              <div className="opp-cost-amount" style={{ color: tierData.color }}>
                {displayOpportunityCost.financialGap}
              </div>
              <div className="opp-cost-timeframe">
                estimated income left on the table {displayOpportunityCost.timeframe}
              </div>
            </div>

            <div className="opp-cost-milestones-grid">
              {displayOpportunityCost.milestones.map((m, i) => (
                <div key={i} className="opp-cost-milestone">
                  <span className="opp-cost-milestone-icon">{m.icon}</span>
                  <div className="opp-cost-milestone-content">
                    <h4 className="opp-cost-milestone-title">{m.title}</h4>
                    <p className="opp-cost-milestone-desc">{m.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="opp-cost-closing">{displayOpportunityCost.closingLine}</p>
          </div>
        </div>
      </section>

      <SectionDivider label="Your Personalised Training" />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2: VSL / FREE TRAINING
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="vsl-section" data-section="vsl">
        <div className="container">
          <div className={`vsl-inner ${isVisible('vsl') ? 'visible' : ''}`}>
            <div className="vsl-label">Free Training for {tierData.label}s</div>
            <h2 className="section-title">
              The Exact Steps {firstName} Needs to<br />
              <em>Leap to the Next Level</em>
            </h2>
            <p className="section-subtitle">
              Ilana has handpicked this training specifically for professionals at your level and income band. Watch it before your strategy call.
            </p>

            <div className="vsl-frame-wrapper">
              <div className="vsl-placeholder">
                {/* REPLACE src with actual YouTube/Vimeo embed URL for this tier */}
                {/* Tier: {tier} · URL slot: tierData.vslUrl */}
                <div className="vsl-placeholder-inner">
                  <div className="play-button">▶</div>
                  <p className="vsl-placeholder-text">
                    <strong>Video Training</strong><br />
                    Replace <code>tierData.vslUrl</code> with your YouTube/Vimeo embed URL for the <strong>{tierData.label}</strong> tier.
                  </p>
                  <code className="vsl-url-hint">
                    Tier ID: <strong>{tier}</strong><br />
                    Edit: <em>src/data/quizData.js → RESULT_TIERS.{tier}.vslUrl</em>
                  </code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3: CTA #1 (UNDER VSL)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="cta-section cta-primary-section" data-section="cta1">
        <div className="container">
          <div className={`cta-card ${isVisible('cta1') ? 'visible' : ''}`} style={{ '--tier-color': tierData.color }}>
            <div className="cta-card-inner">
              <div className="cta-left">
                <div className="cta-eyebrow">Limited Spots Available</div>
                <h2 className="cta-headline">
                  Book Your Private Strategy Call<br />
                  <em>with Ilana's Team</em>
                </h2>
                <p className="cta-desc">
                  In 45 minutes, you'll leave with the exact 3-step plan to go from where you are to where you deserve to be. No fluff. No pitch. Just the most actionable strategy session you've had this year.
                </p>
                <ul className="cta-bullets">
                  {[
                    `A complete audit of your Executive Edge — what's working and exactly what isn't`,
                    `Your personalised "${tierData.label}" roadmap for the next 90 days`,
                    `The specific moves that have helped Leap clients achieve $50K–$150K+ income jumps`,
                    `Clarity on whether Leap Academy is the right next step for ${firstName}`,
                  ].map((b, i) => (
                    <li key={i}>
                      <span className="bullet-check" style={{ color: tierData.color }}>✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="cta-right">
                <div className="cta-box">
                  <div className="cta-box-label">Your Strategy Call</div>
                  <div className="cta-box-value">
                    <span className="cta-box-free">FREE</span>
                    <span className="cta-box-worth">(Worth $500)</span>
                  </div>
                  <div className="cta-box-time">45 Minutes · 1-on-1</div>
                  <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="cta-button-main">
                    Book My Strategy Call
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </a>
                  <p className="cta-box-note">
                    Leap Academy has helped professionals at Google, JPMorgan, McKinsey and 50+ top firms.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider label="Ilana's Letter to You" />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4: PERSONALISED LETTER FROM ILANA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="letter-section" data-section="letter">
        <div className="container">
          <div className={`letter-card ${isVisible('letter') ? 'visible' : ''}`}>
            <div className="letter-header">
              <div className="letter-avatar">
                <img
                  src="https://www.leapacademy.com/wp-content/uploads/2023/01/ilana-headshot.jpg"
                  alt="Ilana Golan"
                  onError={e => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }}
                />
                <div className="letter-avatar-fallback">IG</div>
              </div>
              <div className="letter-from">
                <span className="letter-from-name">Ilana Golan</span>
                <span className="letter-from-title">Founder & CEO, Leap Academy</span>
              </div>
              <div className="letter-badge">Personalised for {firstName}</div>
            </div>

            <div className="letter-body">
              {letter.split('\n\n').map((para, i) => (
                <p key={i} className={i === letter.split('\n\n').length - 1 ? 'letter-signature' : 'letter-para'}>
                  {para}
                </p>
              ))}
            </div>

            <div className="letter-footer">
              <div className="letter-signature-block">
                <img
                  src="/ilana-signature.png"
                  alt="Ilana's signature"
                  className="signature-img"
                  onError={e => { e.target.style.display='none'; }}
                />
                <div className="signature-text">Ilana Golan</div>
                <div className="signature-role">F-16 Commander → Tech Executive → Founder of Leap Academy</div>
              </div>
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="cta-button-outline">
                Book Your Strategy Call with Ilana's Team →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider label="Your Action Plan" />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5: PERSONALISED ACTION PLAN
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="action-section" data-section="action">
        <div className="container">
          <div className={`action-inner ${isVisible('action') ? 'visible' : ''}`}>
            <h2 className="section-title">
              {firstName}'s 90-Day<br />
              <em>Executive Edge Action Plan</em>
            </h2>
            <p className="section-subtitle">
              Based on your answers, these are the 3 highest-leverage moves for your specific situation.
            </p>

            <div className="action-steps">
              {displayActionPlan.map((step, i) => (
                <div key={i} className="action-step">
                  <div className="step-number-block" style={{ background: tierData.color }}>
                    <span className="step-number">{i + 1}</span>
                    <span className="step-urgency">{step.urgency}</span>
                  </div>
                  <div className="step-content">
                    <h3 className="step-title">{step.title}</h3>
                    <p className="step-detail">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="action-cta-bar">
              <p>Want Ilana to build your full personalised plan?</p>
              <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="cta-button-dark">
                Book a Strategy Call →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6: CTA #2
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="cta-section cta-secondary-section" data-section="cta2">
        <div className="container">
          <div className={`cta-banner ${isVisible('cta2') ? 'visible' : ''}`} style={{ '--tier-color': tierData.color }}>
            <div className="banner-left">
              <h3>Ready to turn your {tierData.label} score into your biggest career leap yet?</h3>
              <p>{firstName}, your strategy call is completely free. Spots fill within 24 hours.</p>
            </div>
            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="cta-button-main cta-banner-btn">
              Book My Free Strategy Call
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider label="Recommended for You" />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7: PODCAST RECOMMENDATIONS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="podcast-section" data-section="podcasts">
        <div className="container">
          <div className={`podcast-inner ${isVisible('podcasts') ? 'visible' : ''}`}>
            <div className="section-eyebrow">Ilana's Podcast · Curated for {tierData.label}s</div>
            <h2 className="section-title">
              Episodes Handpicked<br />
              <em>for {firstName}'s Situation</em>
            </h2>
            <p className="section-subtitle">
              These are the episodes most relevant to exactly where you are — and where you want to go.
            </p>

            <div className="podcast-grid">
              {tierData.podcastEpisodes.map((ep, i) => (
                <div key={i} className="podcast-card">
                  <div className="podcast-thumb">
                    {/* REPLACE with actual YouTube embed: https://www.youtube.com/embed/{ep.youtubeId} */}
                    <div className="podcast-thumb-placeholder">
                      <div className="podcast-play">▶</div>
                      <span className="podcast-placeholder-note">
                        Replace <code>ep.youtubeId</code>:<br />
                        <strong>{ep.youtubeId}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="podcast-meta">
                    <div className="podcast-tags">
                      {ep.tags.map(t => (
                        <span key={t} className="podcast-tag">{t}</span>
                      ))}
                    </div>
                    <h3 className="podcast-title">{ep.title}</h3>
                    <p className="podcast-desc">{ep.description}</p>
                    <a
                      href={`https://www.youtube.com/watch?v=${ep.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="podcast-link"
                    >
                      Watch Episode →
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="podcast-all-link">
              <a href="https://www.leapacademy.com/podcast" target="_blank" rel="noopener noreferrer">
                Browse all Leap Academy episodes →
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider label="Success Stories" />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8: TESTIMONIAL VIDEOS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="testimonials-section" data-section="testimonials">
        <div className="container">
          <div className={`testimonials-inner ${isVisible('testimonials') ? 'visible' : ''}`}>
            <h2 className="section-title" style={{ color: 'var(--cream)' }}>
              Professionals Like {firstName}<br />
              <em>Have Already Leaped</em>
            </h2>
            <p className="section-subtitle" style={{ color: 'rgba(250,248,243,0.6)' }}>
              These are real stories from {tierData.label}s who took the same first step.
            </p>

            <div className="video-testimonials-grid">
              {[1, 2, 3].map((n) => (
                <div key={n} className="video-testimonial-card">
                  <div className="video-upload-slot">
                    {/* 
                      TO ADD VIDEO: Replace this placeholder with an <iframe> or <video> tag.
                      Example (YouTube):
                      <iframe
                        src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                        title="Testimonial {n}"
                        frameBorder="0"
                        allowFullScreen
                        style={{ width: '100%', height: '220px', borderRadius: '8px' }}
                      />
                    */}
                    <div className="video-placeholder">
                      <div className="video-play-icon">▶</div>
                      <div className="video-upload-label">
                        <strong>Testimonial Video {n}</strong>
                        <span>Upload your video here</span>
                        <code>Replace this block with your {'<iframe>'} or {'<video>'} embed</code>
                      </div>
                    </div>
                  </div>
                  <div className="video-testimonial-meta">
                    <span className="stars">⭐⭐⭐⭐⭐</span>
                    <p className="video-testimonial-caption">
                      {n === 1 && `"Leap completely changed how I show up as a leader. I got promoted within 4 months."`}
                      {n === 2 && `"I negotiated a $120K salary increase and landed my dream role at a top-tier firm."`}
                      {n === 3 && `"From invisible to industry leader in under a year. Ilana's programme is extraordinary."`}
                    </p>
                    <span className="video-testimonial-role">
                      {n === 1 && 'VP, Global Technology Company'}
                      {n === 2 && 'Director, Investment Banking'}
                      {n === 3 && 'Founder & Board Advisor'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 9: SOCIAL PROOF BAR
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="proof-section" data-section="proof">
        <div className="container-wide">
          <div className={`proof-inner ${isVisible('proof') ? 'visible' : ''}`}>
            <div className="proof-stats">
              {[
                { number: '$80M+', label: 'Generated by Leap clients through salary increases, VC raised & M&A' },
                { number: '120K+', label: 'Professionals coached across 5 continents' },
                { number: '#1', label: 'Ranked coaching program for executives & career leapers globally' },
                { number: '2023', label: 'Startup of the Year · Best Coaching Program 2022' },
              ].map((s, i) => (
                <div key={i} className="proof-stat">
                  <span className="proof-number">{s.number}</span>
                  <span className="proof-label">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="proof-logos-row">
              {['Forbes', 'Yahoo Finance', 'NBC', 'Fox', 'MarketWatch', 'ABC', 'Nasdaq'].map(l => (
                <span key={l} className="proof-logo-item">{l}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SectionDivider label="Your Next Step" />

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 10: FINAL CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="final-cta-section" data-section="finalcta">
        <div className="container">
          <div className={`final-cta-block ${isVisible('finalcta') ? 'visible' : ''}`} style={{ '--tier-color': tierData.color }}>
            <div className="final-cta-score-badge">
              <ScoreRing score={overallScore} size={90} strokeWidth={7} color={tierData.color} delay={200} />
              <div className="final-badge-center" style={{ color: tierData.color }}>
                {overallScore}
              </div>
            </div>

            <h2 className="final-cta-headline">
              {firstName}, your {tierData.label} score<br />
              tells us you're <em>ready</em> to leap.
            </h2>

            <p className="final-cta-desc">
              Your Executive Edge Score reveals significant untapped potential. The strategy call is how we turn your score into a concrete, step-by-step plan — built specifically for your situation, your industry, and your goals.
            </p>

            <div className="final-cta-what-you-get">
              <h4>In your 45-minute strategy call, you'll get:</h4>
              <div className="final-bullets-grid">
                {[
                  { icon: '🎯', text: 'A full audit of your Executive Edge Score and what it means for your next move' },
                  { icon: '📋', text: `Your personalised ${tierData.label} Blueprint — the exact steps for your next 90 days` },
                  { icon: '💼', text: 'The hidden market strategies Leap clients use to access $300K–$1M+ roles' },
                  { icon: '🌐', text: 'Access to Leap\'s 100K+ professional network and how to leverage it immediately' },
                  { icon: '📈', text: 'Salary and income negotiation tactics used by clients to achieve $50K–$150K+ jumps' },
                  { icon: '🔥', text: `An honest answer on whether Leap Academy is the right next step for ${firstName}` },
                ].map((b, i) => (
                  <div key={i} className="final-bullet">
                    <span className="final-bullet-icon">{b.icon}</span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <a href={BOOK_CALL_URL} target="_blank" rel="noopener noreferrer" className="cta-button-final">
              Book My Free Strategy Call
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </a>

            <p className="final-cta-note">
              Free · 45 minutes · Spots limited · Used by professionals at Google, JPMorgan, McKinsey & more
            </p>

            <div className="final-ilana-credit">
              <span>Built by</span>
              <strong>Ilana Golan</strong>
              <span>· F-16 Commander → Tech Executive → Leap Academy Founder</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="results-footer">
        <div className="container">
          <p>© 2025 Leap Academy · <a href="https://www.leapacademy.com" target="_blank" rel="noopener noreferrer">leapacademy.com</a></p>
        </div>
      </footer>
    </div>
  );
}
