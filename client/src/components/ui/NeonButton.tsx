import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface NeonButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "cyan" | "magenta";
}

export function NeonButton({ 
  children, 
  className, 
  variant = "cyan", 
  ...props 
}: NeonButtonProps) {
  const colorClass = variant === "cyan" ? "cyan" : "fuchsia";
  const hexColor = variant === "cyan" ? "#00f3ff" : "#d946ef";

  return (
    <motion.button
      whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${hexColor}40` }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        `relative px-8 py-3 rounded-xl font-bold tracking-wide uppercase text-sm
         bg-transparent border border-${colorClass}-500/50 text-${colorClass}-400
         hover:text-white hover:border-${colorClass}-400 hover:bg-${colorClass}-500/10
         transition-all duration-300 group overflow-hidden`,
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-${colorClass}-500/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1s_infinite]`} />
    </motion.button>
  );
}
