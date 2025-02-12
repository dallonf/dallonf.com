import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const jobs = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: "src/data/jobs",
  }),
  schema: z.object({
    start: z.string().regex(/[0-9]{4}-[0-9]{2}/),
    end: z
      .string()
      .regex(/[0-9]{4}-[0-9]{2}/)
      .optional(),
    name: z.string(),
    title: z.string().optional(),
  }),
});

export const collections = { jobs };
