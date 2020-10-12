import gql from 'graphql-tag';

export const LOGIN_USER = gql`
    mutation login($username: String!, $email: String!, $password: String!) {
        login(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
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
    mutation saveBook($bookId: String!){
        saveBook(bookId: $id) {
            authors
            description
            bookIdimage
            link
            title
        }
    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!){
        removeBook(bookId: $id) {
            authors
            description
            bookIdimage
            link
            title
        }
    }
`