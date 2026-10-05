export const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "What is the primary difference in execution mechanism between JEV and LLaMA?",
    options: [
      "JEV generates text token-by-token, whereas LLaMA uses computer vision.",
      "JEV is a non-autoregressive state classifier returning direct probability distributions, whereas LLaMA is an auto-regressive token generator.",
      "LLaMA only runs on mobile devices while JEV requires supercomputers.",
      "There is no architectural difference; they are identical models with different names."
    ],
    correctAnswer: 1,
    explanation: "JEV (System 1 Decision Engine) is non-autoregressive and computes direct typed decisions and calibrated probabilities without token-by-token generation overhead. LLaMA (System 2 LLM) generates tokens sequentially."
  },
  {
    id: 2,
    question: "Why is JEV typically 100x to 200x faster than LLaMA for intent classification tasks?",
    options: [
      "Because JEV skips multi-layer attention entirely.",
      "Because JEV evaluates the state in a single forward pass without auto-regressive token generation loops or KV caching.",
      "Because LLaMA always requires internet connection.",
      "Because JEV uses low quality compressed text."
    ],
    correctAnswer: 1,
    explanation: "Auto-regressive LLMs like LLaMA must execute full transformer forward passes iteratively for every single output token (50-200+ loops), whereas JEV computes the final typed classification in a single unified step."
  },
  {
    id: 3,
    question: "In what scenario is LLaMA vastly superior to JEV?",
    options: [
      "Sub-10ms real-time API request routing.",
      "High-throughput 100,000 req/sec payment fraud scoring.",
      "Open-ended creative writing, complex multi-step reasoning, and fluid natural language conversation.",
      "Deterministic 100% JSON schema validation without hallucinations."
    ],
    correctAnswer: 2,
    explanation: "LLaMA shines in open-ended generative reasoning, creative text generation, and conversational interaction where exact schema constraints are secondary to language fluency and depth."
  },
  {
    id: 4,
    question: "What does RLCD (Reinforcement Learning for Calibrated Decisions) optimize in JEV models?",
    options: [
      "It makes the generated stories more creative.",
      "It ensures probability confidence scores (e.g. 0.98) accurately correspond to real-world empirical outcome accuracy.",
      "It increases the model size from 7B to 70B parameters.",
      "It converts text into audio files."
    ],
    correctAnswer: 1,
    explanation: "RLCD optimizes models to produce well-calibrated confidence probabilities. A 0.95 confidence score genuinely means 95% likelihood of accuracy in decision-making."
  },
  {
    id: 5,
    question: "According to Meta AI and Yann LeCun, what is the core concept behind JEPA (Joint Embedding Predictive Architecture)?",
    options: [
      "Predicting missing or future information in abstract latent embedding space rather than generating raw pixel or token strings.",
      "Translating languages using dictionary lookup tables.",
      "Storing all training data inside an SQL database.",
      "Running transformer models on microcontrollers."
    ],
    correctAnswer: 0,
    explanation: "JEPA architectures predict abstract representations (vectors) in latent space, focusing on understanding world dynamics rather than predicting raw surface-level tokens/pixels."
  }
];
