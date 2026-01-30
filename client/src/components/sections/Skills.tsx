import { useSkills } from "@/hooks/use-portfolio";
import { GlassCard } from "../ui/GlassCard";
import { motion } from "framer-motion";
import { Code, Database, Wrench } from "lucide-react";

export function Skills() {
  const { data: skills, isPending } = useSkills();

  const categories = [
    { id: 'frontend', label: 'Frontend', icon: Code, color: 'text-cyan-400' },
    { id: 'backend', label: 'Backend', icon: Database, color: 'text-fuchsia-400' },
    { id: 'tools', label: 'Tools', icon: Wrench, color: 'text-purple-400' },
  ];

  if (isPending) return null;

  return (
    <section id="skills" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-cyan-400 text-glow">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit for building robust, scalable applications.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const categorySkills = skills?.filter(s => s.category === cat.id) || [];

            return (
              <GlassCard
                key={cat.id}
                className="h-full flex flex-col"
                glow={cat.id === 'frontend' ? 'cyan' : cat.id === 'backend' ? 'magenta' : 'none'}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className={`p-3 rounded-xl bg-white/5 ${cat.color} border border-white/10`}>
                    <cat.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-display">{cat.label}</h3>
                </div>

                <div className="flex flex-col gap-6">
                  {categorySkills.map((skill) => (
                    <div key={skill.id} className="group">
                      <div className="flex justify-between mb-2">
                        <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-muted-foreground text-sm">{skill.proficiency}%</span>
                      </div>
                      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.proficiency}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className={`h-full rounded-full ${cat.id === 'frontend' ? 'bg-cyan-500' :
                              cat.id === 'backend' ? 'bg-fuchsia-500' : 'bg-purple-500'
                            } opacity-80 group-hover:opacity-100 group-hover:shadow-[0_0_10px_currentColor] transition-all`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
