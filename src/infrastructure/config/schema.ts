import { z } from 'zod';

export const ConfigSchema = z.object({
  DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
});

export type EnvConfig = z.infer<typeof ConfigSchema>;
