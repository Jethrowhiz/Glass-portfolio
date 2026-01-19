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
      title: "Portfolio Website",
      description: "A responsive portfolio website showcasing projects and skills with smooth animations and modern design principles.",
      imageUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
      link: "https://github.com/Jethrowhiz/portfolio-website",
      tags: ["React", "Tailwind", "Framer Motion"],
      featured: true,
    });
    
    await storage.createProject({
      title: "My Portfolio (HTML)",
      description: "A classic portfolio design implemented using semantic HTML and CSS to demonstrate core web development skills.",
      imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80",
      link: "https://github.com/Jethrowhiz/My_portfolio",
      tags: ["HTML", "CSS"],
      featured: true,
    });
    
    await storage.createProject({
      title: "Clarity Smart Contracts",
      description: "Assignment repository for Clarity smart contracts, focusing on blockchain development and secure contract logic.",
      imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
      link: "https://github.com/Jethrowhiz/Clarity-Smart-Contract-Assignments",
      tags: ["Clarity", "Smart Contracts", "Blockchain"],
      featured: false,
    });

    await storage.createProject({
      title: "Web3 Smart Contract App",
      description: "A decentralized application featuring secure smart contract interactions, real-time blockchain data monitoring, and wallet integration.",
      imageUrl: "https://images.unsplash.com/photo-1639762681057-32c9a2d57a44?w=800&q=80",
      link: "https://github.com/Jethrowhiz",
      tags: ["Solidity", "Ether.js", "Web3", "React"],
      featured: true,
    });

    await storage.createProject({
      title: "Task Management Tool",
      description: "A collaborative task tracking application with real-time updates and team management features.",
      imageUrl: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&q=80",
      link: "https://github.com/Jethrowhiz",
      tags: ["React", "Firebase", "Tailwind"],
      featured: false,
    });

    await storage.createProject({
      title: "Weather Dashboard",
      description: "A dynamic weather application providing real-time forecasts and interactive climate data visualizations.",
      imageUrl: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
      link: "https://github.com/Jethrowhiz",
      tags: ["JavaScript", "API Integration", "Charts.js"],
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
