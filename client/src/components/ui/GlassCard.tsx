import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  hoverEffect?: boolean;
  glow?: "cyan" | "magenta" | "none";
}

export function GlassCard({
  className,
  children,
  hoverEffect = false,
  glow = "none",
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      className={cn(
        "rounded-2xl p-6 glass relative overflow-hidden",
        hoverEffect && "glass-hover cursor-pointer group",
        glow === "cyan" && "shadow-[0_0_40px_-10px_rgba(0,243,255,0.15)] border-cyan-500/20",
        glow === "magenta" && "shadow-[0_0_40px_-10px_rgba(255,0,255,0.15)] border-magenta-500/20",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      {...props}
    >
      {/* Glossy sheen overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.05] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
