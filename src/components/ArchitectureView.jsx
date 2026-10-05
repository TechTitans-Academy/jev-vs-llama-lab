import React, { useState } from 'react';
import { Layers, ArrowRight, ArrowDown, Database, Cpu, Sparkles, CheckCircle2, Shield, Eye } from 'lucide-react';

export default function ArchitectureView() {
  const [activeTab, setActiveTab] = useState('jev');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      <div className="glass-panel" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers color="#6366f1" /> Deep-Dive Model Architecture & Internal Pipelines
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
          Visualizing how tensors flow through JEV (System 1 Decision Engine / JEPA) vs LLaMA (Auto-regressive LLM Transformer).
        </p>

        {/* Tab Switcher */}
        <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
          <button
            className={activeTab === 'jev' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setActiveTab('jev')}
            style={{ background: activeTab === 'jev' ? 'linear-gradient(135deg, #10b981, #059669)' : '' }}
          >
            ⚡ JEV Pipeline (System 1 Classifier)
          </button>
          <button
            className={activeTab === 'llama' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setActiveTab('llama')}
            style={{ background: activeTab === 'llama' ? 'linear-gradient(135deg, #8b5cf6, #7c3aed)' : '' }}
          >
            🦙 LLaMA Pipeline (Auto-regressive Transformer)
          </button>
          <button
            className={activeTab === 'jepa' ? 'btn-primary' : 'btn-outline'}
            onClick={() => setActiveTab('jepa')}
            style={{ background: activeTab === 'jepa' ? 'linear-gradient(135deg, #06b6d4, #0891b2)' : '' }}
          >
            🧠 JEPA World Model (Yann LeCun Paradigm)
          </button>
        </div>
      </div>

      {/* JEV ARCHITECTURE DETAILS */}
      {activeTab === 'jev' && (
        <div className="glass-panel jev-border" style={{ padding: '24px' }}>
          <h3 className="gradient-text-jev" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>
            JEV: Single-Pass Non-Autoregressive State Engine
          </h3>

          <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
            JEV skips token-by-token loop decoding entirely. Instead, it takes the input context and predefined target states, projects them into a joint embedding space, and evaluates a <strong>Reinforcement Learning for Calibrated Decisions (RLCD)</strong> head to produce a calibrated probability distribution in a single step (~3-8ms).
          </p>

          {/* Interactive Pipeline Steps */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 1: CONTEXT INGESTION</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Input State + Options</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Raw input string ingested alongside valid target decision schema.</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 2: ENCODER EMBEDDING</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Dense Vector Projection</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Maps input into fixed d-dimensional continuous representation vector.</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 3: RLCD HEAD</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Calibrated Probability Head</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Evaluates classification logits optimized for empirical confidence calibration.</div>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '16px', borderRadius: '12px', border: '1px solid #10b981' }}>
              <div style={{ color: '#34d399', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 4: TYPED OUTPUT</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Deterministic JSON Result</div>
              <div style={{ fontSize: '0.75rem', color: '#a7f3d0', marginTop: '4px' }}>Guaranteed valid schema + confidence score array (e.g. 0.984).</div>
            </div>

          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            ⚡ <strong>Why JEV avoids hallucinations:</strong> Because it operates as a specialized state classifier rather than an unconstrained text generator, it cannot emit invalid syntax or fabricated facts.
          </div>
        </div>
      )}

      {/* LLAMA ARCHITECTURE DETAILS */}
      {activeTab === 'llama' && (
        <div className="glass-panel llama-border" style={{ padding: '24px' }}>
          <h3 className="gradient-text-llama" style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>
            LLaMA: Auto-Regressive Decoder Loop Pipeline
          </h3>

          <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
            LLaMA processes text auto-regressively. To generate 100 tokens, the model must execute the <strong>entire multi-layer transformer network 100 consecutive times</strong>, appending each newly predicted token to the prompt context and updating its Key-Value (KV) cache.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', marginBottom: '24px' }}>
            
            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 1: TOKENIZATION</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>BPE Tokenizer</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Converts prompt string into token ID sequence (vocab size ~128k).</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 2: TRANSFORMER BLOCKS</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Multi-Head Self Attention</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>32-80 transformer layers perform causal attention over KV-Cache.</div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.4)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(139, 92, 246, 0.2)' }}>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 3: SAMPLING LOOP</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Softmax & Temperature</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Samples next token from 128k logit vector using Top-P / Temp.</div>
            </div>

            <div style={{ background: 'rgba(139, 92, 246, 0.15)', padding: '16px', borderRadius: '12px', border: '1px solid #8b5cf6' }}>
              <div style={{ color: '#a78bfa', fontWeight: 700, fontSize: '0.8rem', marginBottom: '6px' }}>STEP 4: LOOP REPEAT</div>
              <div style={{ fontSize: '0.9rem', color: 'white', fontWeight: 600 }}>Append & Re-run (N times)</div>
              <div style={{ fontSize: '0.75rem', color: '#ddd6fe', marginTop: '4px' }}>Repeats loop until EOS token is emitted. Accumulates latency.</div>
            </div>

          </div>

          <div style={{ background: 'rgba(0,0,0,0.3)', padding: '16px', borderRadius: '10px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            🐢 <strong>Why LLaMA accumulates latency:</strong> Generating 150 words requires ~200 sequential passes through the GPU, whereas JEV completes execution in a single pass.
          </div>
        </div>
      )}

      {/* JEPA ARCHITECTURE DETAILS */}
      {activeTab === 'jepa' && (
        <div className="glass-panel" style={{ padding: '24px', borderColor: '#06b6d4' }}>
          <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#38bdf8', marginBottom: '16px' }}>
            JEPA: Joint Embedding Predictive Architecture (Yann LeCun)
          </h3>

          <p style={{ color: '#e2e8f0', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '20px' }}>
            Proposed by Yann LeCun (Meta AI), <strong>JEPA</strong> is a foundational architectural alternative to generative AI. Rather than trying to predict raw pixels or raw text tokens (which leads to hallucinations and high compute overhead), JEPA models predict missing or future information inside an <strong>abstract latent representation space</strong>.
          </p>

          <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', padding: '16px', borderRadius: '12px', marginBottom: '20px' }}>
            <h4 style={{ color: '#38bdf8', fontWeight: 700, marginBottom: '8px' }}>Key JEPA Principles vs Generative LLMs:</h4>
            <ul style={{ color: '#e2e8f0', fontSize: '0.875rem', lineHeight: '1.7', paddingLeft: '20px' }}>
              <li><strong>No Token Generation Overhead:</strong> Predicts abstract semantic vectors directly in embedding space.</li>
              <li><strong>World Representation:</strong> Learns the underlying physics and causal dynamics of the world rather than surface language statistical patterns.</li>
              <li><strong>Integration with LLMs (e.g. LLM-JEPA / VL-JEPA):</strong> JEPA representation encoders are increasingly used to feed structured latent world state into LLMs like LLaMA for grounded multimodal reasoning.</li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
