import time
import json
import urllib.request

def run_llama_demo(prompt: str):
    url = "http://localhost:11434/api/generate"
    payload = {
        "model": "llama3",
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
                "model_architecture": "LLaMA (Auto-regressive Transformer)",
                "generated_text": res_data.get("response", ""),
                "tokens_generated": res_data.get("eval_count", 0),
                "latency_ms": round(elapsed_ms, 2)
            }
    except Exception:
        # Fallback simulation if local Ollama server is not running
        elapsed_ms = 720.0
        return {
            "model_architecture": "LLaMA (Auto-regressive Transformer - Simulated)",
            "generated_text": "Dear customer, I apologize for the damaged order #94821. We will issue a full refund immediately upon photo verification.",
            "tokens_generated": 92,
            "latency_ms": elapsed_ms,
            "note": "Connect to local Ollama server (`ollama run llama3`) for live local inference!"
        }

if __name__ == "__main__":
    prompt = "Draft a polite e-commerce customer support email regarding damaged order #94821."
    print("\n🦙 Running LLaMA Model Generation...")
    print("-" * 50)
    res = run_llama_demo(prompt)
    print(json.dumps(res, indent=2))
    print("-" * 50)
