// Default imports

import { useState } from "react";

// Third-party imports

import { useLazyQuery } from "@apollo/client";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// Query from constants

import { Query } from "../constants";

// Action creator to fetch the books

import { fetchNextBooks, keywordCreation } from "../store/actions/books";

const useListing = () => {
  const { sorted, index, keyword, filterState, loading } = useSelector(
    (state) => state.books
  );
  let [pageCount, setPageCount] = useState(index);
  const [searchparams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const navigateToDetailPage = (id) => {
    nav(`/details/${id}`);
  };

  const [
    fetchBookData,
    { data: bookData, error: error, loading: fetchingData },
  ] = useLazyQuery(Query.GET_ALL_BOOKS);

  const fetchBooks = (name, index) => {
    console.log(name);
    fetchBookData({
      variables: {
        input: name,
        pageID: index,
        filterParam: filterState,
      },
    });
  };

  const fetchNext = (e, value) => {
    let newIndex = value * 10;
    if (value === 1) {
      newIndex = 1;
    }

    dispatch(fetchNextBooks(newIndex));
    setPageCount(value);
    console.log(
      index,
      "fetch next from use listing trigggred",
      pageCount,
      "before pageCount"
    );
    const latestKey = searchparams.get("keyword");
    setSearchParams({
      keyword: latestKey,
      index: newIndex,
      filter: filterState,
    });
    fetchBooks(latestKey, newIndex);

    setTimeout(() => {
      window.scrollTo(0, 0);
    }, 1500);
  };

  const reFetchData = (name, index, filter) => {
    fetchBookData({
      variables: {
        input: name,
        pageID: parseInt(index),
        filterParam: filter,
      },
    });
    dispatch(fetchNextBooks(index));
    dispatch(keywordCreation(name));
  };
  const pageID = searchparams.get("index");

  return {
    index,
    sorted,
    navigateToDetailPage,
    pageCount,
    fetchNext,
    bookData,
    dispatch,
    searchparams,
    reFetchData,
    pageID,
    loading,
  };
};

export default useListing;
