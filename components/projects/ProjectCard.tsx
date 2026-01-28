import Image from "next/image";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import type { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link href={`/projects/${project.id}`} className="block h-full">
      <article className="group h-full flex flex-col rounded-lg border border-border bg-background overflow-hidden transition-colors hover:border-violet-500">
        {project.image && (
          <div className="aspect-video bg-muted relative overflow-hidden flex-shrink-0">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-gradient-accent transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 flex-grow">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
