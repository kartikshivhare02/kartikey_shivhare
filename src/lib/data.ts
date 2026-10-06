export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  role: string;
  email: string;
  phone: string;
  phoneHref: string;
  location: string;
  resumeSummary: string;
  github: string;
  linkedin: string;
  leetcode: string;
  resumePath: string;
  validTill: string;
  dept: string;
  idNo: string;
  quote: string;
  whatIAm: string[];
  references: {
    name: string;
    title: string;
    email: string;
  }[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface SkillItem {
  atomicNumber: number;
  symbol: string;
  name: string;
  family: 'Languages' | 'Data Analysis' | 'Data Visualization' | 'Machine Learning & AI' | 'Databases' | 'Tools & Concepts';
  isBrand: boolean;
  logoKey: string;
  projectsUsed: string[];
}

export interface ProjectItem {
  id: string;
  index: string;
  title: string;
  kicker: string;
  description: string;
  features: string[];
  tech: string[];
  github: string | null;
  liveUrl?: string;
  uiType: 'legal-ai' | 'dashboard' | 'ecommerce';
}

export interface ExperienceItem {
  id: string;
  type: 'education' | 'experience';
  year: string;
  title: string;
  organization: string;
  location?: string;
  detail: string;
  metrics?: string;
  isCurrent?: boolean;
}

export interface AchievementItem {
  id: string;
  index: string;
  platform: string;
  platformLogo: string;
  label: string;
  caption: string;
  detail: string;
  bigNumber: number;
  numberPrefix?: string;
  numberSuffix?: string;
  brandColor: string;
}

export const PROFILE: Profile = {
  name: "Kartikey Shivhare",
  firstName: "Kartikey",
  lastName: "Shivhare",
  initials: "KS",
  role: "Data Science & AI Developer",
  email: "shivhares747@gmail.com",
  phone: "(+91) 6264260072",
  phoneHref: "tel:+916264260072",
  location: "403, Shilputri Pride, Rau, Indore (M.P) 453331",
  resumeSummary: "Motivated B.Tech Computer Science (Data Science) student seeking an entry-level opportunity in Data Science or Data Analytics. Skilled in Python, SQL, data analysis, visualization, and machine learning, with hands-on experience through academic and client projects. Looking to apply my technical and problem-solving skills while learning and growing in a professional environment.",
  github: "https://github.com/kartikshivhare02",
  linkedin: "https://www.linkedin.com/in/kartikey-shivhare-572636247",
  leetcode: "https://leetcode.com/u/ujpXdsC36v/",
  resumePath: "/resume.pdf",
  validTill: "2027",
  dept: "CS — Data Science",
  idNo: "KS-2023-2027",
  quote: "Applying technical rigor and data-driven insights to build intelligent, practical web and AI solutions.",
  whatIAm: [
    "B.Tech Computer Science (Data Science) student at Acropolis Institute (2023–2027).",
    "Self-employed Web & AI Solutions developer delivering production applications for clients.",
    "Skilled in Python, SQL, Machine Learning, NLP, Data Analysis & Visualization.",
    "Built AI-Driven Legal Research Engine & Real-Time Student Engagement Dashboard.",
    "Promotional Head for Tech-o-Utsav 2025 & Technical Lead managing coding competitions."
  ],
  references: [
    {
      name: "Mr. Atul Bharat",
      title: "Group Director-CDC, Acropolis Group of Institutions",
      email: "atul@acropolis.in"
    },
    {
      name: "Dr. Prashant Lakkadwala",
      title: "Head of Department IT, Acropolis Institute of Tech & Research",
      email: "prashantlakkadwala.atc@acropolis.in"
    }
  ]
};

export const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" }
];

export const SKILL_GROUPS = [
  "All",
  "Languages",
  "Data Analysis",
  "Data Visualization",
  "Machine Learning & AI",
  "Databases",
  "Tools & Concepts"
] as const;

