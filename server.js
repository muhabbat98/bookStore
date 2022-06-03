// @ts-nocheck
const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer,ApolloServerPluginLandingPageGraphQLPlayground,ApolloServerPluginLandingPageDisabled } = require( 'apollo-server-core');
const express = require( 'express');
const http = require( 'http');
const users = require( './modules/users' );
const resources = require('./modules/resources')
const {fileController, fileUrl} = require('./modules/files')
const modules = [
  users,
  resources
];
async function startApolloServer ( modules )
{
  const app = express();
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    modules,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer }),process.env.NODE_ENV === 'production'
        ? ApolloServerPluginLandingPageDisabled()
      : ApolloServerPluginLandingPageGraphQLPlayground(), ],
    context: ({req}) =>({token: req.headers.token||''})
   
  } );
  app.use('/uploads',express.static('./uploads'))
  app.post( '/files',fileUrl, fileController );
  await server.start();
  server.applyMiddleware({ app });
  await new Promise( resolve => httpServer.listen( { port: 4000 }, resolve ) );
  
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(modules)