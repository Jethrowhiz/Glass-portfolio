import { motion } from "framer-motion";
import { NeonButton } from "../ui/NeonButton";
import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";

export function Hero() {
  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative px-4 pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
        
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 mb-6">
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
              Full Stack Developer
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
            Building the <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 text-glow">
              Future Web
            </span>
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
            I craft immersive, high-performance digital experiences using modern technologies. 
            Specializing in React, Node.js, and creative frontend engineering.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <NeonButton onClick={scrollToProjects}>
              View Projects <ArrowRight className="w-4 h-4" />
            </NeonButton>
            
            <div className="flex items-center gap-4 px-6">
              {[Github, Linkedin, Twitter].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="p-2 rounded-full border border-white/10 hover:border-cyan-500/50 hover:bg-cyan-500/10 hover:text-cyan-400 transition-all text-muted-foreground"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Visual Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative hidden lg:block"
        >
          <div className="relative w-full aspect-square max-w-md mx-auto">
            {/* Rotating rings */}
            <div className="absolute inset-0 border border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
            <div className="absolute inset-8 border border-fuchsia-500/20 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
            <div className="absolute inset-16 border border-purple-500/20 rounded-full animate-[spin_20s_linear_infinite]" />
            
            {/* Center Image/Card */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-2 border-white/10 glass shadow-[0_0_50px_rgba(0,243,255,0.2)]">
                {/* Developer Avatar - using a nice abstract 3D render placeholder */}
                {/* abstract 3d neon avatar portrait cyberpunk style */}
                <img 
                  src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop&q=60" 
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Floating badges */}
            <motion.div 
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 glass px-4 py-2 rounded-xl border border-cyan-500/30 text-cyan-400 text-sm font-bold shadow-lg"
            >
              React Expert
            </motion.div>
            
            <motion.div 
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-20 left-0 glass px-4 py-2 rounded-xl border border-fuchsia-500/30 text-fuchsia-400 text-sm font-bold shadow-lg"
            >
              UI/UX Design
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
