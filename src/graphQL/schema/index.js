import {gql} from 'apollo-server';

const typeDefs = gql`
    type Post{
        id: ID!
        body: String!
        username: String!
        createdAt: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type RegisterResponse {
        message: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        createdAt: String!
    }

    type AuthData {
        userId: ID!
        token: String!
        tokenExpiry: Int!
    }

    type LoginResponse {
        message: String!
    }

    type Query {
        getPosts: [Post!]
        getUsers: [User!]
    }

    type Mutation {
        signup(registerInput: RegisterInput): User!
        login(email: String!, password: String!): LoginResponse!

    }

    type Schema {
        mutation: Mutation, query: Query
    }
`

export default typeDefs;