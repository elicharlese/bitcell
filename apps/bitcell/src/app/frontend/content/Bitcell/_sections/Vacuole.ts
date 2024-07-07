import { Chamber, BaseCell } from './BaseCell';

class Vacuole extends BaseCell {
  constructor() {
    super([
      { id: 1, name: 'Storage Vacuole', substance: 'Nutrients', capacity: 400, currentLevel: 250 },
      { id: 2, name: 'Waste Vacuole', substance: 'Waste', capacity: 300, currentLevel: 100 },
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

export default Vacuole;