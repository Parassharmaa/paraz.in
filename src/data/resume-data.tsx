import {
  AmbitLogo,
  BarepapersLogo,
  BimLogo,
  CDGOLogo,
  ClevertechLogo,
  ConsultlyLogo,
  EvercastLogo,
  Howdy,
  JarockiMeLogo,
  JojoMobileLogo,
  Minimal,
  MobileVikingsLogo,
  MonitoLogo,
  NSNLogo,
  ParabolLogo,
  TastyCloudLogo,
  YearProgressLogo,
} from "@/images/logos";
import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

export const RESUME_DATA = {
  name: "Paras Sharma",
  initials: "PS",
  location: "India",
  locationLink: null,
  about: "Harnessing Tech to Meet Needs and Transform Lives",
  summary:
    "Experienced in full-stack development, AI/ML and data science. I have led the product teams, developed apps and AI solutions for early detection of Autism and personalized therapy for children with special needs",
  avatarUrl:
    "https://media.licdn.com/dms/image/D4D03AQHg524Ox_r7fg/profile-displayphoto-shrink_400_400/0/1668424441307?e=1725494400&v=beta&t=_j4evs-Y_WDLSiIrAH83tu9D3XAnXB8w6QtZrU1MSUA",
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
