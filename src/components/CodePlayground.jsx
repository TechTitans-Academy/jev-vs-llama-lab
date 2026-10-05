import React, { useState } from 'react';
import { Terminal, Copy, Check, Play, FileCode } from 'lucide-react';
import { CODE_EXAMPLES } from '../data/codeExamples';

export default function CodePlayground() {
  const [selectedFile, setSelectedFile] = useState('jev_python');
  const [copied, setCopied] = useState(false);

  const currentCode = CODE_EXAMPLES[selectedFile] || CODE_EXAMPLES.jev_python;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner */}
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#0f172a', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Terminal color="#059669" /> Student Local Python Scripts
        </h2>
        <p style={{ color: '#334155', fontSize: '0.9rem', fontWeight: 500 }}>
          Students can copy and run these standalone Python scripts directly on their laptops to observe real-time execution dynamics.
        </p>

        {/* File selector buttons */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '16px', flexWrap: 'wrap' }}>
          <button
            className={selectedFile === 'jev_python' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setSelectedFile('jev_python')}
            style={{ background: selectedFile === 'jev_python' ? '#047857' : '' }}
          >
            <FileCode size={16} /> demo_jev.py (Decision Classifier)
          </button>
          
          <button
            className={selectedFile === 'llama_python' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setSelectedFile('llama_python')}
            style={{ background: selectedFile === 'llama_python' ? '#6d28d9' : '' }}
          >
            <FileCode size={16} /> demo_llama.py (Ollama LLaMA)
          </button>
          
          <button
            className={selectedFile === 'benchmark_python' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setSelectedFile('benchmark_python')}
            style={{ background: selectedFile === 'benchmark_python' ? '#0284c7' : '' }}
          >
            <FileCode size={16} /> benchmark_comparison.py
          </button>
        </div>
      </div>

      {/* Code Viewer Box */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <span style={{ fontSize: '0.875rem', fontWeight: 800, color: '#0f172a', fontFamily: 'var(--font-mono)' }}>
            📄 python_demos/{selectedFile}.py
          </span>

          <button 
            className="btn-outline" 
            onClick={handleCopyCode}
            style={{ fontSize: '0.75rem', padding: '6px 12px' }}
          >
            {copied ? <Check size={14} color="#059669" /> : <Copy size={14} />}
            {copied ? 'Copied to Clipboard!' : 'Copy Code'}
          </button>
        </div>

        <pre className="code-block" style={{ fontSize: '0.825rem', maxHeight: '420px' }}>
          {currentCode}
        </pre>
      </div>

      {/* Terminal Run Instructions */}
      <div className="glass-panel" style={{ padding: '20px' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Play size={16} color="#059669" /> How Students Can Run This Locally:
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.85rem' }}>
          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '8px' }}>
            <div style={{ color: '#334155', fontWeight: 600, marginBottom: '4px' }}>1. Open Terminal and navigate to the project python_demos directory:</div>
            <code style={{ color: '#047857', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              cd /Users/techtitans/.gemini/antigravity-ide/scratch/jev-vs-llama-lab/python_demos
            </code>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '8px' }}>
            <div style={{ color: '#334155', fontWeight: 600, marginBottom: '4px' }}>2. Run the JEV Classifier Demo:</div>
            <code style={{ color: '#047857', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              python3 demo_jev.py
            </code>
          </div>

          <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '12px', borderRadius: '8px' }}>
            <div style={{ color: '#334155', fontWeight: 600, marginBottom: '4px' }}>3. Run the Benchmark script:</div>
            <code style={{ color: '#047857', fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              python3 benchmark_comparison.py
            </code>
          </div>
        </div>
      </div>

    </div>
  );
}
