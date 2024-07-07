import { Chamber, BaseCell } from './BaseCell';

class Nucleus extends BaseCell {
  constructor() {
    super([
      { id: 1, name: 'Gene Storage', substance: 'DNA', capacity: 1000, currentLevel: 750 },
      { id: 2, name: 'RNA Factory', substance: 'RNA', capacity: 500, currentLevel: 300 },
    ]);
  }

  pumpIn(amount: number, chamberId: number): void {
    const chamber = this.getChamberById(chamberId);
    if (chamber && chamber.currentLevel + amount <= chamber.capacity) {
      chamber.currentLevel += amount;
      console.log(`Pumped in ${amount} units to ${chamber.name}. Current level: ${chamber.currentLevel}`);
    } else if (chamber) {
      console.log(`Cannot pump in ${amount} units to ${chamber.name}. Exceeds capacity.`);
    }
  }

  pumpOut(amount: number, chamberId: number): void {
    const chamber = this.getChamberById(chamberId);
    if (chamber && chamber.currentLevel >= amount) {
      chamber.currentLevel -= amount;
      console.log(`Pumped out ${amount} units from ${chamber.name}. Current level: ${chamber.currentLevel}`);
    } else if (chamber) {
      console.log(`Cannot pump out ${amount} units from ${chamber.name}. Insufficient substance.`);
    }
  }
}

export default Nucleus;