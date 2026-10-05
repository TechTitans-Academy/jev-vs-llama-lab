import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { Activity, Cpu, Zap } from 'lucide-react';

export default function MetricsBenchmark() {
  
  const latencyData = [
    { metric: 'E-commerce Router', JEV: 6, LLaMA: 740 },
    { metric: 'Code Security', JEV: 4, LLaMA: 890 },
    { metric: 'Math Reasoning', JEV: 4, LLaMA: 820 },
    { metric: 'Creative Story', JEV: 5, LLaMA: 950 },
  ];

  const comparisonTable = [
    { feature: 'Architecture Type', jev: 'Non-Autoregressive Classifier', llama: 'Auto-regressive Generative Transformer', winner: 'jev' },
    { feature: 'Output Format', jev: 'Typed JSON & Probability Scores', llama: 'Open-ended Free-form Text / Storytelling', winner: 'neutral' },
    { feature: 'Average Latency', jev: '3ms - 15ms (Instant)', llama: '400ms - 2000ms+ (Streaming)', winner: 'jev' },
    { feature: 'Creative & Narrative Writing', jev: 'Incapable (Classification Only)', llama: 'Vastly Superior (High Narrative Depth)', winner: 'llama' },
    { feature: 'Multi-Step Logic & Math Proofs', jev: 'Classification Label Only', llama: 'Vastly Superior (Chain-of-Thought)', winner: 'llama' },
    { feature: 'Hallucination Risk', jev: '0% (Schema Enforced)', llama: '5% - 15% (Requires Guardrails)', winner: 'jev' },
    { feature: 'GPU VRAM Requirement', jev: '< 500 MB (Runs on CPU/Edge)', llama: '8 GB - 40 GB+ VRAM', winner: 'jev' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Activity color="#047857" /> Architectural Benchmark Metrics
        </h2>
        <p style={{ color: '#334155', fontSize: '0.9rem', fontWeight: 500 }}>
          Quantitative performance comparison between <strong>JEV (Decision Classifier)</strong> and <strong>LLaMA (Auto-regressive LLM)</strong>.
        </p>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '20px' }}>
        
        {/* Latency Comparison Chart */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#059669" /> Response Latency in ms (Lower is Better)
          </h3>
          <div style={{ height: '240px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" stroke="#334155" fontSize={11} fontWeight={600} />
                <YAxis stroke="#334155" fontSize={11} fontWeight={600} unit="ms" />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ paddingTop: '10px', fontSize: '0.8rem', fontWeight: 600 }} />
                <Bar dataKey="JEV" fill="#059669" radius={[4, 4, 0, 0]} name="JEV Latency (ms)" />
                <Bar dataKey="LLaMA" fill="#7c3aed" radius={[4, 4, 0, 0]} name="LLaMA Latency (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'center', marginTop: '10px', fontWeight: 600 }}>
            ⚡ JEV executes in 5ms; LLaMA Streams tokens over 700ms-950ms.
          </div>
        </div>

        {/* Throughput & Memory Metrics */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={18} color="#0284c7" /> Memory & Resource Comparison
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>JEV THROUGHPUT</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#047857' }}>3,500 req/s</div>
              <div style={{ fontSize: '0.7rem', color: '#065f46', marginTop: '4px', fontWeight: 500 }}>Single CPU Core</div>
            </div>

            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#6d28d9', fontWeight: 700 }}>LLaMA THROUGHPUT</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6d28d9' }}>25 req/s</div>
              <div style={{ fontSize: '0.7rem', color: '#5b21b6', marginTop: '4px', fontWeight: 500 }}>LLaMA 8B on GPU</div>
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#047857', fontWeight: 700 }}>JEV VRAM FOOTPRINT</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#047857' }}>250 MB</div>
              <div style={{ fontSize: '0.7rem', color: '#065f46', marginTop: '4px', fontWeight: 500 }}>Zero KV-Cache</div>
            </div>

            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '14px', borderRadius: '10px' }}>
              <div style={{ fontSize: '0.75rem', color: '#6d28d9', fontWeight: 700 }}>LLaMA VRAM FOOTPRINT</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#6d28d9' }}>8.2 GB</div>
              <div style={{ fontSize: '0.7rem', color: '#5b21b6', marginTop: '4px', fontWeight: 500 }}>Requires GPU Cache</div>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#0f172a', marginBottom: '16px' }}>
          📋 Architectural Dimension Matrix
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                <th style={{ padding: '14px', color: '#0f172a', fontWeight: 800, fontSize: '0.85rem' }}>ARCHITECTURAL DIMENSION</th>
                <th style={{ padding: '14px', color: '#047857', fontWeight: 800, fontSize: '0.85rem' }}>JEV AI MODEL</th>
                <th style={{ padding: '14px', color: '#6d28d9', fontWeight: 800, fontSize: '0.85rem' }}>LLaMA MODEL</th>
                <th style={{ padding: '14px', color: '#0f172a', fontWeight: 800, fontSize: '0.85rem' }}>BEST CHOICE</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                  <td style={{ padding: '14px', fontWeight: 700, color: '#0f172a' }}>{row.feature}</td>
                  <td style={{ padding: '14px', color: '#1e293b', fontWeight: 600 }}>{row.jev}</td>
                  <td style={{ padding: '14px', color: '#1e293b', fontWeight: 600 }}>{row.llama}</td>
                  <td style={{ padding: '14px' }}>
                    {row.winner === 'jev' && <span className="jev-badge">⚡ JEV Preferred</span>}
                    {row.winner === 'llama' && <span className="llama-badge">🦙 LLaMA Preferred</span>}
                    {row.winner === 'neutral' && <span style={{ color: '#475569', fontSize: '0.75rem', fontWeight: 700 }}>Task Dependent</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
