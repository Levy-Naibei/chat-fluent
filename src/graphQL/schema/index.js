import {gql} from 'apollo-server';

const typeDefs = gql`
    type Post {
        _id: ID!
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
        _id: ID!
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

    type AlertResponse {
        message: String!
    }
    
    type Query {
        getPosts: [Post!]
        getPost(postId: ID!): Post!
        getUsers: [User!]
        getUser(userId: ID!): User!
    }

    type Mutation {
        signup(registerInput: RegisterInput): User!
        login(email: String!, password: String!): AuthData!
        deleteUser(userId: ID): AlertResponse! 
        createPost(body: String!): Post!
        deletePost(postId: ID!): AlertResponse!
    }

    type Schema {
        mutation: Mutation, query: Query
    }
`

export default typeDefs;