import { motion } from "framer-motion";

export function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-[#050511]">
      {/* Grid overlay */}
      <div 
        className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px]"
        style={{ maskImage: "radial-gradient(ellipse at center, black, transparent 80%)" }}
      />

      {/* Primary Orb - Cyan */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 100, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-cyan-500/20 blur-[120px]"
      />

      {/* Secondary Orb - Magenta */}
      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 80, -30, 0],
          scale: [1, 1.1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-fuchsia-500/10 blur-[120px]"
      />

      {/* Accent Orb - Purple */}
      <motion.div
        animate={{
          x: [0, 30, -30, 0],
          y: [0, -40, 20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] rounded-full bg-purple-600/15 blur-[100px]"
      />
    </div>
  );
}
