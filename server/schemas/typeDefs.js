const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(authors: [String]!, description: String!, title: String!, bookId: String!, image: String!): Book
        deleteBook(bookId: String!): User
    }

    type User {
        _id: ID
        username: String
        email: String
        bookCount: Int
        savedBooks: [Book]
    }

    type Query {
        me: User
    }

    type Book {
        bookId: String!
        authors: [String]!
        description: String!
        title: String!
        image: String!
        link: String!
    }

    type Auth {
        token: ID!
        user: User
    }
`;

module.exports = typeDefs