export const SKILLS: SkillItem[] = [
  { atomicNumber: 1, symbol: "Py", name: "Python", family: "Languages", isBrand: true, logoKey: "python", projectsUsed: ["AI-Driven Research Engine", "Student Engagement Dashboard"] },
  { atomicNumber: 2, symbol: "Sq", name: "SQL", family: "Languages", isBrand: true, logoKey: "mysql", projectsUsed: ["Student Engagement Dashboard", "E-Commerce Websites"] },
  { atomicNumber: 3, symbol: "C", name: "C", family: "Languages", isBrand: true, logoKey: "c", projectsUsed: ["Academic Problem Solving"] },
  { atomicNumber: 4, symbol: "C+", name: "C++", family: "Languages", isBrand: true, logoKey: "cplusplus", projectsUsed: ["Campus Technical Competitions"] },
  { atomicNumber: 5, symbol: "Pd", name: "Pandas", family: "Data Analysis", isBrand: true, logoKey: "pandas", projectsUsed: ["Student Engagement Dashboard", "AI Research Engine"] },
  { atomicNumber: 6, symbol: "Np", name: "NumPy", family: "Data Analysis", isBrand: true, logoKey: "numpy", projectsUsed: ["Student Engagement Dashboard", "AI Research Engine"] },
  { atomicNumber: 7, symbol: "Dc", name: "Data Cleaning", family: "Data Analysis", isBrand: false, logoKey: "concept-data", projectsUsed: ["Student Engagement Dashboard"] },
  { atomicNumber: 8, symbol: "Ed", name: "EDA", family: "Data Analysis", isBrand: false, logoKey: "concept-eda", projectsUsed: ["Student Engagement Dashboard"] },
  { atomicNumber: 9, symbol: "Bi", name: "Power BI", family: "Data Visualization", isBrand: true, logoKey: "powerbi", projectsUsed: ["Student Engagement Dashboard"] },
  { atomicNumber: 10, symbol: "Xl", name: "Excel", family: "Data Visualization", isBrand: true, logoKey: "excel", projectsUsed: ["Student Engagement Dashboard"] },
  { atomicNumber: 11, symbol: "Ml", name: "Machine Learning", family: "Machine Learning & AI", isBrand: false, logoKey: "concept-ml", projectsUsed: ["AI-Driven Research Engine"] },
  { atomicNumber: 12, symbol: "Dl", name: "Deep Learning", family: "Machine Learning & AI", isBrand: false, logoKey: "concept-dl", projectsUsed: ["AI-Driven Research Engine"] },
  { atomicNumber: 13, symbol: "Nl", name: "NLP", family: "Machine Learning & AI", isBrand: false, logoKey: "concept-nlp", projectsUsed: ["AI-Driven Research Engine"] },
  { atomicNumber: 14, symbol: "Cl", name: "Claude", family: "Machine Learning & AI", isBrand: true, logoKey: "claude", projectsUsed: ["AI Web Solutions"] },
  { atomicNumber: 15, symbol: "Ge", name: "Gemini", family: "Machine Learning & AI", isBrand: true, logoKey: "gemini", projectsUsed: ["AI Web Solutions"] },
  { atomicNumber: 16, symbol: "Gpt", name: "ChatGPT", family: "Machine Learning & AI", isBrand: true, logoKey: "openai", projectsUsed: ["AI Web Solutions"] },
  { atomicNumber: 17, symbol: "My", name: "MySQL", family: "Databases", isBrand: true, logoKey: "mysql", projectsUsed: ["E-Commerce Websites", "Engagement Dashboard"] },
  { atomicNumber: 18, symbol: "Mg", name: "MongoDB", family: "Databases", isBrand: true, logoKey: "mongodb", projectsUsed: ["AI Web Solutions"] },
  { atomicNumber: 19, symbol: "Gt", name: "Git & GitHub", family: "Tools & Concepts", isBrand: true, logoKey: "git", projectsUsed: ["All Projects"] },
  { atomicNumber: 20, symbol: "Jp", name: "Jupyter Notebook", family: "Tools & Concepts", isBrand: true, logoKey: "jupyter", projectsUsed: ["AI-Driven Research Engine", "Data Analysis"] }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "legal-ai",
    index: "01",
    title: "AI-Driven Research Engine for Commercial Court",
    kicker: "AI & Legal Information Retrieval",
    description: "Developed an AI-driven research system focused on retrieving and analyzing commercial-court information. Applied programming and AI concepts to organize and process information efficiently.",
    features: [
      "Targeted commercial court case-law information retrieval",
      "Automated document processing & NLP semantic parsing",
      "Structured information organization for legal workflows",
      "Optimized search querying for fast case referencing"
    ],
    tech: ["Python", "NLP", "Machine Learning", "Deep Learning", "Pandas"],
    github: null,
    uiType: "legal-ai"
  },
  {
    id: "engagement-dashboard",
    index: "02",
    title: "Real-Time Student Engagement Monitoring Dashboard",
    kicker: "EdTech Data Analytics",
    description: "Developed a real-time dashboard for monitoring student engagement. Designed data-driven visualizations to make engagement information easier to analyze and act upon.",
    features: [
      "Real-time student participation tracking & analytics",
      "Data-driven interactive charts with Power BI & Python",
      "Automated data cleaning & EDA processing pipeline",
      "Intuitive dashboard UI for educational coordinators"
    ],
    tech: ["Python", "Power BI", "SQL", "Pandas", "NumPy", "Excel"],
    github: null,
    uiType: "dashboard"
  },
  {
    id: "ecommerce-solutions",
    index: "03",
    title: "Production E-Commerce Web Solutions",
    kicker: "Web & AI Client Delivery",
    description: "Built and delivered production-oriented websites including angelixbysuraj.shop and vrindavangroupindore.com. Worked on client requirements, custom development, and full end-to-end delivery.",
    features: [
      "Custom production web development for client brands",
      "Delivered active web portals angelixbysuraj.shop & vrindavangroupindore.com",
      "Client requirements gathering & rapid deployment",
      "Integrated database & user-centric interface design"
    ],
    tech: ["Web Development", "MySQL", "MongoDB", "AI Tools"],
    github: null,
    liveUrl: "https://www.angelixbysuraj.shop",
    uiType: "ecommerce"
  }
];

