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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity color="#047857" size={20} /> Architectural Benchmark Metrics
        </h2>
      </div>

      {/* Charts Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px' }}>
        
        {/* Latency Comparison Chart */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Zap size={16} color="#059669" /> Response Latency (ms)
          </h3>
          <div style={{ height: '220px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={latencyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="metric" stroke="#334155" fontSize={11} fontWeight={600} />
                <YAxis stroke="#334155" fontSize={11} fontWeight={600} unit="ms" />
                <Tooltip 
                  contentStyle={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px', color: '#fff' }}
                />
                <Legend wrapperStyle={{ paddingTop: '6px', fontSize: '0.8rem', fontWeight: 600 }} />
                <Bar dataKey="JEV" fill="#059669" radius={[4, 4, 0, 0]} name="JEV (ms)" />
                <Bar dataKey="LLaMA" fill="#7c3aed" radius={[4, 4, 0, 0]} name="LLaMA (ms)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Throughput & Memory Metrics */}
        <div className="glass-panel" style={{ padding: '16px' }}>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Cpu size={16} color="#0284c7" /> Resource Footprint
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700 }}>JEV THROUGHPUT</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857' }}>3,500 req/s</div>
            </div>

            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: '#6d28d9', fontWeight: 700 }}>LLaMA THROUGHPUT</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6d28d9' }}>25 req/s</div>
            </div>

            <div style={{ background: '#ecfdf5', border: '1px solid #a7f3d0', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: '#047857', fontWeight: 700 }}>JEV VRAM</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#047857' }}>250 MB</div>
            </div>

            <div style={{ background: '#f5f3ff', border: '1px solid #ddd6fe', padding: '12px', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.7rem', color: '#6d28d9', fontWeight: 700 }}>LLaMA VRAM</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#6d28d9' }}>8.2 GB</div>
            </div>
          </div>
        </div>

      </div>

      {/* Feature Comparison Matrix Table */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px' }}>
          📋 Comparison Matrix
        </h3>
        
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #cbd5e1', background: '#f1f5f9' }}>
                <th style={{ padding: '10px 12px', color: '#0f172a', fontWeight: 800 }}>FEATURE</th>
                <th style={{ padding: '10px 12px', color: '#047857', fontWeight: 800 }}>JEV MODEL</th>
                <th style={{ padding: '10px 12px', color: '#6d28d9', fontWeight: 800 }}>LLaMA MODEL</th>
                <th style={{ padding: '10px 12px', color: '#0f172a', fontWeight: 800 }}>PREFERRED</th>
              </tr>
            </thead>
            <tbody>
              {comparisonTable.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e2e8f0', background: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                  <td style={{ padding: '10px 12px', fontWeight: 700, color: '#0f172a' }}>{row.feature}</td>
                  <td style={{ padding: '10px 12px', color: '#1e293b', fontWeight: 600 }}>{row.jev}</td>
                  <td style={{ padding: '10px 12px', color: '#1e293b', fontWeight: 600 }}>{row.llama}</td>
                  <td style={{ padding: '10px 12px' }}>
                    {row.winner === 'jev' && <span className="jev-badge" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>JEV</span>}
                    {row.winner === 'llama' && <span className="llama-badge" style={{ fontSize: '0.7rem', padding: '2px 8px' }}>LLaMA</span>}
                    {row.winner === 'neutral' && <span style={{ color: '#475569', fontSize: '0.7rem', fontWeight: 700 }}>Depends</span>}
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
