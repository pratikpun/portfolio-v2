import Link from "next/link";
import { getFeaturedProjects } from "@/lib/content";
import ProjectCard from "@/components/projects/ProjectCard";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/motion/FadeIn";

export default function Projects() {
  const { projects } = getFeaturedProjects();

  return (
    <section className="py-16 md:py-24">
      <FadeIn>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Featured Projects
          </h2>
          <Link href="/projects">
            <Button variant="ghost" size="sm">
              View All
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 ml-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Button>
          </Link>
        </div>
      </FadeIn>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.slice(0, 3).map((project, index) => (
          <FadeIn key={project.id} delay={0.1 * index} className="h-full">
            <ProjectCard project={project} showImage={false} />
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
