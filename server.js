const { ApolloServer, gql } = require('apollo-server');
const  { ApolloServerPluginLandingPageGraphQLPlayground,
         ApolloServerPluginLandingPageDisabled } = require('apollo-server-core');
const users = require('./modules/users')
const modules = [
    users
]
const server = new ApolloServer( {
    modules,
    plugins: [
        process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
        : ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});