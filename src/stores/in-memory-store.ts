class InMemoryStore {
  private data: Map<string, Record<string, unknown>[]>;

  static _instance: InMemoryStore;

  constructor() {
    this.data = new Map();
  }

  static getInstance(): InMemoryStore {
    if (!this._instance) {
      this._instance = new InMemoryStore();
    }

    return this._instance;
  }

  public get<TData extends object>(key: string): TData[] {
    return this.data.get(key) as TData[];
  }

  public insert(key: string, data: Record<string, unknown>): void {
    const stored = this.data.get(key);

    if (!stored) {
      this.data.set(key, [data]);
      return;
    }

    this.data.set(key, [...stored, data]);
  }
}

export default InMemoryStore;
