import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type InsertContactMessage } from "@shared/schema";
import { useContactMutation } from "@/hooks/use-portfolio";
import { GlassCard } from "../ui/GlassCard";
import { NeonButton } from "../ui/NeonButton";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  const { mutate, isPending } = useContactMutation();
  const form = useForm<InsertContactMessage>({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: InsertContactMessage) => {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  return (
    <section id="contact" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Contact Info */}
          <div>
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
              Let's Create <br />
              <span className="text-cyan-400 text-glow">Something Epic</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-12 max-w-md">
              Available for freelance work and full-time opportunities. Drop me a line if you want to chat about code, design, or the future of the web.
            </p>

            <div className="space-y-6">
              {[
                { icon: Mail, text: "hello@devfolio.com", label: "Email" },
                { icon: MapPin, text: "San Francisco, CA", label: "Location" },
                { icon: Phone, text: "+1 (555) 000-0000", label: "Phone" },
              ].map((item, i) => (
                <GlassCard key={i} className="flex items-center gap-4 p-4 hover:bg-white/5 transition-colors">
                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider font-bold mb-0.5">{item.label}</p>
                    <p className="font-medium text-white">{item.text}</p>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <GlassCard glow="magenta" className="p-8">
            <h3 className="text-2xl font-bold font-display mb-6">Send a Message</h3>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Name</label>
                <Input 
                  {...form.register("name")}
                  placeholder="John Doe"
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-12 rounded-xl text-white placeholder:text-white/20"
                />
                {form.formState.errors.name && (
                  <p className="text-red-400 text-xs">{form.formState.errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Email</label>
                <Input 
                  {...form.register("email")}
                  type="email"
                  placeholder="john@example.com"
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20 h-12 rounded-xl text-white placeholder:text-white/20"
                />
                {form.formState.errors.email && (
                  <p className="text-red-400 text-xs">{form.formState.errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Message</label>
                <Textarea 
                  {...form.register("message")}
                  placeholder="Tell me about your project..."
                  className="bg-black/20 border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/20 min-h-[150px] rounded-xl text-white placeholder:text-white/20 resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-red-400 text-xs">{form.formState.errors.message.message}</p>
                )}
              </div>

              <NeonButton 
                type="submit" 
                disabled={isPending}
                variant="magenta"
                className="w-full justify-center"
              >
                {isPending ? "Sending..." : "Send Message"}
              </NeonButton>
            </form>
          </GlassCard>

        </div>
      </div>
    </section>
  );
}
