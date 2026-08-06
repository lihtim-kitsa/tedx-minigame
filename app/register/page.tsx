"use client";

import React, { useState } from 'react';

const QUESTIONS = [
  "You just found out a really elusive, fascinating person is visiting the city. Are you the type of friend who will immediately figure out their contact info and draft the perfect cold email to invite them to campus?",
  "Your friend has a chaotic but brilliant theory about how listening to psychedelic pop music improves focus. Are you the one who sits down with them to help structure that rambling thought into a compelling, 15-minute story?",
  "You’re filming a short video in the auditorium, and the lighting is completely washed out. Are you the person who immediately jumps in to manually adjust the camera’s exposure triangle, or do you try to fix the sound feedback first?",
  "If you were put in charge of designing an oversized graphic tee for a college fest, would you be the person obsessing over the exact typography, color palette, and visual consistency before letting anyone print it?",
  "It's the morning of a major online competition on Codeforces, and the main network suddenly drops. Are you the type who immediately starts troubleshooting the connection and finding a technical workaround while everyone else panics?",
  "When you want people to show up to an event, what is your secret to writing an Instagram caption or a group chat message that actually stops people from scrolling past it?",
  "You’re organizing a group trip to the city, and the main transportation is suddenly delayed by an hour. Are you the person who naturally steps up to manage the annoyed crowd and reorganize the on-ground logistics?"
];

type ScreenState = 'LANDING' | 'QUIZ' | 'EMAIL' | 'SUCCESS';

export default function RegisterPage() {
  const [screen, setScreen] = useState<ScreenState>('LANDING');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState(false);

  const handleStart = () => {
    setScreen('QUIZ');
  };

  const handleAnswer = (option: string) => {
    setAnswers(prev => ({...prev, [currentQuestionIndex]: option}));
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(curr => curr + 1);
    } else {
      setScreen('EMAIL');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (!email || !/bits-pilani\.ac\.in$/i.test(email.trim())) {
      setErrorMsg('Please enter a valid BITS Pilani email address.');
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setErrorMsg('');

    try {
      const endpoint = process.env.NEXT_PUBLIC_SHEET_ENDPOINT;
      if (!endpoint) {
        throw new Error("Endpoint not configured");
      }

      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim(), answers }),
      });

      // With no-cors, we don't get a readable response, so assume success if no network error
      setStatus('idle');
      setScreen('SUCCESS');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  const renderLanding = () => (
    <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px', width: '100%', padding: '4rem' }}>
      <div className="section-number">/04</div>
      <div style={{ position: 'relative', width: '100%', marginTop: '3rem' }}>
        <h1 className="massive-text">
          SAVE<br />
          YOUR<br />
          <span style={{ color: 'var(--tedx-red)' }}>SPOT</span>
        </h1>

        <div className="brutalist-border" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <span className="quote-icon">"</span>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6', marginTop: '1rem' }}>
              Drop your BITS email and we'll keep you posted on the next TEDxBITSHyderabad drop.
            </p>
          </div>
          
          <button className="brutalist-btn" onClick={handleStart}>
            Start Registration
            <span className="arrow">&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );

  const renderQuiz = () => {
    const question = QUESTIONS[currentQuestionIndex];
    const options = ['Yes', 'Maybe', 'No'];

    return (
      <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px', padding: '4rem' }}>
        <div className="section-number">/Q</div>
        
        <div style={{ display: 'flex', gap: '8px', marginBottom: '3rem', width: '100%' }}>
          {QUESTIONS.map((_, idx) => (
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
          ( {currentQuestionIndex + 1} / {QUESTIONS.length} )
        </div>
        
        <h2 className="font-display" style={{ fontSize: '3.5rem', marginBottom: '2rem', lineHeight: '1.1', maxWidth: '900px' }}>
          {question}
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(3, 1fr)', 
          gap: '1px',
          backgroundColor: 'var(--border-color)',
          border: '1px solid var(--border-color)',
          width: '100%'
        }}>
          {options.map((option, idx) => (
            <button 
              key={idx}
              onClick={() => handleAnswer(option)}
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
                textAlign: 'center',
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
              {option}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderEmail = () => (
    <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px', width: '100%', padding: '4rem' }}>
      <div className="section-number">/EM</div>
      <div style={{ position: 'relative', width: '100%', marginTop: '3rem' }}>
        <h1 className="massive-text" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}>
          ALMOST<br />
          <span style={{ color: 'var(--tedx-red)' }}>THERE</span>
        </h1>

        <div className="brutalist-border" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '2rem', gap: '4rem' }}>
          <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'flex-start' }}>
            <span className="quote-icon">"</span>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '400px', lineHeight: '1.6', marginTop: '1rem' }}>
              We've saved your answers. Now drop your BITS email to finish up and we'll keep you posted.
            </p>
          </div>
          
          <div style={{ flex: '1 1 400px' }}>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                    setErrorMsg('');
                  }}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  style={{
                    backgroundColor: 'var(--bg-card)',
                    border: `1px solid ${focused ? 'var(--tedx-red)' : 'var(--border-color)'}`,
                    color: 'var(--text-primary)',
                    borderRadius: 0,
                    padding: '1.5rem 3rem',
                    fontSize: '1.25rem',
                    fontFamily: 'var(--font-inter)',
                    outline: 'none',
                    transition: 'border-color 0.2s ease',
                    width: '100%'
                  }}
                  placeholder="f202XXXX@hyderabad.bits-pilani.ac.in"
                  disabled={status === 'submitting'}
                />
                {status === 'error' && errorMsg && (
                  <span style={{ color: 'var(--tedx-red)', fontSize: '0.9rem', fontFamily: 'var(--font-inter)' }}>
                    {errorMsg}
                  </span>
                )}
              </div>
              <button 
                type="submit" 
                className="brutalist-btn" 
                style={{ alignSelf: 'flex-start' }}
                disabled={status === 'submitting'}
              >
                {status === 'submitting' ? 'Sending...' : 'Count Me In'}
                <span className="arrow">→</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="container fade-in" style={{ justifyContent: 'center', alignItems: 'flex-start', maxWidth: '1200px', width: '100%', padding: '4rem' }}>
      <div className="section-number">/02</div>
      <div className="spotlight-sweep"></div>
      
      <h1 className="massive-text" style={{ fontSize: 'clamp(4rem, 8vw, 8rem)', marginBottom: '2rem', color: 'var(--tedx-red)' }}>
        YOU'RE IN
      </h1>

      <div className="brutalist-border" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', width: '100%', marginTop: '0' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '2rem' }}>
            <div style={{ color: 'var(--text-muted)', border: '1px solid var(--border-color)', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', flexShrink: 0, marginTop: '2px' }}>
              1
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '2rem', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>Registration Complete</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                We've recorded your answers and your spot is saved. Check your inbox around the next event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {screen === 'LANDING' && renderLanding()}
      {screen === 'QUIZ' && renderQuiz()}
      {screen === 'EMAIL' && renderEmail()}
      {screen === 'SUCCESS' && renderSuccess()}
    </>
  );
}
