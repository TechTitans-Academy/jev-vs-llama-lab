import time
import json

class JEVClassifierModel:
    """
    Simulated lightweight JEV (System 1 Decision Engine)
    Shows non-autoregressive state classification with calibrated probability scores.
    """
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
            "model_architecture": "JEV (Non-Autoregressive State Classifier)",
            "selected_class": self.categories[best_idx],
            "confidence_score": probs[best_idx],
            "probability_vector": dict(zip(self.categories, probs)),
            "latency_ms": round(elapsed_ms, 3),
            "tokens_generated": 0,
            "deterministic_schema": True
        }

if __name__ == "__main__":
    sample_text = "My order #94821 arrived broken with a cracked screen. Request immediate refund!"
    model = JEVClassifierModel()
    
    print("\n⚡ Running JEV Decision Classifier...")
    print("-" * 50)
    result = model.predict_state(sample_text)
    print(json.dumps(result, indent=2))
    print("-" * 50)
