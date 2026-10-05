import React, { useState, useEffect } from 'react';
import { Activity, Terminal, Zap, RefreshCw, GraduationCap, Info } from 'lucide-react';

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
      
      {/* EDUCATIONAL DISCLAIMER BANNER */}
      <div style={{ 
        background: '#eff6ff', 
        border: '1px solid #bfdbfe', 
        color: '#1e40af', 
        padding: '10px 18px', 
        borderRadius: '12px', 
        fontSize: '0.85rem', 
        fontWeight: 600, 
        marginBottom: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        boxShadow: '0 2px 6px rgba(30, 64, 175, 0.05)'
      }}>
        <GraduationCap size={20} color="#2563eb" style={{ flexShrink: 0 }} />
        <div>
          <strong>Educational Workshop Notice:</strong> This interactive lab is created exclusively for educational & student workshop demonstrations comparing <strong>System 1 Decision Engine (JEV)</strong> vs <strong>System 2 Auto-regressive LLM (LLaMA)</strong>.
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
