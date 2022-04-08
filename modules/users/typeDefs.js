const { gql } = require('apollo-server');

module.exports.typeDefs = gql`
  type Query{
    readers:[Reader!],
    librarians:[Librarian!]
  },
  type Reader{
    username:String,
    phone:String,
    firstName:String, 
    lastName:String, 
    file:String
  }
  type Librarian{
    username:String,
    phone:String,
    firstName:String, 
    lastName:String, 
    file:String,
    email:String,
    library:String
  }
  type Mutation{
    createReader(username:String!, password:String!,  phone:String!,  firstName:String, lastName:String, file:String):Reader,
    createLibrarian(username:String!, password:String!,  phone:String!,  firstName:String, lastName:String, file:String, email:String, library:String):Librarian
  }
`;

