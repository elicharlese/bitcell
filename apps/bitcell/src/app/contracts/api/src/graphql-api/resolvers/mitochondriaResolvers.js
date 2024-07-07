const { ApolloError } = require('apollo-server');

let mitochondria = [
  { id: "1", name: "Primary Mitochondrion", function: "ATP Production", energyProductionLevel: 100 },
  { id: "2", name: "Secondary Mitochondrion", function: "Calcium Storage", energyProductionLevel: 80 },
  // Add other mitochondria as needed
];

const transactionMiddleware = async (operation) => {
  // Placeholder for real transaction handling
  try {
    return await operation();
  } catch (error) {
    throw new ApolloError('Transaction Failed', 'TRANSACTION_FAILED', { error });
  }
};

const mitochondriaResolvers = {
  Query: {
    getMitochondria: () => mitochondria,
    getMitochondrionById: (_, { id }) => mitochondria.find(mito => mito.id === id),
  },
  Mutation: {
    increaseEnergyProduction: async (_, { amount, mitochondrionId }) => {
      return await transactionMiddleware(() => {
        const mito = mitochondria.find(mito => mito.id === mitochondrionId);
        if (mito) {
          mito.energyProductionLevel += amount;
        }
        return mito;
      });
    },
    decreaseEnergyProduction: async (_, { amount, mitochondrionId }) => {
      return await transactionMiddleware(() => {
        const mito = mitochondria.find(mito => mito.id === mitochondrionId);
        if (mito && mito.energyProductionLevel >= amount) {
          mito.energyProductionLevel -= amount;
        }
        return mito;
      });
    },
  },
};

module.exports = mitochondriaResolvers;