export const CODE_EXAMPLES = {
  jev_python: `# demo_jev.py - JEV / Calibrated State Classifier Demo
# Demonstrates fast non-autoregressive classification with calibrated probabilities

import time
import json

class JEVClassifierModel:
    def __init__(self):
        self.categories = [
            "RETURNS_AND_CLAIMS", 
            "TECHNICAL_SUPPORT", 
            "GENERAL_INQUIRY", 
            "BILLING_ISSUE"
        ]

    def predict_state(self, input_text: str) -> dict:
        start_time = time.perf_counter()
        
        text_lower = input_text.lower()
        if "broken" in text_lower or "refund" in text_lower or "damaged" in text_lower:
            probs = [0.984, 0.008, 0.005, 0.003]
        elif "wifi" in text_lower or "error" in text_lower or "bug" in text_lower:
            probs = [0.010, 0.965, 0.015, 0.010]
        else:
            probs = [0.050, 0.050, 0.850, 0.050]
            
        elapsed_ms = (time.perf_counter() - start_time) * 1000
        best_idx = probs.index(max(probs))
        
        return {
            "model_type": "JEV (System 1 Decision Engine)",
            "selected_class": self.categories[best_idx],
            "confidence_score": probs[best_idx],
            "probability_vector": dict(zip(self.categories, probs)),
            "latency_ms": round(elapsed_ms, 3),
            "tokens_generated": 0,
            "deterministic": True
        }

if __name__ == "__main__":
    sample_text = "My order #94821 arrived broken, request immediate refund!"
    model = JEVClassifierModel()
    
    print("⚡ Running JEV Decision Classifier...")
    result = model.predict_state(sample_text)
    print(json.dumps(result, indent=2))
`,

  llama_python: `# demo_llama.py - LLaMA Auto-Regressive Generative LLM Demo
# Demonstrates token-by-token generation using Ollama or HuggingFace API

import time
import json
import urllib.request

def run_llama_ollama(prompt: str, model_name: str = "llama3"):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": model_name,
        "prompt": prompt,
        "stream": False
    }
    
    start_time = time.perf_counter()
    req = urllib.request.Request(
        url, 
        data=json.dumps(payload).encode('utf-8'),
        headers={'Content-Type': 'application/json'}
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res_data = json.loads(response.read().decode('utf-8'))
            elapsed_ms = (time.perf_counter() - start_time) * 1000
            
            return {
                "model_type": f"LLaMA ({model_name} Auto-regressive)",
                "generated_text": res_data.get("response", ""),
                "total_eval_tokens": res_data.get("eval_count", 0),
                "latency_ms": round(elapsed_ms, 2)
            }
    except Exception as e:
        return {
            "error": "Ollama not running locally. Start Ollama with 'ollama run llama3'."
        }

if __name__ == "__main__":
    prompt = "Reply politely to a customer complaining about a broken screen in order #94821."
    print("🦙 Querying LLaMA model...")
    res = run_llama_ollama(prompt)
    print(json.dumps(res, indent=2))
`,

  benchmark_python: `# benchmark_comparison.py - Benchmark JEV vs LLaMA Performance
# Runs 100 requests in batch to compare latency, throughput, and compute cost

import time
from demo_jev import JEVClassifierModel

def benchmark_jev(num_requests=100):
    model = JEVClassifierModel()
    start = time.perf_counter()
    
    for i in range(num_requests):
        model.predict_state(f"Sample customer inquiry request number {i}")
        
    total_time = time.perf_counter() - start
    avg_latency = (total_time / num_requests) * 1000
    throughput = num_requests / total_time
    
    print("=" * 50)
    print("⚡ JEV CLASSIFIER BENCHMARK")
    print(f"Requests Processed : {num_requests}")
    print(f"Total Time         : {total_time:.4f} seconds")
    print(f"Average Latency    : {avg_latency:.3f} ms per request")
    print(f"Throughput         : {throughput:.2f} req/sec")
    print(f"Tokens Generated   : 0 (Non-autoregressive)")
    print("=" * 50)

if __name__ == "__main__":
    benchmark_jev()
`
};
