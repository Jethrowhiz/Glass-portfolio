import { useProjects } from "@/hooks/use-portfolio";
import { GlassCard } from "../ui/GlassCard";
import { Link } from "wouter";
import { ExternalLink, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function Projects() {
  const { data: projects, isLoading } = useProjects();

  if (isLoading) {
    return (
      <div className="py-24 text-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full mx-auto" />
      </div>
    );
  }

  return (
    <section id="projects" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="text-fuchsia-400 text-glow-magenta">Work</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Selected projects that showcase my passion for design and engineering.
            </p>
          </div>
          <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-2 transition-colors">
            View Github <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, idx) => (
            <Link key={project.id} href={`/project/${project.id}`} className="block h-full">
              <GlassCard 
                hoverEffect 
                className="h-full flex flex-col p-0 group"
                glow={idx % 2 === 0 ? "cyan" : "magenta"}
              >
                <div className="relative h-48 overflow-hidden border-b border-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#050511] to-transparent opacity-60 z-10" />
                  <img 
                    src={project.imageUrl} 
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 right-4 z-20">
                    <div className="p-2 bg-black/50 backdrop-blur-md rounded-full border border-white/10 group-hover:border-cyan-500/50 transition-colors">
                      <ExternalLink className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold font-display mb-2 group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-6 flex-grow">
                    {project.description}
                  </p>

                  <div className="flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors">
                    View Details
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
