import React, { useState, useEffect } from 'react';
import { Activity, Terminal, Zap, RefreshCw, Sparkles } from 'lucide-react';

import InteractivePlayground from './components/InteractivePlayground';
import MetricsBenchmark from './components/MetricsBenchmark';
import CodePlayground from './components/CodePlayground';

export default function App() {
  const [activeTab, setActiveTab] = useState('playground');
  
  // Local Ollama status
  const [useRealOllama, setUseRealOllama] = useState(false);
  const [ollamaStatus, setOllamaStatus] = useState({ available: false, activeModel: null });

  useEffect(() => {
    checkOllamaStatus();
  }, []);

  const checkOllamaStatus = async () => {
    try {
      const res = await fetch('http://localhost:11434/api/tags');
      const data = await res.json();
      if (data.models && data.models.length > 0) {
        setOllamaStatus({ available: true, activeModel: data.models[0].name });
      } else {
        setOllamaStatus({ available: true, activeModel: 'llama3' });
      }
    } catch (err) {
      setOllamaStatus({ available: false, activeModel: null });
    }
  };

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 16px 60px 16px' }}>
      
      {/* QUICK REFERENCE 1-LINE GUIDANCE CARD */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '16px', 
        marginBottom: '20px' 
      }}>
        {/* JEV 1-LINE EXPLANATION */}
        <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Zap size={18} color="#059669" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#047857' }}>When to use JEV AI Model</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#065f46', lineHeight: '1.5', fontWeight: 600 }}>
            ⚡ <strong>Use JEV when you need:</strong> Sub-10ms intent classification, automated fraud scoring, CI/CD code security guardrails, and 100% deterministic JSON schemas with zero hallucination risk.
          </p>
        </div>

        {/* LLAMA 1-LINE EXPLANATION */}
        <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', borderRadius: '12px', padding: '14px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <Sparkles size={18} color="#7c3aed" />
            <h4 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#6d28d9' }}>When to use LLaMA Model</h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: '#5b21b6', lineHeight: '1.5', fontWeight: 600 }}>
            🦙 <strong>Use LLaMA when you need:</strong> Open-ended creative writing, fluid storytelling, empathetic conversational chat, and multi-step Chain-of-Thought math or logic reasoning.
          </p>
        </div>
      </div>

      {/* HEADER BAR */}
      <header className="glass-panel" style={{ padding: '20px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.8rem' }}>🧠</span>
            <h1 className="gradient-text-title" style={{ fontSize: '1.6rem', fontWeight: 800, color: '#0f172a' }}>
              JEV AI vs LLaMA Model Educational Lab
            </h1>
          </div>
          <p style={{ color: '#334155', fontSize: '0.875rem', marginTop: '4px', fontWeight: 600 }}>
            Interactive classroom sandbox comparing <strong>JEV (Decision Classifier)</strong> vs <strong>LLaMA (Auto-regressive LLM)</strong>
          </p>
        </div>

        {/* Ollama Status Pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ 
            background: ollamaStatus.available ? '#ecfdf5' : '#f1f5f9', 
            border: `1px solid ${ollamaStatus.available ? '#a7f3d0' : '#cbd5e1'}`, 
            padding: '6px 14px', 
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: 700,
            color: ollamaStatus.available ? '#047857' : '#475569',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: ollamaStatus.available ? '#10b981' : '#64748b' }} />
            {ollamaStatus.available ? `Local Ollama Active (${ollamaStatus.activeModel})` : 'Offline Simulator Active'}
          </div>

          <button 
            className="btn-outline" 
            onClick={checkOllamaStatus}
            title="Refresh local Ollama backend detection"
            style={{ padding: '6px 10px' }}
          >
            <RefreshCw size={14} />
          </button>
        </div>

      </header>

      {/* CENTER-ALIGNED NAVIGATION TABS */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '28px', flexWrap: 'wrap' }}>
        <button
          className={activeTab === 'playground' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('playground')}
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Zap size={18} /> Interactive Playground
        </button>

        <button
          className={activeTab === 'metrics' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('metrics')}
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Activity size={18} /> Benchmark Metrics
        </button>

        <button
          className={activeTab === 'code' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('code')}
          style={{ padding: '12px 24px', fontSize: '0.95rem' }}
        >
          <Terminal size={18} /> Student Python Code
        </button>
      </nav>

      {/* MAIN TAB CONTENT */}
      <main>
        {activeTab === 'playground' && <InteractivePlayground useRealOllama={useRealOllama} ollamaStatus={ollamaStatus} />}
        {activeTab === 'metrics' && <MetricsBenchmark />}
        {activeTab === 'code' && <CodePlayground />}
      </main>

      {/* FOOTER */}
      <footer style={{ marginTop: '48px', paddingTop: '20px', borderTop: '1px solid #cbd5e1', textAlign: 'center', color: '#475569', fontSize: '0.8rem', fontWeight: 600 }}>
        🎓 Built for Educational Purpose & Student Workshops • TechTitans Academy
      </footer>

    </div>
  );
}
