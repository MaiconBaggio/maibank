const axios = require('axios');

const requestPost = async (query) => {
    const response = await axios.post("http://localhost:4000/graphql", {query: query});
    const {data} = response;
    return data;
}

module.exports = requestPost;