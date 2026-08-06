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
    // 30 seconds idle reset back to landing
    resetTimerRef.current = setTimeout(() => {
      resetGame();
    }, 30000);
  }, [resetGame]);

  useEffect(() => {
    // Start timer on mount
    resetTimer();

    // Attach listeners to reset timer on any interaction
    const handleInteraction = () => resetTimer();
    window.addEventListener("click", handleInteraction);
    window.addEventListener("touchstart", handleInteraction);

    return () => {
      if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
      window.removeEventListener("click", handleInteraction);
      window.removeEventListener("touchstart", handleInteraction);
    };
  }, [resetTimer]);

  // Handlers
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

    // Find the highest score
    Object.entries(finalScores).forEach(([id, score]) => {
      if (score > maxScore) {
        maxScore = score;
        topArchetypeIds = [id];
      } else if (score === maxScore) {
        topArchetypeIds.push(id);
      }
    });

    // Tie-breaker: Pick a random one from the tied archetypes
    const winningArchetypeId = topArchetypeIds[Math.floor(Math.random() * topArchetypeIds.length)];
    
    // Find speaker with this archetype
    const matchedSpeakers = speakers.filter(s => s.archetype_id === winningArchetypeId);
    // If there are multiple, just pick the first for now
    const winner = matchedSpeakers.length > 0 ? matchedSpeakers[0] : speakers[0];

    setTopSpeaker(winner);
    setScreen("RESULT");
    
    // Auto advance to CTA after reading result (e.g. 10s)
    setTimeout(() => {
      // Only transition if still on result screen
      setScreen(prev => prev === "RESULT" ? "CTA" : prev);
    }, 10000);
  };

  // Renderers
  const renderLanding = () => (
    <div className="container snap-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h1 className="font-pixel" style={{ fontSize: '3.5rem', marginBottom: '1.5rem', lineHeight: '1.2' }}>
        WHICH <span style={{ color: 'var(--tedx-red)' }}>TEDxBITSHYD</span> SPEAKER ARE YOU?
      </h1>
      <p className="font-term" style={{ fontSize: '1.5rem', color: 'var(--text-muted)', marginBottom: '4rem', letterSpacing: '0.05em' }}>
        [ INITIALIZING ARCHETYPE SCANNER... ]
      </p>
      <button className="btn-retro font-pixel" style={{ fontSize: '1.5rem' }} onClick={handleStart}>
        {`{ START_QUIZ }`}
      </button>
    </div>
  );

  const renderQuiz = () => {
    const question = questions[currentQuestionIndex];
    return (
      <div className="container snap-in" style={{ justifyContent: 'center' }}>
        {/* Progress Indicator - Blocky */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '2.5rem', justifyContent: 'center' }}>
          {questions.map((_, idx) => (
            <div 
              key={idx} 
              style={{ 
                height: '12px', 
                flex: 1, 
                backgroundColor: idx <= currentQuestionIndex ? 'var(--tedx-red)' : 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                // No smooth transition for retro feel
              }} 
            />
          ))}
        </div>
        
        <div className="font-term" style={{ color: 'var(--text-muted)', marginBottom: '2rem', textAlign: 'center', fontSize: '1.2rem', letterSpacing: '0.1em' }}>
          &gt; EXECUTING QUERY {currentQuestionIndex + 1}/{questions.length} _
        </div>
        
        <h2 className="font-pixel" style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '4rem', lineHeight: '1.4' }}>
          {question.text}
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: '1.5rem',
          maxWidth: '750px',
          margin: '0 auto',
          width: '100%'
        }}>
          {question.options.map((option, idx) => (
            <button 
              key={idx}
              onClick={() => handleAnswer(option.archetype_ids)}
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '2px solid var(--border-color)',
                borderRadius: '0',
                padding: '2.5rem 1.5rem',
                color: 'var(--text-primary)',
                fontSize: '1.4rem',
                cursor: 'pointer',
                transition: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                textAlign: 'center',
                minHeight: '140px',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = 'var(--tedx-red)';
                e.currentTarget.style.backgroundColor = 'var(--tedx-red)';
                // Find the span child to change its color to black or white for contrast
                const span = e.currentTarget.querySelector('span');
                if (span) span.style.color = '#fff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.backgroundColor = 'var(--bg-card)';
                const span = e.currentTarget.querySelector('span');
                if (span) span.style.color = 'var(--text-primary)';
              }}
              onMouseDown={(e) => {
                e.currentTarget.style.transform = 'translate(2px, 2px)';
                e.currentTarget.style.boxShadow = 'none';
              }}
              onMouseUp={(e) => {
                e.currentTarget.style.transform = 'translate(0px, 0px)';
              }}
            >
              {/* Fake brackets for retro hover vibe */}
              <span className="font-term" style={{ pointerEvents: 'none' }}>
                [ {option.text} ]
              </span>
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
      <div className="container" style={{ justifyContent: 'center', alignItems: 'center' }}>
        <div className="glitch-reveal"></div>
        
        <div className="snap-in" style={{ 
          backgroundColor: 'var(--bg-card)',
          border: '2px solid var(--border-color)',
          padding: '3rem 2rem',
          width: '100%',
          maxWidth: '550px',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Logo Mark Top */}
          <div className="font-term" style={{ color: 'var(--tedx-red)', fontSize: '1.2rem', marginBottom: '2rem', letterSpacing: '0.1em' }}>
            &gt; MATCH_FOUND
          </div>

          <div style={{ 
            width: '220px', 
            height: '220px', 
            margin: '0 auto 2.5rem auto',
            overflow: 'hidden',
            border: '4px solid var(--tedx-red)',
            // No border-radius for pixel art feel!
          }}>
            <img 
              src={topSpeaker.photo_url} 
              alt={topSpeaker.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'contrast(1.2) grayscale(0.2)' }}
            />
          </div>

          <div className="font-pixel" style={{ color: 'var(--tedx-red)', fontSize: '1rem', marginBottom: '1rem', textTransform: 'uppercase' }}>
            ARCHETYPE: {archetype.label}
          </div>
          <h2 className="font-pixel" style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
            {topSpeaker.name}
          </h2>
          <p className="font-term" style={{ color: 'var(--text-primary)', fontSize: '1.3rem', lineHeight: '1.6', marginBottom: '1rem' }}>
            {topSpeaker.result_blurb}
          </p>
        </div>
      </div>
    );
  };

  const renderCTA = () => (
    <div className="container snap-in" style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <h2 className="font-pixel" style={{ fontSize: '3rem', marginBottom: '2rem', color: 'var(--tedx-red)' }}>
        JOIN_THE_NETWORK
      </h2>
      <p className="font-term" style={{ fontSize: '1.6rem', color: 'var(--text-muted)', marginBottom: '4rem', maxWidth: '600px', lineHeight: '1.6' }}>
        &gt; We are recruiting node operators (humans) for the next cycle. Help us run the grid.
      </p>
      
      <div style={{ display: 'flex', gap: '2rem', flexDirection: 'column', alignItems: 'center' }}>
        <a href="#" className="btn-retro font-pixel" style={{ textDecoration: 'none', fontSize: '1.5rem' }}>
          {`< APPLY_NOW >`}
        </a>
        <button 
          onClick={resetGame} 
          style={{ 
            background: 'none', 
            border: 'none', 
            color: 'var(--text-muted)', 
            marginTop: '1rem', 
            cursor: 'pointer',
            fontSize: '1.2rem'
          }}
          className="font-term"
          onMouseOver={(e) => e.currentTarget.style.color = 'var(--tedx-red)'}
          onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
        >
          [ RESET_SYSTEM ]
        </button>
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
