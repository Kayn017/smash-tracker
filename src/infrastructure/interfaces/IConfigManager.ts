

export default interface IConfigManager {
    get<T>(key: string): T;
    set<T>(key: string, value: T): void;
    delete(key: string): void;
    load(): void;
}