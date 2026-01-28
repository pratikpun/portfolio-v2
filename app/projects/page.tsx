import { Suspense } from "react";
import { getProjects, getAllProjectTags } from "@/lib/content";
import ProjectFilter from "@/components/projects/ProjectFilter";
import ProjectCard from "@/components/projects/ProjectCard";
import PageTransition from "@/components/motion/PageTransition";
import FadeIn from "@/components/motion/FadeIn";

export const metadata = {
  title: "Projects",
  description: "A collection of my projects and work.",
};

interface ProjectsPageProps {
  searchParams: Promise<{ tag?: string }>;
}

async function ProjectsContent({ searchParams }: ProjectsPageProps) {
  const params = await searchParams;
  const { projects } = getProjects();
  const allTags = getAllProjectTags();
  const activeTag = params.tag || null;

  const filteredProjects = activeTag
    ? projects.filter((project) => project.tags.includes(activeTag))
    : projects;

  return (
    <>
      <Suspense fallback={null}>
        <ProjectFilter tags={allTags} activeTag={activeTag} />
      </Suspense>
      <div key={activeTag || "all"} className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <FadeIn key={project.id} delay={0.05 * index} className="h-full">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>
      {filteredProjects.length === 0 && (
        <p className="text-center text-muted-foreground py-12">
          No projects found with the selected tag.
        </p>
      )}
    </>
  );
}

export default async function ProjectsPage(props: ProjectsPageProps) {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-16 md:py-24">
        <FadeIn>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Projects
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="text-muted-foreground mb-8 max-w-2xl">
            A collection of projects I&apos;ve worked on, from web applications
            to developer tools.
          </p>
        </FadeIn>
        <Suspense fallback={<div>Loading...</div>}>
          <ProjectsContent searchParams={props.searchParams} />
        </Suspense>
      </div>
    </PageTransition>
  );
}
