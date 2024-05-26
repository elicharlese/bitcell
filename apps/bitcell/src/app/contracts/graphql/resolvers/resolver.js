// resolvers.js
const mitochondriaResolvers = require('./mitochondriaResolvers');
let chambers = [
  { id: "1", name: "Primary Lipid Chamber", substance: "Lipids", capacity: 200, currentLevel: 120 },
  { id: "2", name: "Secondary Lipid Chamber", substance: "Lipids", capacity: 150, currentLevel: 60 },
  // Add other chambers as needed
];

const resolvers = {
  Query: {
    getChambers: () => chambers,
    getChamberById: (_, { id }) => chambers.find(chamber => chamber.id === id),
    ...mitochondriaResolvers.Query,
  },
  Mutation: {
    storeInChamber: (_, { amount, chamberId }) => {
      const chamber = chambers.find(chamber => chamber.id === chamberId);
      if (chamber && chamber.currentLevel + amount <= chamber.capacity) {
        chamber.currentLevel += amount;
      }
      return chamber;
    },
    releaseFromChamber: (_, { amount, chamberId }) => {
      const chamber = chambers.find(chamber => chamber.id === chamberId);
      if (chamber && chamber.currentLevel >= amount) {
        chamber.currentLevel -= amount;
      }
      return chamber;
    },
    ...mitochondriaResolvers.Mutation,
  },
};

module.exports = resolvers;