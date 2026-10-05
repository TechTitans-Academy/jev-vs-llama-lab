export const SCENARIOS = [
  {
    id: "creative_storytelling",
    title: "✍️ Creative Storytelling & Rich Copywriting",
    category: "Open-Ended Generation",
    winner: "LLaMA",
    winnerReason: "LLaMA excels at fluid narrative depth, metaphors, and open-ended text generation where fixed classification schema fails.",
    inputPrompt: "Prompt: 'Write a compelling sci-fi story opening about an astronaut discovering a hidden ancient library on Mars.'",
    description: "Scenario demonstrating where LLaMA is vastly superior to JEV.",
    
    // JEV Output (Incapable of generating long free-form text narrative)
    jev: {
      latencyMs: 5,
      tokensUsed: 0,
      costDollars: 0.00002,
      confidence: 0.82,
      typedOutput: {
        status: "NOT_APPLICABLE",
        error: "JEV is a non-autoregressive classifier, not a text generator.",
        closest_matching_category: "CREATIVE_WRITING_PROMPT",
        classification_only: true,
        limitations: "Cannot output paragraph narrative prose."
      }
    },
    
    // LLaMA Output (Rich, creative, engaging narrative generation!)
    llama: {
      latencyMs: 950,
      tokensGenerated: 165,
      costDollars: 0.0032,
      tokensPerSec: 173,
      streamText: "The red dust settled against Commander Vance's helmet visor as he forced open the iron vault door in the depths of Valles Marineris.\n\nInside lay not forgotten alien weapons, but endless rows of crystal slates—each pulsing with faint amber light. A library older than Earth's oceans stood preserved in the Martian vacuum, waiting for someone to read the forgotten history of Sol."
    }
  },
  {
    id: "complex_reasoning",
    title: "🧩 Multi-Step Logic & Math Problem Solving",
    category: "Complex Step-by-Step Reasoning",
    winner: "LLaMA",
    winnerReason: "LLaMA breaks down multi-step logic problems into Chain-of-Thought reasoning, which JEV cannot do.",
    inputPrompt: "Prompt: 'If a train leaves Station A at 60 mph and another leaves Station B 120 miles away at 40 mph towards each other, when do they meet and how far did train A travel?'",
    description: "Scenario showing LLaMA's step-by-step reasoning advantage.",
    
    jev: {
      latencyMs: 4,
      tokensUsed: 0,
      costDollars: 0.000015,
      confidence: 0.92,
      typedOutput: {
        problem_type: "WORD_PROBLEM_KINETICS",
        difficulty: "MEDIUM",
        required_tools: ["EQUATION_SOLVER"],
        classification_only: true,
        limitations: "JEV returns class labels, but cannot perform Chain-of-Thought mathematical proof explanations."
      }
    },
    
    llama: {
      latencyMs: 820,
      tokensGenerated: 135,
      costDollars: 0.0025,
      tokensPerSec: 164,
      streamText: "Step 1: Calculate combined relative speed:\n60 mph + 40 mph = 100 mph combined speed.\n\nStep 2: Calculate time to meet:\nTime = Distance / Speed = 120 miles / 100 mph = 1.2 hours (1 hour and 12 minutes).\n\nStep 3: Calculate distance traveled by Train A:\nDistance = Speed × Time = 60 mph × 1.2 hours = 72 miles.\n\nConclusion: They meet in 1 hour 12 minutes, and Train A travels 72 miles."
    }
  },
  {
    id: "customer_triage",
    title: "🎧 E-Commerce High-Speed Support Router",
    category: "Classification & Intent Routing",
    winner: "JEV",
    winnerReason: "JEV delivers 5ms latency, 100% deterministic JSON schemas, and zero hallucination risk at 200x lower cost.",
    inputPrompt: "User Query: 'My order #94821 arrived with a broken screen. I need an immediate refund or replacement right now!'",
    description: "Scenario showing JEV's speed and cost advantage for intent routing.",
    
    jev: {
      latencyMs: 6,
      tokensUsed: 0,
      costDollars: 0.00002,
      confidence: 0.988,
      typedOutput: {
        intent: "REFUND_REPLACEMENT_REQUEST",
        urgency: "HIGH",
        target_department: "RETURNS_AND_CLAIMS",
        order_id: "94821",
        probability_scores: {
          "RETURNS_AND_CLAIMS": 0.988,
          "GENERAL_INQUIRY": 0.008,
          "TECHNICAL_SUPPORT": 0.003
        }
      }
    },
    
    llama: {
      latencyMs: 740,
      tokensGenerated: 94,
      costDollars: 0.0018,
      tokensPerSec: 127,
      streamText: "Dear Customer,\n\nI am very sorry to hear that your order #94821 arrived with a broken screen! We take product damage very seriously.\n\nTo process your refund or replacement, please reply with photos of the damaged item and the shipping box."
    }
  },
  {
    id: "code_security",
    title: "🛡️ Automated Code Security Guardrail",
    category: "Deterministic Guardrails",
    winner: "JEV",
    winnerReason: "JEV guarantees 100% strict JSON schema output in 4ms, perfect for CI/CD pull request security blocking.",
    inputPrompt: "Code Snippet: 'const query = \"SELECT * FROM users WHERE username = '\" + userInput + \"' AND password = '\" + pass + \"'\";'",
    description: "Detecting SQL Injection vulnerability in CI/CD pipeline.",
    
    jev: {
      latencyMs: 4,
      tokensUsed: 0,
      costDollars: 0.000015,
      confidence: 0.996,
      typedOutput: {
        vulnerability_detected: true,
        threat_category: "CWE-89: SQL_INJECTION",
        risk_severity: "CRITICAL",
        action: "BLOCK_PULL_REQUEST",
        confidence_distribution: {
          "SQL_INJECTION": 0.996,
          "XSS": 0.002,
          "SAFE_CODE": 0.002
        }
      }
    },
    
    llama: {
      latencyMs: 890,
      tokensGenerated: 142,
      costDollars: 0.0028,
      tokensPerSec: 159,
      streamText: "Security Vulnerability Analysis:\n\n1. Issues Found:\n- SQL Injection Vulnerability: String concatenation is directly constructing raw SQL queries using untrusted variable `userInput`.\n\n2. Recommendation:\nUse parameterized queries instead."
    }
  }
];
