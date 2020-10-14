import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login( $email: String!, $password: String!) {
        login( email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
`;

export const CREATE_USER = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
        createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookId: String!, $authors: [String], $description: String, $image: String, $title: String!){
        saveBook(bookId: $bookId, authors: $authors, description: $description, image: $image, title: $title) {
            _id
            username
            email
            savedBooks {
                bookId
                authors
                image
                description
                title
            }
        }
    }
`;

export const DELETE_BOOK = gql`
    mutation deleteBook($bookId: String!){
        deleteBook(bookId: $id) {
            authors
            description
            bookIdimage
            link
            title
        }
    }
`