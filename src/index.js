const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


mongoose.connect('mongodb://mongo:27017/maibank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const server = new ApolloServer({
    typeDefs, 
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]
});

server.listen();