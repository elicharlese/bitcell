// schema.js
const { gql } = require('apollo-server');

const typeDefs = gql`
  type Chamber {
    id: ID!
    name: String!
    substance: String!
    capacity: Int!
    currentLevel: Int!
  }

  type Query {
    getChambers: [Chamber!]!
    getChamberById(id: ID!): Chamber
  }

  type Mutation {
    storeInChamber(amount: Int!, chamberId: ID!): Chamber!
    releaseFromChamber(amount: Int!, chamberId: ID!): Chamber!
  }
`;

module.exports = typeDefs;