import {gql} from 'apollo-server';

const typeDefs = gql`
    type Post {
        _id: ID!
        body: String!
        username: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
        user: User!
    }
    
    type Comment {
        _id: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    type Like {
       _id: ID!
       username: String!
       createdAt: String!
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type User {
        _id: ID!
        token: String!
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

    type Alert {
        message: String!
    }
    
    type Query {
        getPosts: [Post]!
        getPost(postId: ID!): Post!
        getUsers: [User]!
        getUser(userId: ID!): User!
        getComments: [Comment]!
        getComment(commentId: ID!): Comment!
    }

    type Mutation {
        signup(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        deleteUser(userId: ID): Alert! 
        createPost(body: String!): Post!
        deletePost(postId: ID!): Alert!
        addComment(postId: ID!, body: String!): Post!
        removeComment(postId: ID!, commentId: ID!): Post!
        likePost(postId: ID!): Post!
    }

    type Schema {
        mutation: Mutation, query: Query
    }
`

export default typeDefs;