// mitochondriaSchema.js
const { gql } = require('apollo-server');

const mitochondriaTypeDefs = gql`
  type Mitochondrion {
    id: ID!
    name: String!
    function: String!
    energyProductionLevel: Int!
  }

  type Query {
    getMitochondria: [Mitochondrion!]!
    getMitochondrionById(id: ID!): Mitochondrion
  }

  type Mutation {
    increaseEnergyProduction(amount: Int!, mitochondrionId: ID!): Mitochondrion!
    decreaseEnergyProduction(amount: Int!, mitochondrionId: ID!): Mitochondrion!
  }
`;

module.exports = mitochondriaTypeDefs;