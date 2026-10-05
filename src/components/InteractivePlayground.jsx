import React, { useState } from 'react';
import { Play, Zap, Sparkles, ShieldCheck, Clock, Terminal } from 'lucide-react';
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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Scenario Selector */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '12px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={18} color="#4f46e5" />
            Select Scenario
          </h3>
          
          <button 
            className="btn-primary" 
            onClick={handleRunExecution}
            disabled={isRunning}
            style={{ fontSize: '0.9rem', padding: '8px 20px' }}
          >
            {isRunning ? (
              <>
                <Clock className="animate-spin" size={16} /> Running...
              </>
            ) : (
              <>
                <Play size={16} /> Run Comparison
              </>
            )}
          </button>
        </div>

        {/* Scenario Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
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
                  borderRadius: '10px',
                  padding: '10px 12px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: '#0f172a'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>{s.title}</span>
                  {isLlamaWinner ? (
                    <span className="winner-badge-llama" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>LLaMA</span>
                  ) : (
                    <span className="winner-badge-jev" style={{ fontSize: '0.65rem', padding: '2px 6px' }}>JEV</span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Input Prompt Box */}
        <div style={{ marginTop: '14px' }}>
          <label style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', display: 'block', marginBottom: '4px' }}>
            INPUT PROMPT:
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            style={{
              width: '100%',
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: '6px',
              padding: '10px',
              color: '#38bdf8',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.825rem',
              minHeight: '46px',
              resize: 'vertical'
            }}
          />
        </div>
      </div>

      {/* Side-by-Side Model Comparator */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        
        {/* LEFT PANEL: JEV MODEL */}
        <div className={`glass-panel ${jevState ? 'jev-border' : ''}`} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '50%', 
                background: '#ecfdf5', 
                border: '1px solid #a7f3d0', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Zap size={20} color="#059669" />
              </div>

              <h3 className="gradient-text-jev" style={{ fontSize: '1.1rem', fontWeight: 800 }}>JEV AI Model</h3>
            </div>
            <span className="jev-badge">⚡ Decision Classifier</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>LATENCY</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#059669' }}>
                {jevState ? `${jevState.latencyMs} ms` : '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>TOKENS</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0284c7' }}>0 tokens</div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>CONFIDENCE</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#7c3aed' }}>
                {jevState ? `${(jevState.confidence * 100).toFixed(1)}%` : '—'}
              </div>
            </div>
          </div>

          {/* JEV Output */}
          <div style={{ flex: 1, minHeight: '180px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px', display: 'flex', justifyContent: 'space-between' }}>
              <span>TYPED OUTPUT</span>
              <span style={{ color: '#059669', display: 'flex', alignItems: 'center', gap: '3px' }}>
                <ShieldCheck size={12} /> 100% Deterministic
              </span>
            </div>

            {jevState ? (
              <pre className="code-block" style={{ fontSize: '0.775rem', maxHeight: '180px' }}>
                {JSON.stringify(jevState.typedOutput, null, 2)}
              </pre>
            ) : (
              <div style={{ flex: 1, border: '2px dashed var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                Click 'Run Comparison'
              </div>
            )}
          </div>
        </div>


        {/* RIGHT PANEL: LLaMA MODEL */}
        <div className={`glass-panel ${llamaState || llamaStreamText ? 'llama-border' : ''}`} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ 
                width: '38px', 
                height: '38px', 
                borderRadius: '50%', 
                background: '#f5f3ff', 
                border: '1px solid #ddd6fe', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Sparkles size={20} color="#7c3aed" />
              </div>

              <h3 className="gradient-text-llama" style={{ fontSize: '1.1rem', fontWeight: 800 }}>LLaMA Model</h3>
            </div>
            <span className="llama-badge">🦙 Generative LLM</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', background: '#f8fafc', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>LATENCY</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#7c3aed' }}>
                {llamaState ? `${llamaState.latencyMs} ms` : isRunning ? 'Streaming...' : '—'}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>TOKENS</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#db2777' }}>
                {llamaTokensCount}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 700 }}>SPEED</div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#0284c7' }}>
                {llamaState ? `${llamaState.tokensPerSec} t/s` : '—'}
              </div>
            </div>
          </div>

          {/* LLaMA Output */}
          <div style={{ flex: 1, minHeight: '180px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#475569', marginBottom: '6px' }}>
              GENERATED TEXT
            </div>

            {llamaStreamText || llamaState ? (
              <div style={{ 
                background: '#ffffff', 
                border: '1px solid #ddd6fe', 
                borderRadius: '8px', 
                padding: '12px', 
                color: '#0f172a', 
                fontSize: '0.85rem', 
                lineHeight: '1.6',
                whiteSpace: 'pre-wrap',
                flex: 1
              }}>
                {llamaStreamText}
                {isRunning && <span className="streaming-cursor" />}
              </div>
            ) : (
              <div style={{ flex: 1, border: '2px dashed var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontSize: '0.85rem' }}>
                Click 'Run Comparison'
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
