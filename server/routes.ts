import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { insertContactMessageSchema } from "@shared/schema";

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Seed Projects
    await storage.createProject({
      title: "Neon Commerce",
      description: "A futuristic e-commerce platform built with Next.js and Stripe, featuring real-time inventory and 3D product previews.",
      imageUrl: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80",
      link: "https://github.com",
      tags: ["Next.js", "React", "Stripe", "Tailwind"],
      featured: true,
    });
    
    await storage.createProject({
      title: "Glass UI Kit",
      description: "An open-source React component library focusing on glassmorphism and frosted glass effects.",
      imageUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
      link: "https://github.com",
      tags: ["React", "CSS Modules", "Storybook"],
      featured: true,
    });
    
    await storage.createProject({
      title: "Cyber Dashboard",
      description: "Real-time analytics dashboard for IoT devices with glowing data visualization charts.",
      imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      link: "https://github.com",
      tags: ["Vue.js", "D3.js", "WebSockets"],
      featured: false,
    });
  }

  const existingSkills = await storage.getSkills();
  if (existingSkills.length === 0) {
    // Seed Skills
    const skillList = [
      { name: "React", category: "frontend", proficiency: 95, icon: "SiReact" },
      { name: "TypeScript", category: "frontend", proficiency: 90, icon: "SiTypescript" },
      { name: "Tailwind CSS", category: "frontend", proficiency: 95, icon: "SiTailwindcss" },
      { name: "Node.js", category: "backend", proficiency: 85, icon: "SiNodedotjs" },
      { name: "PostgreSQL", category: "backend", proficiency: 80, icon: "SiPostgresql" },
      { name: "Figma", category: "tools", proficiency: 85, icon: "SiFigma" },
      { name: "Git", category: "tools", proficiency: 90, icon: "SiGit" },
    ];
    
    for (const skill of skillList) {
      await storage.createSkill(skill);
    }
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Seed data on startup
  seedDatabase();

  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Skills
  app.get(api.skills.list.path, async (req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const message = await storage.createContactMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
    }
  });

  return httpServer;
}
