"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";

interface ProjectFilterProps {
  tags: string[];
  activeTag: string | null;
}

export default function ProjectFilter({ tags, activeTag }: ProjectFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTagClick = (tag: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    router.push(`/projects?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <Button
        variant={activeTag === null ? "primary" : "secondary"}
        size="sm"
        onClick={() => handleTagClick(null)}
      >
        All
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag}
          variant={activeTag === tag ? "primary" : "secondary"}
          size="sm"
          onClick={() => handleTagClick(tag)}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}
