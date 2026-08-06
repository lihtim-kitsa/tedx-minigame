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

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Client-side validation
    if (Object.keys(answers).length < QUESTIONS.length) {
      setErrorMsg('Please answer all questions before submitting.');
      setStatus('error');
      return;
    }

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
      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMsg('Something went wrong. Please try again.');
      setStatus('error');
    }
  };

  return (
    <main className="container fade-in" style={{ maxWidth: '1200px', padding: '4rem', maxHeight: 'none', height: 'auto' }}>
      <div className="section-number">/04</div>
      
      <h1 className="massive-text">
        SAVE<br />
        YOUR<br />
        <span style={{ color: 'var(--tedx-red)' }}>SPOT</span>
      </h1>

      <div className="brutalist-border" style={{ 
        display: 'flex', 
        flexWrap: 'wrap',
        gap: '4rem', 
        alignItems: 'flex-start',
        marginTop: '2rem',
        paddingTop: '3rem'
      }}>
        {/* Left Side */}
        <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'flex-start', position: 'sticky', top: '4rem' }}>
          <span className="quote-icon">"</span>
          <p style={{ 
            color: 'var(--text-muted)', 
            fontSize: '1.25rem', 
            lineHeight: 1.5, 
            maxWidth: '400px',
            marginTop: '0.5rem',
            fontFamily: 'var(--font-inter)'
          }}>
            Drop your BITS email and we'll keep you posted on the next TEDxBITSHyderabad drop.
          </p>
        </div>

        {/* Right Side */}
        <div style={{ flex: '1 1 400px', paddingBottom: '4rem' }}>
          {status === 'success' ? (
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
              <div style={{ 
                color: 'var(--tedx-red)', 
                fontSize: '3rem', 
                fontFamily: 'var(--font-bebas-neue)', 
                lineHeight: 1 
              }}>✓</div>
              <p style={{ 
                fontSize: '1.5rem', 
                lineHeight: 1.4, 
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-inter)'
              }}>
                You're in! Check your inbox around the next event.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
                {QUESTIONS.map((question, idx) => (
                  <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <p style={{ 
                      fontSize: '1.25rem', 
                      lineHeight: 1.4, 
                      color: 'var(--text-primary)', 
                      fontFamily: 'var(--font-inter)' 
                    }}>
                      <span style={{ 
                        color: 'var(--tedx-red)', 
                        fontFamily: 'var(--font-bebas-neue)', 
                        fontSize: '1.5rem', 
                        marginRight: '0.75rem' 
                      }}>
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      {question}
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      {['Yes', 'Maybe', 'No'].map(opt => {
                        const isSelected = answers[idx] === opt;
                        return (
                          <label key={opt} style={{
                            border: `1px solid ${isSelected ? 'var(--tedx-red)' : 'var(--border-color)'}`,
                            padding: '0.75rem 2rem',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? 'var(--tedx-red)' : 'var(--bg-card)',
                            color: isSelected ? '#fff' : 'var(--text-primary)',
                            transition: 'all 0.2s ease',
                            fontFamily: 'var(--font-inter)',
                            fontSize: '1.1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.05em'
                          }}>
                            <input 
                               type="radio" 
                               name={`q-${idx}`} 
                               value={opt} 
                               checked={isSelected}
                               onChange={() => {
                                 setAnswers(prev => ({...prev, [idx]: opt}));
                                 if (status === 'error') setStatus('idle');
                                 setErrorMsg('');
                               }}
                               style={{ display: 'none' }}
                            />
                            {opt}
                          </label>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
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
                    padding: '1.5rem 3rem', // matches .brutalist-btn scale
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
          )}
        </div>
      </div>
    </main>
  );
}
