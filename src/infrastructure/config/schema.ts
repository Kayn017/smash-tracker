import { z } from 'zod';

export const ConfigSchema = z.object({
  // Global parameters
  NODE_ENV: z.enum(['development', 'production', 'test']),

  // Discord parameters
  DISCORD_TOKEN: z.string().min(1, 'DISCORD_TOKEN is required'),
  DISCORD_DEV_GUILD_ID: z.string().optional(),

  // StartGG parameters
  STARTGG_API_TOKEN: z.string().min(1, 'STARTGG_API_TOKEN is required'),
  STARTGG_API_URL: z.url().default('https://api.start.gg/gql/alpha')
});

export type EnvConfig = z.infer<typeof ConfigSchema>;
