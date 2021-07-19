const { fileLoader, mergeTypes } = require('merge-graphql-schemas');
const path = require('path');

const typesArray = fileLoader(path.join(__dirname, './typesDefs', "**", "*.graphql"));

module.exports = mergeTypes(typesArray, { all: true });