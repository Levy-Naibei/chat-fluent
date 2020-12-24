import {gql} from 'apollo-server-express';

const typeDefs = gql `
    type Query {
        greetings: String
    }

    type Mutation {
        sayHi: String
    }

    type Schema {
        mutation: Mutation, query: Query
    }
`

export default typeDefs;