const {createLibrarian, createUser, createReader}  = require('./model')

module.exports.resolvers = {
  Query: {
    
  },
  Mutation: {
    createLibrarian: ( _,{username, password, phone, firstName, lastName, file }) =>{
      console.log(username, password, phone, firstName, lastName, file )
    }
  }
};