import { Background } from "@/components/layout/Background";
import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="min-h-screen text-foreground">
      <Background />
      <Navbar />
      
      <main className="relative">
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground relative z-10 glass border-t border-white/5 border-x-0 border-b-0 rounded-none mt-20">
        <p>© {new Date().getFullYear()} DevFolio. Crafted with React, Tailwind & Neon Dreams.</p>
      </footer>
    </div>
  );
}
