const { gql } = require('apollo-server');

module.exports.typeDefs = gql`
  type Book {
    title: String
    author: String
  }
  type Query {
    books: [Book]
  }
`;

