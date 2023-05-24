const axios = require("axios");

const bookQueryResolvers = {
  Query: {
    books: async (parent, args) => {
      const { name } = args;
      try {
        const { data } = await axios.get(
          `https://www.googleapis.com/books/v1/volumes?q=${name}&key=AIzaSyDkzo5BRUkNKq02Md324-U75Jqv_U21DW4`
        );
        return data.items;
      } catch (error) {
        return [{ code: 500, message: "could not fetch the  books" }];
      }
    },
  },
};

module.exports = { bookQueryResolvers };
