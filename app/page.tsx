import Hero from "@/components/sections/Hero";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Contact from "@/components/sections/Contact";
import PageTransition from "@/components/motion/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Hero />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </div>
    </PageTransition>
  );
}
