import InMemoryStore from './in-memory-store';

type AttributeTypes = 'string' | 'int' | 'float' | 'bool';

interface StoredAttrs {
  name: string;
  type: AttributeTypes;
  required: boolean;
  isKey: boolean;
  isReference: boolean;
  references: string;
}

interface StoredEntity {
  name: string;
  attrs: StoredAttrs[];
}

class InMemoryEntities {
  private key = 'entities';
  private store: InMemoryStore;

  constructor() {
    this.store = InMemoryStore.getInstance();
  }

  public get(): StoredEntity[] {
    return this.store.get<StoredEntity>(this.key);
  }

  public insert(data: Record<string, unknown>): void {
    this.store.insert(this.key, data);
  }
}

export default InMemoryEntities;
