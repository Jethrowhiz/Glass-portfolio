import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "Home" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="glass rounded-2xl px-6 py-3 flex items-center justify-between relative">
          
          <Link href="/" className="flex items-center gap-2 group z-10">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 group-hover:bg-cyan-500/20 transition-colors">
              <Code2 className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-white uppercase">
              Jethro<span className="text-cyan-400"> Samson</span>
            </span>
          </Link>

          {/* Centered Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScroll(e, link.href)}
                className={cn(
                  "text-sm font-medium tracking-wide transition-colors hover:text-cyan-400",
                  location === link.href ? "text-cyan-400" : "text-muted-foreground"
                )}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4 z-10">
            <a 
              href="#contact"
              onClick={(e) => handleScroll(e, "#contact")}
              className="hidden md:flex px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-sm font-medium hover:bg-white/10 hover:border-cyan-500/50 transition-all hover:text-cyan-400"
            >
              Hire Me
            </a>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 text-muted-foreground hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-[80px] left-4 right-4 p-4 rounded-2xl glass md:hidden flex flex-col gap-4"
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href)}
              className="text-lg font-medium text-center py-3 text-muted-foreground hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}
    </nav>
  );
}
