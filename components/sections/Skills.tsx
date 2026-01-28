import { getSkills } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import FadeIn from "@/components/motion/FadeIn";

export default function Skills() {
  const { categories } = getSkills();

  return (
    <section className="py-16 md:py-24">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Skills & Technologies
        </h2>
      </FadeIn>
      <div className="grid gap-8 md:grid-cols-2">
        {categories.map((category, index) => (
          <FadeIn key={category.name} delay={0.1 * index} className="h-full">
            <div className="h-full rounded-lg border border-border bg-muted/50 p-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">
                {category.name}
              </h3>
              <div className="flex flex-wrap gap-2 -ml-3">
                {category.skills.map((skill) => (
                  <Badge key={skill} variant="accent">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
