const {books}  = require('./model')

module.exports.resolvers = {
  Query: {
    books: () => books,
  },
};