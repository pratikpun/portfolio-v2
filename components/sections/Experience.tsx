import { getExperience } from "@/lib/content";
import FadeIn from "@/components/motion/FadeIn";

export default function Experience() {
  const { experiences } = getExperience();

  return (
    <section className="py-16 md:py-24">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
          Experience
        </h2>
      </FadeIn>
      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <FadeIn key={`${exp.company}-${exp.role}`} delay={0.1 * index}>
            <div className="relative pl-8 border-l-2 border-border hover:border-violet-500 transition-colors">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-border bg-background" />
              <div className="mb-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {exp.role}
                </h3>
                <p className="text-gradient-accent font-medium">{exp.company}</p>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                {exp.period} • {exp.location}
              </p>
              <p className="text-muted-foreground mb-4">{exp.description}</p>
              {exp.highlights.length > 0 && (
                <ul className="space-y-2 list-disc list-outside ml-4">
                  {exp.highlights.map((highlight, i) => (
                    <li
                      key={i}
                      className="text-sm text-muted-foreground pl-1 marker:text-violet-500"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
