import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

// data

import { typeDefs } from './Schema.js'
import resolvers from './resolver.js'

// types



// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
}) 

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)