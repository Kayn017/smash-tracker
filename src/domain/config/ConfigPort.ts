export interface ConfigPort {
  get<K extends keyof Config>(key: K): Config[K];
  getAll(): Config;
}

export interface Config {
  NODE_ENV: "development" | "production" | "test";
  DISCORD_TOKEN: string;
  DISCORD_DEV_GUILD_ID: string | undefined;
}