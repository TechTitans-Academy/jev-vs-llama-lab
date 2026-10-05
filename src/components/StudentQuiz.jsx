import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, Award, RotateCcw, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS } from '../data/quiz';

export default function StudentQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUIZ_QUESTIONS[currentIdx];

  const handleSelectOption = (idx) => {
    if (showExplanation) return; // prevent changing after submission
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null) return;
    
    const isCorrect = selectedOpt === currentQ.correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setScore(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Quiz Container Header */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <HelpCircle color="#f59e0b" /> Student Knowledge Verification Quiz
            </h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '4px' }}>
              Test your understanding of JEV state decision engines vs LLaMA generative transformers.
            </p>
          </div>
          
          <div style={{ background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '8px 16px', borderRadius: '20px', fontWeight: 700, color: '#fbbf24', fontSize: '0.9rem' }}>
            Score: {score} / {QUIZ_QUESTIONS.length}
          </div>
        </div>
      </div>

      {/* Quiz Body */}
      {!quizFinished ? (
        <div className="glass-panel" style={{ padding: '28px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#6366f1', marginBottom: '8px' }}>
            QUESTION {currentIdx + 1} OF {QUIZ_QUESTIONS.length}
          </div>

          <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', marginBottom: '20px', lineHeight: '1.5' }}>
            {currentQ.question}
          </h3>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {currentQ.options.map((opt, idx) => {
              let bg = 'rgba(255,255,255,0.03)';
              let border = '1px solid rgba(255,255,255,0.08)';
              
              if (showExplanation) {
                if (idx === currentQ.correctAnswer) {
                  bg = 'rgba(16, 185, 129, 0.2)';
                  border = '1px solid #10b981';
                } else if (idx === selectedOpt) {
                  bg = 'rgba(239, 68, 68, 0.2)';
                  border = '1px solid #ef4444';
                }
              } else if (selectedOpt === idx) {
                bg = 'rgba(99, 102, 241, 0.2)';
                border = '1px solid #6366f1';
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  style={{
                    background: bg,
                    border: border,
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'left',
                    color: 'white',
                    fontSize: '0.95rem',
                    cursor: showExplanation ? 'default' : 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{opt}</span>
                  {showExplanation && idx === currentQ.correctAnswer && <CheckCircle size={20} color="#34d399" />}
                  {showExplanation && idx === selectedOpt && idx !== currentQ.correctAnswer && <XCircle size={20} color="#f87171" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Actions & Explanation */}
          {showExplanation ? (
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ fontWeight: 700, color: '#38bdf8', marginBottom: '6px', fontSize: '0.85rem' }}>
                💡 EXPLANATION:
              </div>
              <p style={{ color: '#e2e8f0', fontSize: '0.9rem', lineHeight: '1.6', marginBottom: '16px' }}>
                {currentQ.explanation}
              </p>

              <button className="btn-primary" onClick={handleNextQuestion}>
                {currentIdx + 1 === QUIZ_QUESTIONS.length ? 'View Final Results' : 'Next Question'} <ArrowRight size={16} />
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={handleSubmitAnswer} disabled={selectedOpt === null}>
              Check Answer
            </button>
          )}

        </div>
      ) : (
        /* Quiz Finished View */
        <div className="glass-panel" style={{ padding: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Award size={64} color="#f59e0b" />
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white' }}>Quiz Completed!</h2>
          <p style={{ fontSize: '1.2rem', color: '#34d399', fontWeight: 700 }}>
            You scored {score} out of {QUIZ_QUESTIONS.length} ({Math.round((score / QUIZ_QUESTIONS.length) * 100)}%)
          </p>

          <p style={{ color: 'var(--text-muted)', maxWidth: '500px', fontSize: '0.95rem' }}>
            {score >= 4 
              ? "🎉 Outstanding! You have mastered the architectural distinctions between System 1 non-autoregressive decision classifiers (JEV) and System 2 generative transformers (LLaMA)."
              : "Good effort! Review the Interactive Playground and Architecture tabs to solidify your understanding of JEV vs LLaMA."}
          </p>

          <button className="btn-primary" onClick={handleRestartQuiz} style={{ marginTop: '12px' }}>
            <RotateCcw size={16} /> Retake Quiz
          </button>
        </div>
      )}

    </div>
  );
}
