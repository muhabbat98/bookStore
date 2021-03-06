const { gql } = require('apollo-server');

module.exports.typeDefs = gql`
  extend type Query{
    resources:[Resource!]
  },
  type Resource{
    id:Int,
    title:String,
    subject:String,
    description:String,
    type:String,
    publisher:String,
    date:String,
    language:String,
    file:String,
    cover:String
  }
   type ReturningRecource{
    status:Int!,
    message:String,
    data:Resource,
    token:String!
  }
  extend type Mutation{
    createResource(title:String,subject:String,description:String,type:String,publisher:String,date:String,language:String,file:String,cover:String):ReturningRecource
  }

`;

