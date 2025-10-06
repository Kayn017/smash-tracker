export interface ConfigPort {
  get<K extends keyof Config>(key: K): Config[K];
  getAll(): Config;
}

export interface Config {
  // Global parameters
  NODE_ENV: "development" | "production" | "test";

  // Discord parameters
  DISCORD_TOKEN: string;
  DISCORD_DEV_GUILD_ID?: string;

  // StartGG parameters
  STARTGG_API_TOKEN: string;
  STARTGG_API_URL: string;
}