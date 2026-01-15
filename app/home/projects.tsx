import Image from "next/image";
import Link from "next/link";

const projects: Project[] = [
  {
    title: "Golf Gooder",
    subtitle: "UI • Backend • Firebase",
    description:
      "Track rounds, stats, and strategy. Advanced hole & club analytics with a clean, fun UX.",
    href: "../../public/gg.png",
    imageSrc: "/images/projects/gg.png",
    
  },
  {
    title: "Computer Vision Screenshot Detector",
    subtitle: "CV • ONNX/TFLite",
    description:
      "Detect junk screenshots and help users delete clutter fast with a simple scan + review flow.",
    href: "https://your-link.com",
    imageSrc: "/images/projects/cvsd.png",
    
  },
  {
    title: "Photo Journal",
    subtitle: "Flutter • Firebase",
    description:
      "A photo-first journal with tags, mood, and highlights—built for quick capture and reflection.",
    href: "https://your-link.com",
    imageSrc: "/images/projects/photojournal.png",
    
  },
  {
    title: "Algo Trader",
    subtitle: "Python • APIs",
    description:
      "Backtesting + execution tooling with risk controls and a simple dashboard for strategies.",
    href: "https://your-link.com",
    imageSrc: "/images/projects/algotrader.png",
    
  },
];

export default function ProjectsList() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-semibold tracking-tight">Projects</h1>
      <p className="mt-2 text-slate-600">
        A few things I’ve built recently.
      </p>

      <div className="mt-8 flex flex-col gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.title} project={p} reverse={i % 2 === 1} />
        ))}
      </div>
    </main>
  );
}

export type Project = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  imageSrc: string; // put these in /public/images/projects/...
  
};

export function ProjectCard({
  project,
  reverse = false,
}: {
  project: Project;
  reverse?: boolean;
}) {
  const { title, subtitle, description, href, imageSrc } = project;

  return (
    <section
      className={[
        "relative overflow-hidden rounded-3xl border border-slate-200 shadow-sm",
   
      ].join(" ")}
    >
    
      <div
        className={[
          "grid items-stretch md:grid-cols-2",
          reverse ? "md:[&>div:first-child]:order-2" : "",
        ].join(" ")}
      >
        {/* Text side */}
        <div className="flex flex-col justify-center gap-3 p-6 md:p-8">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
            {subtitle ? (
              <p className="mt-1 text-sm font-medium text-slate-600">{subtitle}</p>
            ) : null}
          </div>

          <p className="text-slate-700 leading-relaxed">{description}</p>

          <div className="pt-2">
            <Link
              href={href}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800 active:bg-slate-950"
            >
              Visit link →
            </Link>
          </div>
        </div>

        {/* Image side */}
        <div className="relative">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={imageSrc}
              alt={`${title} preview`}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority={false}
            />
          </div>
        </div>
      </div>
    </section>
  );
}