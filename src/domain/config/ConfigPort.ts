export interface ConfigPort {
  get<K extends keyof Config>(key: K): Config[K];
  getAll(): Config;
}

export interface Config {
    DISCORD_TOKEN: string;
    NODE_ENV: "development" | "production" | "test";
}