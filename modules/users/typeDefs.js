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
  type ReturningReader{
    status:Int!,
    message:String,
    data:Reader,
    token:String!
  }
  type ReturningLibrarian{
    status:Int!,
    message:String,
    data:Librarian,
    token:String!
  }
  type Mutation{
    createReader(username:String!, password:String!,  phone:String!,  firstName:String, lastName:String, file:String):ReturningReader,
    createLibrarian(username:String!, password:String!,  phone:String!,  firstName:String, lastName:String, file:String, email:String, library:String):ReturningLibrarian,
    checkReader(username:String!, password:String!):ReturningReader!,
    checkLibrarian(username:String!, password:String!):ReturningLibrarian!
  }
`;

