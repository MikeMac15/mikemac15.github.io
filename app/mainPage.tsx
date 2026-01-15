import { Anchor, Briefcase, GraduationCap, Goal, Github, Linkedin, Mail, MapPin, Download, Terminal, Brain, Code2, Database, Cloud, Smartphone, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
// Brand Icons (React Icons - Simple Icons pack)
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiJavascript, SiVuedotjs,
  SiNodedotjs, SiPython, SiPostgresql, SiFirebase, SiMongodb, SiRedis,
  SiGooglecloud, SiMicrostrategy, SiAmazon, SiDocker, SiGithubactions, SiTerraform,
  SiFlutter, SiAndroid, SiPwa,
  SiCplusplus, SiC  , SiGo, SiDart,
  // New Data/ML Icons:
  SiNumpy, SiPandas, SiPytorch, SiTensorflow, SiScikitlearn, SiOpencv,
  SiIos
} from 'react-icons/si';


export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <ProjectsList />
      <Skills />
      <Experience /> {/* Add this here */}
    </main>
  );
}




function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-10 md:pt-32 md:pb-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col gap-6 md:items-start">
          
          {/* Badge / Status */}
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Open to Work
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Building resilient software with <br className="hidden md:block" />
            <span className="text-blue-600">mission-critical discipline.</span>
          </h1>

          {/* Sub-headline */}
          <p className="max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
            I’m <strong>Michael McIntosh</strong>, a Full-Stack Engineer and U.S. Navy Veteran. 
            I combine operational excellence with modern AI and mobile architecture to ship 
            secure, scalable applications.
          </p>

          {/* Location & Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              Issaquah, WA
            </div>
            
            {/* Socials */}
            <div className="flex items-center gap-4">
              <Link href="https://github.com/yourusername" target="_blank" className="hover:text-blue-600 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com/in/yourusername" target="_blank" className="hover:text-blue-600 transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="mailto:michaeldmc58@gmail.com" className="hover:text-blue-600 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-4 flex flex-wrap gap-4">
            <Link
              href="#projects" // anchors to your projects section
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              View My Work
            </Link>
            
            <a
              href="/Michael_McIntosh_SDE.pdf" 
              target="_blank"
              className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}






const projects: Project[] = [
  {
    title: "Golf Gooder",
    tags: ["Flutter", "Firebase", "RevenueCat", "GCP"],
    description:
      "A production-grade cross-platform app featuring real-time multiplayer scoring and GPS context. Implemented atomic transactions for data integrity and RevenueCat for subscription management.",
    href: "https://apps.apple.com/us/app/golf-gooder", // Placeholder
    github: "https://github.com/yourusername/golf-gooder", // Placeholder
    imageSrc: "/images/projects/gg.png",
  },
  {
    title: "Photo Journal",
    tags: ["Flutter", "Clean Architecture", "EXIF Data"],
    description:
      "Built a resilient offline-first journal using the Repository pattern. Features complex Firestore composite indexes for sub-second filtering and automatic EXIF metadata extraction.",
    href: "https://your-link.com",
    github: "https://github.com/MikeMac15/flutter_journal",
    imageSrc: "/images/projects/photojournal.png",
  },
  {
    title: "Screenshot Cleaner AI",
    tags: ["Python", "PyTorch", "ONNX Runtime", "MobileNetV3"],
    description:
      "Engineered a custom edge-AI solution to detect screenshots locally on-device. Optimized MobileNetV3 for mobile inference, ensuring 0ms latency and total user privacy without cloud API calls.",
    href: "https://your-link.com",
    github: "https://github.com/MikeMac15/Junk_Photo_Cleanser_CVSD",
    imageSrc: "/images/projects/cvsd.png",
  },
  {
    title: "Algorithmic Trader",
    tags: ["Python", "Alpaca API", "Pandas", "Docker"],
    description:
      "Automated trading bot featuring backtesting engines and risk-management controls. Processes financial data streams to execute strategies with minimized latency.",
    href: "https://your-link.com",
    imageSrc: "/images/projects/algotrader.png",
  },
];

function ProjectsList() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-4 py-20">
      <div className="mb-12 md:text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Featured Projects
        </h2>
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          From full-stack mobile applications to computer vision models. 
          Here is a selection of my recent technical work.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

export type Project = {
  title: string;
  tags: string[];
  description: string;
  href: string;
  github?: string;
  imageSrc: string;
};

