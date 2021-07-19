const { ApolloServer } = require('apollo-server');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');


mongoose.connect('mongodb://mongo:27017/maibank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const config = {
    typeDefs, 
    resolvers,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground({})]
};

const server = new ApolloServer(config);

server.listen();

module.exports = config;