interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
  className?: string;
}

export default function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variants = {
    default: "bg-muted text-muted-foreground",
    accent: "bg-violet-500/10 dark:bg-violet-500/20 text-gradient-accent",
  };

  return (
    <span
      className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
