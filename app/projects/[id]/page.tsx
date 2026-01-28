import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProjects } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import PageTransition from "@/components/motion/PageTransition";
import FadeIn from "@/components/motion/FadeIn";

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const { projects } = getProjects();
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
  const { id } = await params;
  const { projects } = getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const { projects } = getProjects();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <PageTransition>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-16 md:py-24">
        <FadeIn>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back to Projects
          </Link>
        </FadeIn>

        <FadeIn delay={0.1}>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {project.title}
          </h1>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>
        </FadeIn>

        {project.image && (
          <FadeIn delay={0.2}>
            <div className="aspect-video bg-muted relative overflow-hidden rounded-lg mb-8">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </FadeIn>
        )}

        <FadeIn delay={0.25}>
          <div className="prose prose-neutral dark:prose-invert max-w-none mb-8">
            <p className="text-lg text-muted-foreground">
              {project.longDescription || project.description}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.3}>
          <div className="flex flex-wrap gap-4">
            {project.links.live && (
              <Link href={project.links.live} target="_blank" rel="noopener noreferrer">
                <Button size="lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" x2="21" y1="14" y2="3" />
                  </svg>
                  View Live Site
                </Button>
              </Link>
            )}
            {project.links.github && (
              <Link href={project.links.github} target="_blank" rel="noopener noreferrer">
                <Button variant="secondary" size="lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-4 h-4 mr-2"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  View Source
                </Button>
              </Link>
            )}
          </div>
        </FadeIn>
      </div>
    </PageTransition>
  );
}
