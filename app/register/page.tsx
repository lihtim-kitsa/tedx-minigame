"use client";

import React, { useState } from 'react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [focused, setFocused] = useState(false);

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
        body: JSON.stringify({ email: email.trim() }),
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
    <main className="container fade-in" style={{ maxWidth: '1200px', padding: '4rem' }}>
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
        <div style={{ flex: '1 1 300px', display: 'flex', alignItems: 'flex-start' }}>
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
        <div style={{ flex: '1 1 400px' }}>
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
