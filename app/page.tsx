"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { questions, archetypes, speakers } from "@/data/gameData";

type ScreenState = "LANDING" | "QUIZ" | "EMAIL" | "RESULT" | "CTA";

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>("LANDING");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userArchetypes, setUserArchetypes] = useState<Record<number, string[]>>({});
  const [topSpeaker, setTopSpeaker] = useState<typeof speakers[0] | null>(null);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});

  // Idle Timer Logic
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetGame = useCallback(() => {
    setScreen("LANDING");
    setCurrentQuestionIndex(0);
    setUserArchetypes({});
    setTopSpeaker(null);
    setUserAnswers({});
  }, []);

  const resetTimer = useCallback(() => {
    if (resetTimerRef.current) {
      clearTimeout(resetTimerRef.current);
    }
    resetTimerRef.current = setTimeout(() => {
      resetGame();
    }, 30000);
  }, [resetGame]);

  useEffect(() => {
    resetTimer();
    const handleInteraction = () => resetTimer();
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [resetTimer]);

  const handleStart = () => {
    setUserArchetypes({});
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setScreen("QUIZ");
  };

  const handleAnswer = (archetypeIds: string[], text: string) => {
    const newArchetypes = { ...userArchetypes, [currentQuestionIndex]: archetypeIds };
    setUserArchetypes(newArchetypes);
    setUserAnswers(prev => ({ ...prev, [currentQuestionIndex]: text }));

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(curr => curr + 1);
    } else {
      calculateResult(newArchetypes);
    }
  };

  const calculateResult = (finalArchetypes: Record<number, string[]>) => {
    const finalScores: Record<string, number> = {};
    Object.values(finalArchetypes).forEach(ids => {
      ids.forEach(id => {
        finalScores[id] = (finalScores[id] || 0) + 1;
      });
    });

    let maxScore = -1;
    let topArchetypeIds: string[] = [];

    Object.entries(finalScores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topArchetypeIds = [id];
      } else if (score === maxScore) {
        topArchetypeIds.push(id);
      }
    });

    const winningArchetypeId = topArchetypeIds[Math.floor(Math.random() * topArchetypeIds.length)];
    const matchedSpeakers = speakers.filter(s => s.archetype_id === winningArchetypeId);
    const winner = matchedSpeakers.length > 0 ? matchedSpeakers[0] : speakers[0];

    setTopSpeaker(winner);
    setScreen("EMAIL");
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email.endsWith('@hyderabad.bits-pilani.ac.in')) {
      setIsSubmitting(true);
      try {
        const payload = {
          email: email,
          answers: userAnswers
        };
        
        await fetch(process.env.NEXT_PUBLIC_SHEET_ENDPOINT as string, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(payload),
          mode: "no-cors",
        });
        
        setScreen("RESULT");
      } catch (error) {
        console.error("Failed to submit", error);
        setScreen("RESULT");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please enter a valid @hyderabad.bits-pilani.ac.in email address.");
    }
  };

  const renderEmail = () => (
    <div className="screen-container fade-in">
      <div className="section-number">/MAIL</div>
      <div style={{ position: 'relative', width: '100%', marginTop: '3rem' }}>
        <h1 className="massive-text" style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '1rem' }}>
          ALMOST<br />
          <span style={{ color: 'var(--tedx-red)' }}>THERE</span>
        </h1>

        <div className="brutalist-border email-layout">
          <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6', marginBottom: '2rem' }}>
            Enter your email to unlock your TEDx speaker archetype and get updates.
          </p>

          <form 
            onSubmit={handleEmailSubmit}
            style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px', width: '100%' }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your @hyderabad.bits-pilani.ac.in email"
              required
              style={{
                padding: '1rem',
                fontSize: '1rem',
                background: 'transparent',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                width: '100%'
              }}
            />
            <button type="submit" className="brutalist-btn" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "See Result"}
              {!isSubmitting && <span className="arrow">&rarr;</span>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );

  const renderLanding = () => (
    <div className="screen-container fade-in">
      <div className="section-number">/01</div>
      <div style={{ position: 'relative', width: '100%', marginTop: '3rem' }}>
        <h1 className="massive-text">
          WHICH<br />
          TEDx<br />
          <span style={{ color: 'var(--tedx-red)' }}>SPEAKER</span><br />
          ARE YOU?
        </h1>

        <div className="brutalist-border landing-layout">
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span className="quote-icon">"</span>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6', marginTop: '1rem' }}>
              Discover your <span className="font-serif" style={{ color: 'var(--text-primary)' }}>ideation archetype</span>. At TEDxBITSHyderabad, every idea is a unique building block.
            </p>
          </div>

          <button className="brutalist-btn" onClick={handleStart}>
            Start Quiz
            <span className="arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const question = questions[currentQuestionIndex];
    return (
      <div className="screen-container fade-in">
        <div className="section-number">/Q</div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '3rem', width: '100%' }}>
          {questions.map((_, idx) => (
            <div
              key={idx}
              style={{
                height: '4px',
                flex: 1,
                backgroundColor: idx <= currentQuestionIndex ? 'var(--tedx-red)' : 'var(--border-color)',
              }}
            />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', width: '100%' }}>
          <div style={{ color: 'var(--tedx-red)', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ( {currentQuestionIndex + 1} / {questions.length} )
          </div>
          {currentQuestionIndex > 0 && (
            <button 
              onClick={() => setCurrentQuestionIndex(curr => curr - 1)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-muted)',
                textDecoration: 'underline',
                cursor: 'pointer',
                fontFamily: 'var(--font-inter)',
                fontSize: '0.9rem',
                textTransform: 'uppercase'
              }}
            >
              &larr; Back
            </button>
          )}
        </div>

        <h2 className="font-display quiz-question">
          {question.text}
        </h2>

        <div className="quiz-grid">
          {question.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(option.archetype_ids, option.text)}
              className="quiz-option-btn"
              style={{ textAlign: 'left' }}
            >
              {option.text}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderResult = () => {
    if (!topSpeaker) return null;
    const archetype = archetypes[topSpeaker.archetype_id];

    return (
      <div className="screen-container fade-in">
        <div className="section-number">/02</div>
        <div className="spotlight-sweep"></div>

        <h1 className="massive-text" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginBottom: '2rem', color: 'var(--tedx-red)' }}>
          {topSpeaker.name}
        </h1>

        <div className="brutalist-border result-grid">
          {/* Strict Rectangular Photo */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100%',
              aspectRatio: '3/4',
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <img
                src={topSpeaker.photo_url}
                alt={topSpeaker.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3)' }}
              />
            </div>
          </div>

          {/* Structured Text block */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
              <div style={{ color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0, marginTop: '2px' }}>
                1
              </div>
              <div>
                <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Archetype: {archetype.label}</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                  Leading brands and ideas require strong foundations. Your archetype indicates you build from the ground up with precision.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0, marginTop: '2px' }}>
                2
              </div>
              <div>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                  {topSpeaker.result_blurb}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                  <strong>About {topSpeaker.name}:</strong> {topSpeaker.description}
                </p>
                <button
                  className="brutalist-btn"
                  onClick={() => setScreen("CTA")}
                >
                  What's Next?
                  <span className="arrow">&rarr;</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCTA = () => (
    <div className="screen-container fade-in">
      <div className="section-number">/03</div>

      <h1 className="massive-text" style={{ marginBottom: '2rem' }}>
        IDEAS<br />
        WORTH<br />
        <span style={{ color: 'var(--tedx-red)' }}>SPREADING</span>
      </h1>

      <div className="brutalist-border cta-layout">
        <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6' }}>
          Join us at the upcoming event to see these ideas live. We are also recruiting passionate individuals to help build the next edition.
        </p>

        <div className="cta-buttons">
          <button
            onClick={resetGame}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              textDecoration: 'underline',
              cursor: 'pointer',
              fontSize: '1rem',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}
          >
            Restart
          </button>

          <a href="https://instagram.com/tedxbitshyderabad" target="_blank" rel="noopener noreferrer" className="brutalist-btn" style={{ textDecoration: 'none' }}>
            Our Instagram
            <span className="arrow">&rarr;</span>
          </a>

          <a href="https://tedxbitshyderabad.org" target="_blank" rel="noopener noreferrer" className="brutalist-btn" style={{ textDecoration: 'none' }}>
            Visit our Site
            <span className="arrow">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screen === "LANDING" && renderLanding()}
      {screen === "QUIZ" && renderQuiz()}
      {screen === "EMAIL" && renderEmail()}
      {screen === "RESULT" && renderResult()}
      {screen === "CTA" && renderCTA()}
    </>
  );
}
