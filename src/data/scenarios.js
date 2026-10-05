export const SCENARIOS = [
  {
    id: "creative_storytelling",
    title: "✍️ Creative Storytelling",
    category: "Open-Ended Generation",
    winner: "LLaMA",
    winnerReason: "LLaMA excels at fluid narrative depth & storytelling.",
    inputPrompt: "Prompt: 'Write a sci-fi opening about discovering an ancient library on Mars.'",
    description: "Open-ended creative narrative generation.",
    
    jev: {
      latencyMs: 5,
      tokensUsed: 0,
      costDollars: 0.00002,
      confidence: 0.82,
      typedOutput: {
        status: "NOT_APPLICABLE",
        error: "JEV is a classifier, not a narrative text generator.",
        closest_category: "CREATIVE_WRITING_PROMPT"
      }
    },
    
    llama: {
      latencyMs: 950,
      tokensGenerated: 165,
      costDollars: 0.0032,
      tokensPerSec: 173,
      streamText: "The red dust settled against Vance's visor as he forced open the vault door on Mars. Inside lay endless rows of crystal slates—a library older than Earth's oceans."
    }
  },
  {
    id: "complex_reasoning",
    title: "🧩 Math & Logic Reasoning",
    category: "Step-by-Step Logic",
    winner: "LLaMA",
    winnerReason: "LLaMA breaks problems into step-by-step Chain-of-Thought math.",
    inputPrompt: "Prompt: 'Train A leaves at 60mph, Train B 120 miles away at 40mph. When do they meet?'",
    description: "Chain-of-thought logic problem.",
    
    jev: {
      latencyMs: 4,
      tokensUsed: 0,
      costDollars: 0.000015,
      confidence: 0.92,
      typedOutput: {
        problem_type: "WORD_PROBLEM_KINETICS",
        classification_only: true,
        note: "JEV returns class labels, but cannot explain math steps."
      }
    },
    
    llama: {
      latencyMs: 820,
      tokensGenerated: 135,
      costDollars: 0.0025,
      tokensPerSec: 164,
      streamText: "Step 1: Relative speed = 60 + 40 = 100 mph.\nStep 2: Time = 120 miles / 100 mph = 1.2 hours (1 hr 12 min).\nStep 3: Distance Train A = 60 × 1.2 = 72 miles."
    }
  },
  {
    id: "customer_triage",
    title: "🎧 Support Intent Router",
    category: "Classification & Routing",
    winner: "JEV",
    winnerReason: "JEV delivers 5ms latency & 100% JSON schema safety.",
    inputPrompt: "User Query: 'My order #94821 arrived broken. Request immediate refund!'",
    description: "High-speed intent routing.",
    
    jev: {
      latencyMs: 6,
      tokensUsed: 0,
      costDollars: 0.00002,
      confidence: 0.988,
      typedOutput: {
        intent: "REFUND_REPLACEMENT_REQUEST",
        urgency: "HIGH",
        target_department: "RETURNS_AND_CLAIMS",
        order_id: "94821"
      }
    },
    
    llama: {
      latencyMs: 740,
      tokensGenerated: 94,
      costDollars: 0.0018,
      tokensPerSec: 127,
      streamText: "Dear Customer,\n\nI am sorry order #94821 arrived broken. Please reply with photos to process your refund."
    }
  },
  {
    id: "code_security",
    title: "🛡️ Code Security Scanner",
    category: "Deterministic Guardrails",
    winner: "JEV",
    winnerReason: "JEV guarantees 100% strict JSON schema output in 4ms.",
    inputPrompt: "Code Snippet: 'const query = \"SELECT * FROM users WHERE user = '\" + input + \"'\";'",
    description: "SQL Injection detection.",
    
    jev: {
      latencyMs: 4,
      tokensUsed: 0,
      costDollars: 0.000015,
      confidence: 0.996,
      typedOutput: {
        vulnerability: "CWE-89: SQL_INJECTION",
        risk: "CRITICAL",
        action: "BLOCK_PULL_REQUEST"
      }
    },
    
    llama: {
      latencyMs: 890,
      tokensGenerated: 142,
      costDollars: 0.0028,
      tokensPerSec: 159,
      streamText: "Security Analysis:\n- SQL Injection Vulnerability found in string concatenation.\n- Recommendation: Use parameterized queries."
    }
  }
];
