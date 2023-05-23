const bookTypes = `#graphql

type Book{
    id: ID!
    volumeInfo: volumeInfo! 
}

type volumeInfo{
    title: String!
    authors: [String!]
    publishedDate: String!
    description: String
    pageCount: Int!
    imageLinks:imageLinks
}

type imageLinks{
    smallThumbnail: String
    thumbnail: String
}

type Query {
    books(name: String!): [Book!]!
}

`;

module.exports = [bookTypes];
