import { GET_ALL_BOOKS, GET_BOOK } from "../constants/graphQL.queries";
import { marks } from "./filter";

export const Query = {
  GET_ALL_BOOKS,
  GET_BOOK,
};

export const filterMetric = {
  marks,
};
