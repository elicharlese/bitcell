interface Chamber {
  id: number;
  name: string;
  substance: string;
  capacity: number;
  currentLevel: number;
}

interface PumpMechanism {
  pumpIn(amount: number, chamberId: number): void;
  pumpOut(amount: number, chamberId: number): void;
}

class Mitochondria implements PumpMechanism {
  chambers: Chamber[];

  constructor() {
      this.chambers = [
          { id: 1, name: "Inner Chamber", substance: "ATP", capacity: 100, currentLevel: 50 },
          { id: 2, name: "Outer Chamber", substance: "ADP", capacity: 100, currentLevel: 30 },
      ];
  }

  private getChamberById(chamberId: number): Chamber | undefined {
      return this.chambers.find(chamber => chamber.id === chamberId);
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

export default Mitochondria;