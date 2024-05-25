interface LipidChamber {
  id: number;
  name: string;
  substance: string;
  capacity: number;
  currentLevel: number;
}

interface LipidPumpMechanism {
  store(amount: number, chamberId: number): void;
  release(amount: number, chamberId: number): void;
}

class LipidStore implements LipidPumpMechanism {
  chambers: LipidChamber[];

  constructor() {
      this.chambers = [
          { id: 1, name: "Primary Lipid Chamber", substance: "Lipids", capacity: 200, currentLevel: 120 },
          { id: 2, name: "Secondary Lipid Chamber", substance: "Lipids", capacity: 150, currentLevel: 60 },
      ];
  }

  private getChamberById(chamberId: number): LipidChamber | undefined {
      return this.chambers.find(chamber => chamber.id === chamberId);
  }

  store(amount: number, chamberId: number): void {
      const chamber = this.getChamberById(chamberId);
      if (chamber && chamber.currentLevel + amount <= chamber.capacity) {
          chamber.currentLevel += amount;
          console.log(`Stored ${amount} units in ${chamber.name}. Current level: ${chamber.currentLevel}`);
      } else if (chamber) {
          console.log(`Cannot store ${amount} units in ${chamber.name}. Exceeds capacity.`);
      }
  }

  release(amount: number, chamberId: number): void {
      const chamber = this.getChamberById(chamberId);
      if (chamber && chamber.currentLevel >= amount) {
          chamber.currentLevel -= amount;
          console.log(`Released ${amount} units from ${chamber.name}. Current level: ${chamber.currentLevel}`);
      } else if (chamber) {
          console.log(`Cannot release ${amount} units from ${chamber.name}. Insufficient substance.`);
      }
  }
}

export default LipidStore;