export function ProjectCard({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const { title, tags, description, href, github, imageSrc } = project;

  return (
    <div
      className={[
        "group relative grid items-center gap-8 overflow-hidden rounded-3xl border border-slate-200 bg-white p-2 shadow-sm transition-all hover:shadow-md md:grid-cols-2 md:gap-12 md:p-2",
        // This reverses the order on desktop only
        reverse ? "md:[&>div:first-child]:order-2" : "",
      ].join(" ")}
    >
      {/* Image Side */}
      <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 md:aspect-[4/3] lg:aspect-[16/10]">
        <Image
          src={imageSrc}
          alt={`${title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(min-width: 768px) 50vw, 100vw"
          priority={false}
        />
        {/* Overlay gradient for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>

      {/* Content Side */}
      <div className="flex flex-col justify-center gap-6 p-6 md:p-8">
        <div>
          <h3 className="text-3xl font-bold text-slate-900">{title}</h3>
          
          {/* Tech Stack Badges */}
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-600/10"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <p className="text-base leading-relaxed text-slate-600">{description}</p>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          {/* Main "Visit" Button */}
          <Link
            href={href}
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-slate-700 hover:gap-3"
          >
            Live Demo
            <ExternalLink className="h-4 w-4" />
          </Link>

          {/* Secondary "Code" Button - critical for engineers */}
          {github && (
            <Link
              href={github}
              target="_blank"
              className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              <Github className="h-4 w-4" />
              Source Code
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}




const skillCategories = [
  {
    title: "Languages", 
    icon: <Terminal className="w-6 h-6 text-white" />,
    color: "bg-indigo-500",
    skills: [
      { name: "Python", icon: SiPython },
      { name: "C++", icon: SiCplusplus },
      { name: "C#", icon: SiC  }, // Corrected Icon
      { name: "Go", icon: SiGo },
      { name: "Dart", icon: SiDart },
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
    ],
  },
  {
    title: "Data & Machine Learning", // Replaced UI/UX
    icon: <Brain className="w-6 h-6 text-white" />,
    color: "bg-orange-500", // Kept orange, fits PyTorch/TF well
    skills: [
      { name: "NumPy", icon: SiNumpy },
      { name: "Pandas", icon: SiPandas },
      { name: "PyTorch", icon: SiPytorch },
      { name: "TensorFlow", icon: SiTensorflow },
      { name: "Scikit-Learn", icon: SiScikitlearn },
      { name: "OpenCV", icon: SiOpencv },
    ],
  },
  {
    title: "Frontend Frameworks", 
    icon: <Code2 className="w-6 h-6 text-white" />,
    color: "bg-blue-500",
    skills: [
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Vue.js", icon: SiVuedotjs },
    ],
  },
  {
    title: "Backend & DB",
    icon: <Database className="w-6 h-6 text-white" />,
    color: "bg-emerald-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "Firebase", icon: SiFirebase },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis },
    ],
  },
  {
    title: "Cloud & DevOps", // Renamed slightly for clarity
    icon: <Cloud className="w-6 h-6 text-white" />,
    color: "bg-purple-500",
    skills: [
      { name: "GCP", icon: SiGooglecloud },
      { name: "Azure", icon: SiMicrostrategy }, // Corrected Icon
      { name: "AWS", icon: SiAmazon }, // Corrected Icon
      { name: "Docker", icon: SiDocker },
      { name: "CI/CD", icon: SiGithubactions },
    ],
  },
  {
    title: "Mobile Development",
    icon: <Smartphone className="w-6 h-6 text-white" />,
    color: "bg-rose-500",
    skills: [
      { name: "Flutter", icon: SiFlutter },
      { name: "React Native", icon: SiReact },
      { name: "Android", icon: SiAndroid },
        { name: "iOS", icon: SiIos },
        ],
  },
];

function Skills() {
  return (
    <section className="relative w-full py-20 overflow-hidden">
      {/* Grid Background Pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_800px_at_100%_200px,#d5c5ff,transparent)]"></div>
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold text-slate-900">Skills & Expertise</h2>
          <p className="mt-4 text-lg text-slate-600">
            Crafting solutions with precision and passion across the full stack.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md"
            >
              <div className="mb-6 flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${category.color} shadow-sm`}
                >
                  {category.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-800">
                  {category.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600 transition-colors group-hover:bg-slate-200 group-hover:text-slate-900"
                  >
                    <skill.icon className="h-4 w-4" /> 
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}





const timeline = [
{
    year: "2025 - Present",
    title: "Founder & Lead Developer",

    company: "Golf Gooder LLC",
    description: "Spearheading the development of Golf Gooder, an innovative app designed to enhance the golfing experience through real-time analytics and social features. Created a seamless user interface and robust backend / cloud infrastructure.",
    icon: <Goal className="h-5 w-5 text-white" />,
    color: "bg-green-600",
},
  {
    year: "2025",
    title: "B.S. Software Engineering (AI/ML)",
    company: "Bellevue College",
    description: "Concentration in Machine Learning and Artificial Intelligence integration.",
    icon: <GraduationCap className="h-5 w-5 text-white" />,
    color: "bg-blue-600",
  },
  {
    year: "2025",
    title: "Computer Vision Screenshot Detector",
    company: "Personal Project",
    description: "Developed a computer vision application using Python and OpenCV to automatically detect and classify screenshots from various applications. Implemented machine learning algorithms to improve detection accuracy and performance.",
    icon: <Briefcase className="h-5 w-5 text-white" />,
    color: "bg-red-600",
  },
  {
    year: "2025",
    title: "TutorMe AI",
    company: "Personal Project",
    description: "Developed an AI-powered tutoring platform using Next.js and Python. Integrated natural language processing to provide personalized learning experiences and real-time assistance for students across various subjects.",
    icon: <Briefcase className="h-5 w-5 text-white" />,
    color: "bg-yellow-600",
  },
  {
      year: "2024",
      title: "Cloud Application Developer",
      company: "Microsoft Software & Systems Academy (MSSA)",
      description: "Intensive 18-week training on Azure cloud architecture and full-stack development. Top-tier rigorous technical program for veterans.",
      icon: <Briefcase className="h-5 w-5 text-white" />,
      color: "bg-blue-500",
    },
    {
      year: "2024",
      title: "Photo Journal App",
      company: "Personal Project",
      description: "Developed a cross-platform journal application using Flutter, enabling users to securely document their thoughts and experiences. Implemented features such as cloud synchronization, rich text editing, and multimedia support.",
      icon: <Briefcase className="h-5 w-5 text-white" />,
      color: "bg-purple-600",
    },
  {
    year: "2023",
    title: "Full-Stack Developer",
    company: "Code Platoon",
    description: "Completed a 17-week immersive coding bootcamp focused on full-stack web development. Gained hands-on experience with JavaScript, React, Node.js, Django, Python and database management through real-world projects.",
    icon: <Briefcase className="h-5 w-5 text-white" />,
    color: "bg-indigo-500",
  },
  {
    year: "2015 - 2019",
    title: "Hospital Corpsman",
    company: "United States Navy",
    description: "Provided emergency medical care and managed health records. Developed 'mission-first' discipline, attention to detail, and ability to perform under high pressure.",
    icon: <Anchor className="h-5 w-5 text-white" />,
    color: "bg-slate-700",
  },
];

function Experience() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="mx-auto max-w-4xl px-4">
        <h2 className="mb-12 text-center text-3xl font-bold text-slate-900">
          Journey & Education
        </h2>

        <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:h-full before:w-0.5 before:-translate-x-px before:bg-slate-200 md:before:mx-auto md:before:translate-x-0">
          {timeline.map((item, index) => (
            <div
              key={index}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group"
            >
              {/* Icon Bubble */}
              <div
                className={`absolute left-0 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-white shadow ${item.color} md:order-1 md:left-1/2 md:-translate-x-1/2`}
              >
                {item.icon}
              </div>

              {/* Card */}
              <div className="ml-16 w-full rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:shadow-md md:w-[calc(50%-2.5rem)] md:ml-0">
                <div className="flex items-center justify-between mb-2">
                   <span className="font-bold text-slate-900">{item.title}</span>
                   <time className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    {item.year}
                  </time>
                </div>
                <div className="text-sm font-medium text-blue-600 mb-2">{item.company}</div>
                <p className="text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-12">
      <div className="mx-auto max-w-5xl px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Brand / Copyright */}
        <div className="text-center md:text-left">
          <span className="text-lg font-bold text-slate-900">Michael McIntosh</span>
          <p className="mt-2 text-sm text-slate-500">
            © {new Date().getFullYear()} Built with Next.js, Tailwind, & Flutter.
          </p>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-slate-900 group-hover:text-white">
              <Github className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-slate-500">GitHub</span>
          </Link>

          <Link
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
              <Linkedin className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-slate-500">LinkedIn</span>
          </Link>

          <Link
            href="mailto:michaeldmc58@gmail.com"
            className="group flex flex-col items-center gap-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
              <Mail className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-slate-500">Email</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}