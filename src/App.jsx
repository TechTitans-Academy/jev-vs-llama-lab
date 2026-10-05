import React, { useState, useEffect } from 'react';
import { Activity, Terminal, Zap, RefreshCw } from 'lucide-react';

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
      
      {/* HEADER BAR */}
      <header className="glass-panel" style={{ padding: '16px 24px', marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '1.6rem' }}>🧠</span>
            <h1 className="gradient-text-title" style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a' }}>
              JEV vs LLaMA Model Lab
            </h1>
          </div>
          <p style={{ color: '#475569', fontSize: '0.85rem', marginTop: '2px', fontWeight: 600 }}>
            Comparing JEV (Decision Classifier) vs LLaMA (Generative LLM)
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
            {ollamaStatus.available ? `Ollama (${ollamaStatus.activeModel})` : 'Simulator Mode'}
          </div>

          <button 
            className="btn-outline" 
            onClick={checkOllamaStatus}
            title="Refresh backend detection"
            style={{ padding: '6px 10px' }}
          >
            <RefreshCw size={14} />
          </button>
        </div>

      </header>

      {/* CENTER-ALIGNED NAVIGATION TABS */}
      <nav style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        <button
          className={activeTab === 'playground' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('playground')}
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <Zap size={16} /> Interactive Playground
        </button>

        <button
          className={activeTab === 'metrics' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('metrics')}
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <Activity size={16} /> Benchmark Metrics
        </button>

        <button
          className={activeTab === 'code' ? 'btn-primary' : 'btn-outline'}
          onClick={() => setActiveTab('code')}
          style={{ padding: '10px 20px', fontSize: '0.9rem' }}
        >
          <Terminal size={16} /> Student Python Code
        </button>
      </nav>

      {/* MAIN TAB CONTENT */}
      <main>
        {activeTab === 'playground' && <InteractivePlayground useRealOllama={useRealOllama} ollamaStatus={ollamaStatus} />}
        {activeTab === 'metrics' && <MetricsBenchmark />}
        {activeTab === 'code' && <CodePlayground />}
      </main>

      {/* FOOTER */}
      <footer style={{ marginTop: '40px', paddingTop: '16px', borderTop: '1px solid #cbd5e1', textAlign: 'center', color: '#64748b', fontSize: '0.8rem', fontWeight: 600 }}>
        TechTitans Academy • JEV vs LLaMA Educational Sandbox
      </footer>

    </div>
  );
}
