import { z } from "zod";

// === SCHEMAS ===

export const projectSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  link: z.string(),
  tags: z.array(z.string()),
  featured: z.boolean(),
  createdAt: z.date().optional(),
});

export const insertProjectSchema = projectSchema.omit({ id: true, createdAt: true });

export const skillSchema = z.object({
  id: z.number(),
  name: z.string(),
  category: z.string(), // 'frontend', 'backend', 'tools'
  proficiency: z.number(), // 0-100
  icon: z.string(), // icon name or url
});

export const insertSkillSchema = skillSchema.omit({ id: true });

export const contactMessageSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  message: z.string(),
  createdAt: z.date().optional(),
});

export const insertContactMessageSchema = contactMessageSchema.omit({ id: true, createdAt: true });

// === TYPES ===

export type Project = z.infer<typeof projectSchema>;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Skill = z.infer<typeof skillSchema>;
export type InsertSkill = z.infer<typeof insertSkillSchema>;

export type ContactMessage = z.infer<typeof contactMessageSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

