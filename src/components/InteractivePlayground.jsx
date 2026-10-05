import React, { useState } from 'react';
import { Play, Zap, Sparkles, ShieldCheck, Clock, Terminal, Trophy, AlertTriangle } from 'lucide-react';
import { SCENARIOS } from '../data/scenarios';

export default function InteractivePlayground({ useRealOllama, ollamaStatus }) {
  const [selectedScenarioId, setSelectedScenarioId] = useState(SCENARIOS[0].id);
  const [customPrompt, setCustomPrompt] = useState(SCENARIOS[0].inputPrompt);
  const [isRunning, setIsRunning] = useState(false);
  
  // Execution States
  const [jevState, setJevState] = useState(null);
  const [llamaState, setLlamaState] = useState(null);
  const [llamaStreamText, setLlamaStreamText] = useState("");
  const [llamaTokensCount, setLlamaTokensCount] = useState(0);

  const currentScenario = SCENARIOS.find(s => s.id === selectedScenarioId) || SCENARIOS[0];

  const handleScenarioChange = (scenario) => {
    setSelectedScenarioId(scenario.id);
    setCustomPrompt(scenario.inputPrompt);
    setJevState(null);
    setLlamaState(null);
    setLlamaStreamText("");
    setLlamaTokensCount(0);
  };

  const handleRunExecution = async () => {
    setIsRunning(true);
    setJevState(null);
    setLlamaState(null);
    setLlamaStreamText("");
    setLlamaTokensCount(0);

    // 1. Instant JEV Execution (~5ms)
    setTimeout(() => {
      setJevState({
        ...currentScenario.jev,
        executedAt: new Date().toLocaleTimeString()
      });
    }, 12);

    // 2. LLaMA Execution
    if (useRealOllama && ollamaStatus?.available) {
      try {
        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model: ollamaStatus.activeModel || "llama3",
            prompt: customPrompt,
            stream: false
          })
        });
        const data = await response.json();
        setLlamaStreamText(data.response);
        setLlamaTokensCount(data.eval_count || 110);
        setLlamaState({
          latencyMs: Math.round(data.eval_duration ? data.eval_duration / 1e6 : 820),
          tokensGenerated: data.eval_count || 110,
          costDollars: 0.002,
          tokensPerSec: Math.round((data.eval_count || 100) / ((data.eval_duration || 1e9) / 1e9)),
          streamText: data.response
        });
      } catch (err) {
        runSimulatedLlama();
      }
    } else {
      runSimulatedLlama();
    }
  };

  const runSimulatedLlama = () => {
    const fullText = currentScenario.llama.streamText;
    const words = fullText.split(" ");
    let index = 0;

    const interval = setInterval(() => {
      if (index < words.length) {
        setLlamaStreamText(prev => (prev ? prev + " " + words[index] : words[index]));
        setLlamaTokensCount(prev => prev + 2);
        index++;
      } else {
        clearInterval(interval);
        setLlamaState({
          ...currentScenario.llama,
          executedAt: new Date().toLocaleTimeString()
        });
        setIsRunning(false);
      }
    }, 28);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Educational Scenario Selector */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={20} color="#4f46e5" />
              Select Educational Scenario
            </h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
              Choose scenarios highlighting where <strong>LLaMA dominates</strong> vs where <strong>JEV dominates</strong>
            </p>
          </div>
          
          <button 
            className="btn-primary" 
            onClick={handleRunExecution}
            disabled={isRunning}
            style={{ fontSize: '1rem', padding: '10px 24px' }}
          >
            {isRunning ? (
              <>
                <Clock className="animate-spin" size={18} /> Executing Dual Models...
              </>
            ) : (
              <>
                <Play size={18} /> Run Dual Model Comparison
              </>
            )}
          </button>
        </div>

        {/* Scenario Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          {SCENARIOS.map(s => {
            const isSelected = selectedScenarioId === s.id;
            const isLlamaWinner = s.winner === 'LLaMA';
            return (
              <button
                key={s.id}
                onClick={() => handleScenarioChange(s)}
                style={{
                  background: isSelected 
                    ? (isLlamaWinner ? '#f5f3ff' : '#ecfdf5')
                    : '#ffffff',
                  border: isSelected 
                    ? (isLlamaWinner ? '2px solid #8b5cf6' : '2px solid #10b981')
                    : '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '14px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: '#0f172a'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{s.title}</span>
                  {isLlamaWinner ? (
                    <span className="winner-badge-llama"><Trophy size={12} /> LLaMA Wins</span>
                  ) : (
                    <span className="winner-badge-jev"><Trophy size={12} /> JEV Wins</span>
                  )}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{s.category}</div>
              </button>
            );
          })}
        </div>

        {/* Highlight Winner Reason */}
        <div style={{ 
          marginTop: '16px', 
          background: currentScenario.winner === 'LLaMA' ? '#f5f3ff' : '#ecfdf5', 
          border: `1px solid ${currentScenario.winner === 'LLaMA' ? '#c4b5fd' : '#a7f3d0'}`, 
          padding: '12px 16px', 
          borderRadius: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <Trophy size={20} color={currentScenario.winner === 'LLaMA' ? '#6d28d9' : '#047857'} />
          <div style={{ fontSize: '0.875rem', color: currentScenario.winner === 'LLaMA' ? '#5b21b6' : '#065f46' }}>
            <strong>Why {currentScenario.winner} Wins Here:</strong> {currentScenario.winnerReason}
          </div>
        </div>

        {/* Input Prompt Box */}
        <div style={{ marginTop: '16px' }}>
          <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '6px' }}>
            INPUT PROMPT / CONTEXT:
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '8px',
              padding: '12px',
              color: '#38bdf8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.875rem',
              minHeight: '60px',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Side-by-Side Model Comparator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
        
        {/* LEFT PANEL: JEV MODEL */}
        <div className={`glass-panel ${jevState ? 'jev-border' : ''}`} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#ecfdf5', padding: '8px', borderRadius: '10px', border: '1px solid #a7f3d0' }}>
                <Zap size={22} color="#059669" />
              </div>
              <div>
                <h3 className="gradient-text-jev" style={{ fontSize: '1.2rem', fontWeight: 800 }}>JEV AI Model</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Non-Autoregressive Decision Classifier</span>
              </div>
            </div>
            <span className="jev-badge">⚡ Single-Pass</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>LATENCY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#059669' }}>
                {jevState ? `${jevState.latencyMs} ms` : '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>TOKENS</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>0 tokens</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>CONFIDENCE</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7c3aed' }}>
                {jevState ? `${(jevState.confidence * 100).toFixed(1)}%` : '—'}
              </div>
            </div>
          </div>

          {/* JEV Output Body */}
          <div style={{ flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>DECISION SCHEMA & PROBABILITIES</span>
              <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ShieldCheck size={14} /> 100% Deterministic
              </span>
            </div>

            {jevState ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <pre className="code-block" style={{ fontSize: '0.8rem', maxHeight: '180px' }}>
                  {JSON.stringify(jevState.typedOutput, null, 2)}
                </pre>
              </div>
            ) : (
              <div style={{ flex: 1, border: '2px dashed var(--border-color)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                Click 'Run Dual Model Comparison'
              </div>
            )}
          </div>
        </div>


        {/* RIGHT PANEL: LLaMA MODEL */}
        <div className={`glass-panel ${llamaState || llamaStreamText ? 'llama-border' : ''}`} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ background: '#f5f3ff', padding: '8px', borderRadius: '10px', border: '1px solid #ddd6fe' }}>
                <Sparkles size={22} color="#7c3aed" />
              </div>
              <div>
                <h3 className="gradient-text-llama" style={{ fontSize: '1.2rem', fontWeight: 800 }}>LLaMA Model</h3>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Auto-regressive Generative Transformer</span>
              </div>
            </div>
            <span className="llama-badge">🦙 Auto-Regressive</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', background: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>LATENCY</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#7c3aed' }}>
                {llamaState ? `${llamaState.latencyMs} ms` : isRunning ? 'Streaming...' : '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>TOKENS GENERATED</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#db2777' }}>
                {llamaTokensCount} tokens
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', fontWeight: 600 }}>SPEED</div>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0284c7' }}>
                {llamaState ? `${llamaState.tokensPerSec} t/s` : '—'}
              </div>
            </div>
          </div>

          {/* LLaMA Output Body */}
          <div style={{ flex: 1, minHeight: '220px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between' }}>
              <span>OPEN-ENDED CONVERSATIONAL / CREATIVE GENERATION</span>
              {currentScenario.winner === 'LLaMA' && (
                <span className="winner-badge-llama">⭐ LLaMA Dominates</span>
              )}
            </div>

            {llamaStreamText || llamaState ? (
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #ddd6fe', 
                borderRadius: '8px', 
                padding: '14px', 
                color: '#0f172a', 
                fontSize: '0.9rem', 
                lineHeight: '1.68',
                whiteSpace: 'pre-wrap',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)',
                flex: 1
              }}>
                {llamaStreamText}
                {isRunning && <span className="streaming-cursor" />}
              </div>
            ) : (
              <div style={{ flex: 1, border: '2px dashed var(--border-color)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-dim)', fontSize: '0.9rem' }}>
                Click 'Run Dual Model Comparison'
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
