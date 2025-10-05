import { z } from 'zod';

export const ConfigSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
  DISCORD_DEV_GUILD_ID: z.string().optional()
});

export type EnvConfig = z.infer<typeof ConfigSchema>;
