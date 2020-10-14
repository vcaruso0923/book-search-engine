const { gql } = require('apollo-server-express');

const typeDefs = gql`

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
        authors: [String]
        description: String
        title: String
        image: String
    }

    input bookInput {
    bookId: String
    authors: [String]
    description: String
    title: String
    image: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        createUser(username: String!, email: String!, password: String!): Auth
        saveBook(input: bookInput): User
        deleteBook(bookId: String!): User
    }
`;

module.exports = typeDefs