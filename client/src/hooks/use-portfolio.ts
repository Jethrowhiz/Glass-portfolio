import { useQuery, useMutation } from "@tanstack/react-query";
import { type InsertContactMessage } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

// Static Data
const PROJECTS = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured online store with cart, checkout, and admin dashboard.",
    imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
    link: "#",
    tags: ["React", "Node.js", "PostgreSQL"],
    featured: true,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates.",
    imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
    link: "#",
    tags: ["Vue", "Firebase", "Tailwind"],
    featured: false,
    createdAt: new Date("2023-11-20"),
  },
  {
    id: 3,
    title: "Portfolio Website",
    description: "A modern, glassmorphism-styled portfolio website.",
    imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    link: "#",
    tags: ["React", "TypeScript", "Vite"],
    featured: true,
    createdAt: new Date("2024-02-01"),
  }
];


const SKILLS = [
  { id: 1, name: "React", category: "frontend", proficiency: 95, icon: "SiReact" },
  { id: 2, name: "TypeScript", category: "frontend", proficiency: 90, icon: "SiTypescript" },
  { id: 3, name: "Node.js", category: "backend", proficiency: 85, icon: "SiNodedotjs" },
  { id: 4, name: "Python", category: "backend", proficiency: 80, icon: "SiPython" },
  { id: 5, name: "PostgreSQL", category: "backend", proficiency: 75, icon: "SiPostgresql" },
  { id: 6, name: "Git", category: "tools", proficiency: 90, icon: "SiGit" },
  { id: 7, name: "Docker", category: "tools", proficiency: 70, icon: "SiDocker" },
  { id: 8, name: "Figma", category: "tools", proficiency: 85, icon: "SiFigma" }
];

// Projects Hooks
export function useProjects() {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      return PROJECTS;
    },
  });
}

export function useProject(id: number) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 300));
      return PROJECTS.find(p => p.id === id) || null;
    },
    enabled: !!id,
  });
}

// Skills Hooks
export function useSkills() {
  return useQuery({
    queryKey: ["skills"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      return SKILLS;
    },
  });
}

// Contact Hook
export function useContactMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Contact form submitted:", data);
      return { success: true };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent!",
        description: "Thanks for reaching out. I'll get back to you soon.",
        variant: "default",
        className: "bg-green-500/10 border-green-500 text-green-400 backdrop-blur-md",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
    },
  });
}
