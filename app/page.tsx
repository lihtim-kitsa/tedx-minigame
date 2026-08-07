"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { questions, archetypes, speakers } from "@/data/gameData";

type ScreenState = "LANDING" | "QUIZ" | "RESULT" | "CTA";

export default function Home() {
  const [screen, setScreen] = useState<ScreenState>("LANDING");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [topSpeaker, setTopSpeaker] = useState<typeof speakers[0] | null>(null);
  
  // Idle Timer Logic
  const resetTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetGame = useCallback(() => {
    setScreen("LANDING");
    setCurrentQuestionIndex(0);
    setScores({});
    setTopSpeaker(null);
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
    setScores({});
    setCurrentQuestionIndex(0);
    setScreen("QUIZ");
  };

  const handleAnswer = (archetypeIds: string[]) => {
    const newScores = { ...scores };
    archetypeIds.forEach(id => {
      newScores[id] = (newScores[id] || 0) + 1;
    });
    setScores(newScores);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(curr => curr + 1);
    } else {
      calculateResult(newScores);
    }
  };

  const calculateResult = (finalScores: Record<string, number>) => {
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
    setScreen("RESULT");
  };

  const renderLanding = () => (
    <div className="screen-container fade-in">
      <div className="section-number">/01</div>
      <div style={{ position: 'relative', width: '100%', marginTop: '3rem' }}>
        <h1 className="massive-text">
          WHICH<br/>
          TEDx<br/>
          <span style={{ color: 'var(--tedx-red)' }}>SPEAKER</span><br/>
          ARE YOU?
        </h1>
        
        <div className="brutalist-border" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2rem' }}>
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
        
        <div style={{ color: 'var(--tedx-red)', marginBottom: '1rem', fontSize: '1rem', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ( {currentQuestionIndex + 1} / {questions.length} )
        </div>
        
        <h2 className="font-display" style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: '1.1', maxWidth: '900px' }}>
          {question.text}
        </h2>
        
        <div className="quiz-grid">
          {question.options.map((option, idx) => (
            <button 
              key={idx}
              onClick={() => handleAnswer(option.archetype_ids)}
              style={{
                backgroundColor: 'var(--bg-main)',
                border: 'none',
                padding: '3rem 2rem',
                color: 'var(--text-primary)',
                fontSize: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'left',
                minHeight: '140px',
                fontFamily: 'var(--font-inter)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--text-primary)';
                e.currentTarget.style.color = 'var(--bg-main)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--bg-main)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }}
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
                <p style={{ color: 'var(--text-primary)', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '2rem' }}>
                  {topSpeaker.result_blurb}
                </p>
                <button 
                  className="brutalist-btn" 
                  onClick={() => setScreen("CTA")}
                  style={{ padding: '1rem 2rem', fontSize: '1.2rem' }}
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
        IDEAS<br/>
        WORTH<br/>
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
          
          <a href="https://instagram.com/tedxbitshyderabad" target="_blank" rel="noopener noreferrer" className="brutalist-btn" style={{ padding: '1rem 2rem', fontSize: '1.2rem', textDecoration: 'none' }}>
            Our Instagram
            <span className="arrow">&rarr;</span>
          </a>
          
          <a href="https://tedxbitshyderabad.org" target="_blank" rel="noopener noreferrer" className="brutalist-btn" style={{ padding: '1rem 2rem', fontSize: '1.2rem', textDecoration: 'none' }}>
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
      {screen === "RESULT" && renderResult()}
      {screen === "CTA" && renderCTA()}
    </>
  );
}
