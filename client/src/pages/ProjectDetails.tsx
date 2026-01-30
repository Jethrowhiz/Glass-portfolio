import { useProject } from "@/hooks/use-portfolio";
import { useRoute, Link } from "wouter";
import { Background } from "@/components/layout/Background";
import { Navbar } from "@/components/layout/Navbar";
import { NeonButton } from "@/components/ui/NeonButton";
import { GlassCard } from "@/components/ui/GlassCard";
import { ArrowLeft, ExternalLink, Calendar, Tag } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectDetails() {
  const [match, params] = useRoute("/project/:id");
  const id = params ? parseInt(params.id) : 0;
  const { data: project, isPending } = useProject(id);

  if (isPending) {
    return (
      <div className="min-h-screen bg-[#050511] flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#050511] flex flex-col items-center justify-center text-center p-4">
        <h1 className="text-4xl font-bold mb-4 font-display">Project Not Found</h1>
        <Link href="/">
          <NeonButton>Go Home</NeonButton>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground">
      <Background />
      <Navbar />

      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto">

          <Link href="/#projects" className="inline-flex items-center gap-2 text-muted-foreground hover:text-cyan-400 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden mb-12 border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#050511] to-transparent opacity-40" />
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="grid md:grid-cols-[1fr_300px] gap-12">
              <div className="space-y-8">
                <div>
                  <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">{project.title}</h1>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold font-display text-white">Project Overview</h3>
                  <div className="prose prose-invert prose-p:text-gray-400 max-w-none">
                    <p>
                      This project demonstrates advanced implementation of modern web technologies.
                      Designed with scalability and performance in mind, it solves key user problems
                      while providing a delightful user experience.
                    </p>
                    <p>
                      Key challenges included real-time data synchronization and creating performant
                      animations on mobile devices.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <GlassCard className="p-6 space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                      <Tag className="w-4 h-4" /> Technologies
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-cyan-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="h-px bg-white/10" />

                  <div>
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4" /> Date
                    </h4>
                    <p className="text-white">
                      {new Date(project.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <NeonButton className="w-full justify-center">
                      Live Preview <ExternalLink className="w-4 h-4" />
                    </NeonButton>
                  </a>
                </GlassCard>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
