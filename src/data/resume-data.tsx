import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { ClevertechLogo } from "@/images/logos";

export const RESUME_DATA = {
  name: "Paras Sharma",
  initials: "PS",
  location: "Tokyo, Japan",
  locationLink: null,
  about: "Read, Write, Execute",
  summary:
    "Experienced in full-stack development, AI/ML and data science. I have led the product teams, developed apps and AI solutions for early detection of Autism and personalized therapy for children with special needs",
  avatarUrl: "paraz.png",
  personalWebsiteUrl: "https://paraz.in",
  contact: {
    email: "mail2paras.s@gmail.com",
    tel: "+91-7009105996",
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
      degree: "Bachelor's Degree in Computer Science and Engineering",
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
        "Full-stack AI engineer, specializing in building next generation of AI-driven Quality Assurance tools for software testing.",
    },
    {
      company: "Kidaura",
      link: "https://kidaura.in",
      badges: [],
      title: "Co-Founder - Tech",
      logo: null,
      start: "2019",
      end: null,
      description:
        "Building early identification and intervention platforms for therapists, clinics and parents of children with special needs.",
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
        "Fellow of the Japan-India Transformative Technology Network - 2023. The JITTN connects and empowers outstanding change-makers in India and Japan.",
    },
    {
      company: "Digital Impact Square, TCS Foundation",
      link: null,
      badges: ["Nashik"],
      title: "Innovator",
      logo: ClevertechLogo,
      start: "2019",
      end: "2020",
      description:
        "Joined a team working on neurodevelopmental disorder in children. My work involved building a data collection/analysis pipeline and research & development of the screening tool.",
    },
    {
      company: "Freelance",
      link: null,
      badges: ["Remote"],
      title: "Python, Data Science, ML",
      logo: ClevertechLogo,
      start: "2017",
      end: "2019",
      description:
        "Helped people, organizations with emerging technologies: Machine Learning, Data Science.",
    },
    {
      company: "Indian Institute of Science (IISc)",
      link: null,
      badges: ["Bangalore"],
      title: "CSA Undergraduate Summer School",
      logo: ClevertechLogo,
      start: "2017",
      end: "2017",
      description:
        "Attended summer school on the latest research and advancement happening in the field of computer science at Computer Science and Automation Dept, IISc.",
    },
  ],
  skills: [
    "Python",
    "JavaScript",
    "ReactJS",
    "NextJS",
    "Django",
    "TypeScript",
    "Flutter",
    "AWS",
    "MongoDB",
    "PostgreSQL",
    "Docker",
    "Kubernetes",
    "Project Management",
    "Machine Learning",
    "Data Science",
  ],
  projects: null,
} as const;
