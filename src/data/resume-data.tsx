import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Paras Sharma",
  initials: "PS",
  location: "Tokyo, Japan",
  locationLink: null,
  about: "Read, Write, Execute",
  summary:
    "Software engineer with 6+ years of experience across full-stack development, AI/ML, and data science. Experienced in leading technical architecture and delivering AI-driven products end-to-end. At Autify, works on AI-powered Quality Assurance platforms, including LLM-based test generation, AI-native workflow design, and cross-platform desktop applications. Previously developed impactful AI solutions such as early autism detection and personalized therapy systems.",
  avatarUrl: "paraz.png",
  personalWebsiteUrl: "https://paraz.in",
  contact: {
    email: "mail2paras.s@gmail.com",
    tel: "+81-90-5040-8148",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/Parassharmaa",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "https://www.linkedin.com/in/parasharma/",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/int2float",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Guru Nanak Dev University",
      degree:
        "Bachelor's Degree in Computer Science and Engineering",
      start: "2015",
      end: "2019",
    },
  ],
  work: [
    {
      company: "Autify",
      link: "https://autify.com",
      badges: ["Tokyo"],
      title: "Senior Software Engineer",
      logo: null,
      start: "2024",
      end: null,
      description:
        "Working on AI-driven Quality Assurance tools. Developed multi-environment desktop app using Electron, TypeScript and React. Built integrations with Atlassian, Jira, and Figma. Implemented Computer/Mobile Use agents using Vision Language Models. Technical lead for Genesis, building product architecture and AI-native workflows.",
    },
    {
      company: "Kidaura",
      link: "https://kidaura.in",
      badges: [],
      title: "Director & Co-Founder (Technology)",
      logo: null,
      start: "2019",
      end: "2024",
      description:
        "Managed product team for a special needs intervention platform. Implemented NextJS project with Apollo GraphQL, Express, and MongoDB. Created data analytics pipeline using Python, RabbitMQ, and PyTorch for game-based Autism screening (86% sensitivity). Developed GenAI-based curriculum creation and recommendation system.",
    },
    {
      company: "Salzburg Global Seminar",
      link: "https://www.salzburgglobal.org/people?userID=44668&viewType=1&cHash=0acf66255d70bad82364f9a8cf975cb7",
      badges: [],
      title: "Fellow",
      logo: null,
      start: "2023",
      end: null,
      description:
        "Fellow of the Japan-India Transformative Technology Network - 2023. Connects and empowers outstanding change-makers in India and Japan.",
    },
    {
      company: "Freelance",
      link: null,
      badges: ["Remote"],
      title: "Data, ML, Python",
      logo: null,
      start: "2017",
      end: "2020",
      description:
        "Implemented API servers in Django Rest Framework with ReactJS. Worked on Python, AI/ML related projects. Assisted in quick prototyping and feature validation.",
    },
  ],
  skills: [
    { name: "Python", category: "language" },
    { name: "TypeScript", category: "language" },
    { name: "JavaScript", category: "language" },
    { name: "Rust", category: "language" },
    { name: "GoLang", category: "language" },
    { name: "ReactJS", category: "framework" },
    { name: "NextJS", category: "framework" },
    { name: "Django", category: "framework" },
    { name: "Flutter", category: "framework" },
    { name: "AWS", category: "tools" },
    { name: "MongoDB", category: "tools" },
    { name: "PostgreSQL", category: "tools" },
    { name: "Docker", category: "tools" },
    { name: "Kubernetes", category: "tools" },
    { name: "Machine Learning", category: "ai" },
    { name: "AI Agents", category: "ai" },
    { name: "LLMs", category: "ai" },
    { name: "Data Science", category: "ai" },
    { name: "Project Management", category: "tools" },
  ] as const,
  research: [
    {
      title: "WhisperGate",
      fullTitle: "WhisperGate: Silence-Aware Gating for Hallucination-Free Speech Recognition with Frozen Whisper",
      description:
        "A lightweight trainable gate module (~12K parameters) that sits between Whisper's frozen encoder and decoder, learning to classify each encoder frame as speech or non-speech. Eliminates 100% of hallucinations on silence and noise inputs while preserving clean-speech word error rate.",
      year: "2026",
      tags: ["ASR", "Whisper", "Hallucination", "Gating"],
      links: {
        paper: "https://github.com/Parassharmaa/whisper-gate/blob/main/paper/main.pdf",
        code: "https://github.com/Parassharmaa/whisper-gate",
      },
    },
    {
      title: "Pulse-Driven Neural Architecture (PDNA)",
      fullTitle: "Pulse-Driven Neural Architecture: Learnable Oscillatory Dynamics for Robust Continuous-Time Sequence Processing",
      description:
        "Introduces structured oscillatory dynamics into continuous-time neural networks. A pulse module injects learnable sinusoidal perturbations that improve temporal gap robustness on sequential tasks, with self-attention for inter-dimensional coordination.",
      year: "2026",
      tags: ["Neural ODE", "Oscillations", "CfC", "Sequence Modeling"],
      links: {
        paper: "https://github.com/Parassharmaa/pdna/blob/main/paper/main.pdf",
        code: "https://github.com/Parassharmaa/pdna",
      },
    },
  ],
  projects: [
    {
      title: "Turtle",
      techStack: ["VLM", "CNC", "Android", "Mobile Use Agent"],
      description:
        "AI-powered device control system combining Android automation with physical CNC tool head integration for Mobile Use Agent.",
      link: { href: "https://github.com/Parassharmaa/project-turtle" },
    },
    {
      title: "CoWrite",
      techStack: ["Rust", "Tauri", "Local LLMs", "macOS"],
      description:
        "Desktop-based AI writing assistant leveraging local LLMs and modern Rust-based tooling. Focused on performance, offline usability, and macOS global key integration.",
      link: { href: "https://github.com/Parassharmaa/cowrite" },
    },
    {
      title: "Video Assessment for Behavioral Conditions",
      techStack: ["Gemini", "Multimodal AI", "Iceberg Model"],
      description:
        "AI-driven system to analyze video data for behavioral traits using the Iceberg Model and Google Gemini multimodal models.",
    },
    {
      title: "Phil AI: AI Cursor",
      techStack: ["Chrome Extension", "LLMs", "Web Automation"],
      description:
        "Chrome extension that integrates with LLMs to understand web page content and perform tasks autonomously — form filling, navigation, and interaction.",
      link: { href: "https://github.com/Parassharmaa/phil-ai" },
    },
    {
      title: "agent-fetch",
      techStack: ["Rust", "npm", "Security", "AI Agents", "HTTP Client"],
      description:
        "Sandboxed HTTP client with SSRF protection for AI agents. Prevents DNS rebinding, blocks private IPs, and validates every connection — available as a Rust crate and npm package.",
      link: { href: "https://github.com/Parassharmaa/agent-fetch" },
    },
    {
      title: "agent-sandbox",
      techStack: ["WASM", "WASI", "Sandbox", "AI Agents"],
      description:
        "A sandboxed execution environment for AI agents via WASM.",
      link: { href: "https://github.com/Parassharmaa/agent-sandbox" },
    },
  ],
} as const;
