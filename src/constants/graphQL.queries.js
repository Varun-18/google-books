import { gql } from "@apollo/client";

export const GET_ALL_BOOKS = gql`
  query fetchBooks($input: String!, $pageID: Int!, $filterParam: String) {
    books(name: $input, index: $pageID ,filter: $filterParam) {
      id
      volumeInfo {
        title
        authors
        publishedDate
        description
        pageCount
        imageLinks {
          thumbnail
        }
        averageRating
      }
      saleInfo {
        retailPrice {
          amount
        }
      }
    }
  }
`;

export const GET_BOOK = gql`
  query getBook($bookId: ID!) {
    book(id: $bookId) {
      id
      volumeInfo {
        title
        authors
        description
        imageLinks {
          thumbnail
        }
        averageRating
        pageCount
        publishedDate
      }
      saleInfo {
        retailPrice {
          amount
        }
      }
    }
  }
`;
