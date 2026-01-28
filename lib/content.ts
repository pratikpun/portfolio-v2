import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type {
  Profile,
  SkillsData,
  ProjectsData,
  ExperienceData,
  BlogPostMeta,
  BlogPost,
} from "./types";

const dataDirectory = path.join(process.cwd(), "data");
const blogDirectory = path.join(process.cwd(), "content/blog");

// JSON data loaders
export function getProfile(): Profile {
  const filePath = path.join(dataDirectory, "profile.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function getSkills(): SkillsData {
  const filePath = path.join(dataDirectory, "skills.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function getProjects(): ProjectsData {
  const filePath = path.join(dataDirectory, "projects.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

export function getFeaturedProjects(): ProjectsData {
  const data = getProjects();
  return {
    projects: data.projects.filter((p) => p.featured),
  };
}

export function getExperience(): ExperienceData {
  const filePath = path.join(dataDirectory, "experience.json");
  const fileContents = fs.readFileSync(filePath, "utf8");
  return JSON.parse(fileContents);
}

// Blog post loaders
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(blogDirectory);
  return fileNames
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

export function getPostBySlug(slug: string): BlogPost | null {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    slug,
    title: data.title || "",
    date: data.date || "",
    description: data.description || "",
    tags: data.tags || [],
    content,
  };
}

export function getAllPosts(): BlogPostMeta[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getPostBySlug(slug);
      if (!post) return null;
      const { content: _, ...meta } = post;
      void _; // Explicitly mark as unused
      return meta;
    })
    .filter((post): post is BlogPostMeta => post !== null)
    .sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

  return posts;
}

// Get all unique tags from projects
export function getAllProjectTags(): string[] {
  const { projects } = getProjects();
  const tagsSet = new Set<string>();
  projects.forEach((project) => {
    project.tags.forEach((tag) => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}