export const TIMELINE: ExperienceItem[] = [
  {
    id: "exp-self",
    type: "experience",
    year: "Aug 2026 — Present",
    title: "Self-Employed — Web & AI Solutions",
    organization: "Client Projects & Independent Development",
    detail: "Build and deliver websites, automation solutions, and AI-powered web applications for clients. Translate client requirements into practical technology solutions with hands-on project delivery.",
    isCurrent: true
  },
  {
    id: "edu-btech",
    type: "education",
    year: "2023 — 2027",
    title: "B.Tech in Computer Science (Data Science)",
    organization: "Acropolis Institute of Technology and Research, Indore",
    location: "Affiliated to RGPV Bhopal",
    detail: "Pursuing specialized degree in Data Science and Artificial Intelligence. Average CGPA: 5.35 / 10.",
    metrics: "Average CGPA 5.35"
  },
  {
    id: "act-lead",
    type: "experience",
    year: "2025",
    title: "Promotional Head & Technical Lead",
    organization: "Tech-o-Utsav 2025 & Campus Tech Club",
    detail: "Led campus-wide marketing campaigns for Tech-o-Utsav 2025. Managed coding competitions and campus club tech events, designing problem statements and judging logic."
  },
  {
    id: "act-cricket",
    type: "experience",
    year: "2024 — 2025",
    title: "Captain — Inter-Department Cricket Team",
    organization: "Acropolis Athletics",
    detail: "Directed match strategy, team coordination, and structured training sessions across department sports tournaments."
  },
  {
    id: "edu-hsc",
    type: "education",
    year: "2022",
    title: "HSC (Class XII — Higher Secondary)",
    organization: "Corolla Public School (M.P.)",
    detail: "Completed Higher Secondary Certificate with distinction score.",
    metrics: "90.40%"
  },
  {
    id: "edu-ssc",
    type: "education",
    year: "2020",
    title: "SSC (Class X — Secondary)",
    organization: "Corolla Public School (M.P.)",
    detail: "Completed Secondary School Certificate with top academic honors.",
    metrics: "95.33%"
  }
];

export const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: "ach-ssc",
    index: "01 / 04",
    platform: "Secondary School Certificate",
    platformLogo: "geeksforgeeks.svg",
    label: "Class X Academic Honor",
    caption: "Corolla Public School (MP)",
    detail: "Secured top academic score of 95.33% in 2020 examination.",
    bigNumber: 95,
    numberSuffix: "%",
    brandColor: "rgba(47, 138, 95, 0.15)"
  },
  {
    id: "ach-hsc",
    index: "02 / 04",
    platform: "Higher Secondary Certificate",
    platformLogo: "leetcode.svg",
    label: "Class XII Distinction",
    caption: "Corolla Public School (MP)",
    detail: "Achieved 90.40% in Higher Secondary 2022 examinations.",
    bigNumber: 90,
    numberSuffix: "%",
    brandColor: "rgba(255, 161, 22, 0.15)"
  },
  {
    id: "ach-tech",
    index: "03 / 04",
    platform: "Tech-o-Utsav 2025",
    platformLogo: "hackerrank.svg",
    label: "Promotional Head & Marketing Lead",
    caption: "Acropolis Institute",
    detail: "Spearheaded campus-wide promotional campaigns driving major participant turnout.",
    bigNumber: 2025,
    numberPrefix: "'",
    brandColor: "rgba(46, 204, 113, 0.15)"
  },
  {
    id: "ach-techlead",
    index: "04 / 04",
    platform: "Campus Technical Lead",
    platformLogo: "codechef.svg",
    label: "Technical Events & Judging Logic",
    caption: "Campus Club Events",
    detail: "Designed competitive problem statements, test cases, and evaluation logic for coding contests.",
    bigNumber: 100,
    numberSuffix: "+",
    brandColor: "rgba(91, 107, 246, 0.15)"
  }
];
