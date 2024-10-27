export const typeDefs = `#graphql
 
 type Query {
  record(id:ID!): Record
  records: [Record]
}

type Mutation {
  createRecord(name: String!, position: String, level: String): Record
  deleteRecord(id: ID!): Boolean
  updateRecord(id: ID! name: String, position: String, level: String): Record
}

type Record {
  id: ID
  name: String
  position: String
  level: String
}
`