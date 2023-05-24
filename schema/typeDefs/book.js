const bookTypes = `#graphql

type Book{
    id: ID!
    volumeInfo: volumeInfo! 
    saleInfo: SaleInfo
}

type SaleInfo{
    retailPrice:Price
}

type volumeInfo{
    title: String!
    authors: [String!]
    publishedDate: String!
    description: String
    pageCount: Int!
    imageLinks:imageLinks
    averageRating: Float
}

type imageLinks{
    smallThumbnail: String
    thumbnail: String
}

type Price{
    amount: Float!
    currencyCode: String!
}

type Query {
    books(name: String!): [Book!]!
}

`;

module.exports = [bookTypes];
