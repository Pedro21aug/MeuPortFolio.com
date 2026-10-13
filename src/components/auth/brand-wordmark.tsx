import { cn } from "@/lib/utils";

interface BrandWordmarkProps {
  className?: string;
  tone?: "canvas" | "light";
}

const BrandWordmark = ({ className, tone = "canvas" }: BrandWordmarkProps) => (
  <a
    href="/"
    className={cn(
      "focus-gold group inline-flex items-baseline gap-0.5 rounded-md",
      tone === "canvas" ? "focus-visible:ring-offset-canvas" : "focus-visible:ring-offset-card",
      className,
    )}
    aria-label="MeuPortfólio.com — página inicial"
  >
    <span
      className={cn(
        "font-display text-lg font-semibold tracking-tight transition-colors duration-200 sm:text-xl",
        tone === "canvas"
          ? "text-canvas-foreground"
          : "text-foreground",
      )}
    >
      MeuPortfólio
    </span>
    <span className="font-display text-lg font-semibold tracking-tight text-gold-400 transition-colors duration-200 group-hover:text-gold-300 sm:text-xl">
      .com
    </span>
  </a>
);

export default BrandWordmark;
