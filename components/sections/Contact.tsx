"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import FadeIn from "@/components/motion/FadeIn";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 scroll-mt-20">
      <FadeIn>
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
          Get In Touch
        </h2>
      </FadeIn>
      <FadeIn delay={0.1}>
        <p className="text-muted-foreground mb-8 max-w-xl">
          I&apos;m always open to discussing new opportunities, projects, or
          just having a chat. Feel free to reach out!
        </p>
      </FadeIn>
      <FadeIn delay={0.2}>
        <form
          name="contact"
          method="POST"
          data-netlify="true"
          onSubmit={handleSubmit}
          className="max-w-xl space-y-6"
        >
          <input type="hidden" name="form-name" value="contact" />
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-4 py-2 rounded-md border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-none"
              placeholder="Your message..."
            />
          </div>
          <Button type="submit" size="lg">
            Send Message
          </Button>
          {status === "success" && (
            <p className="text-green-600 dark:text-green-400 text-sm">
              Thanks for your message! I&apos;ll get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-red-600 dark:text-red-400 text-sm">
              Something went wrong. Please try again.
            </p>
          )}
        </form>
      </FadeIn>
    </section>
  );
}
