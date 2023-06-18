import path from 'node:path';
import fs from 'node:fs';

class Generator {
  private localStoresPathDir: string;

  constructor(localStoresPathDir: string) {
    this.localStoresPathDir = path.resolve(localStoresPathDir, 'database');

    if (!fs.existsSync(this.localStoresPathDir)) {
      fs.mkdirSync(this.localStoresPathDir);
    }
  }

  // TODO change type of `structure`
  create(storeName: string, structure: object) {
    // TODO
  }

  rename(oldStoreName: string, newStoreName: string) {
    // TODO
  }

  delete({ soft } = { soft: true }) {
    // TODO
  }
}

export default Generator;
