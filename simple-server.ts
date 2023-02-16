import { ApolloServer, gql } from 'apollo-server'
import { randomUUID } from 'node:crypto'

// typeDefs são quais são as "rotas" que teremos no graphql

// queries são operações de leitura no backend
// mutations são operações de escrita


// Schema first: primeiro criamos um schema

const typeDefs = gql`
    type User {
        id: String!
        name: String!
    }

    type Query {
        users: [User!]! # ! só pode vir string (nem nulo pode)
    }

    type Mutation {
        createUser(name: String): User!
    }
`

interface Users {
    id: string
    name: string
}

const users: Users[] = []

const server = new ApolloServer({
    typeDefs,
    resolvers: { // tipo as controllers do rest
        Query: {
            users: () => {
                return users
            }
        },

        Mutation: {
            createUser: (_, args) => {
                const user = {
                    id: randomUUID(),
                    name: args.name
                }

                users.push(user)
                return user
            }
        }
    }
})

server.listen().then(({ url }) => {
    console.log(`HTTP server running on ${url}`)
})