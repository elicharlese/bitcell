export interface Chamber {
  id: number;
  name: string;
  substance: string;
  capacity: number;
  currentLevel: number;
}

export abstract class BaseCell {
  chambers: Chamber[];

  constructor(chambers: Chamber[]) {
    this.chambers = chambers;
  }

  protected getChamberById(chamberId: number): Chamber | undefined {
    return this.chambers.find(chamber => chamber.id === chamberId);
  }

  abstract pumpIn(amount: number, chamberId: number): void;
  abstract pumpOut(amount: number, chamberId: number): void;
}