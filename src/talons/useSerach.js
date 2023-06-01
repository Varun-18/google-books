// Third-party imports

import { useLazyQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";

// Action Creators

import {
  setData,
  setSorted,
  setFiltered,
  keywordCreation,
  fetchNextBooks,
  setDefaultFilter,
} from "../store/actions/books";

// Constants

import { Query } from "../constants";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { changeLoading } from "../store/slices/books.slice";

const useSerach = () => {
  const { books, sorted, index, keyword, filterState } = useSelector(
    (state) => state.books
  );
  const dispatch = useDispatch();
  let [sort, setSort] = useState(null);
  let [filter, setFilter] = useState(null);
  const [searchparams, setSearchParams] = useSearchParams();
  // let [keyword, setKeyword] = useState(null);
  const nameParam = searchparams.get("keyword");
  const indexParam = searchparams.get("index");
  const filterParam = searchparams.get("filter");

  const [
    fetchBookData,
    {
      data: bookData,
      error: error,
      loading: fetchingData,
      refetch: reFetchBookData,
    },
  ] = useLazyQuery(Query.GET_ALL_BOOKS);

  const fetchBooks = ({ name }) => {
    console.log(index);

    fetchBookData({
      variables: {
        input: name,
        pageID: index,
        filterParam: filterState,
      },
    });
    setSort(null);
    // setKeyword(name);
    dispatch(fetchNextBooks(1));
    dispatch(keywordCreation(name));
    setSearchParams({ keyword: name, index: index, filter: filterState });
  };

  const function2 = (name, index, filter) => {
    console.log(name, index, filter);
    fetchBookData({
      variables: {
        input: name,
        pageID: parseInt(index),
        filterParam: filter,
      },
    });
  };

  const filterFromBackend = (value) => {
    console.log(value);

    fetchBookData({
      variables: {
        input: keyword,
        pageID: index,
        filterParam: value,
      },
    });
    dispatch(setDefaultFilter(value));
    setSearchParams({ keyword: nameParam, index: indexParam, filter: value });
  };

  const priceHighToLow = (a, b) => {
    if (a.saleInfo.retailPrice !== null && b.saleInfo.retailPrice !== null) {
      if (a.saleInfo.retailPrice.amount > b.saleInfo.retailPrice.amount) {
        return -1;
      } else if (
        a.saleInfo.retailPrice.amount < b.saleInfo.retailPrice.amount
      ) {
        return 1;
      } else {
        return 0;
      }
    } else if (a.saleInfo.retailPrice === null) {
      return 1;
    } else if (b.saleInfo.retailPrice === null) {
      return -1;
    } else {
      return 0;
    }
  };

  const priceLowToHigh = (a, b) => {
    if (a.saleInfo.retailPrice !== null && b.saleInfo.retailPrice !== null) {
      if (a.saleInfo.retailPrice.amount > b.saleInfo.retailPrice.amount) {
        return 1;
      } else if (
        a.saleInfo.retailPrice.amount < b.saleInfo.retailPrice.amount
      ) {
        return -1;
      } else {
        return 0;
      }
    } else if (a.saleInfo.retailPrice === null) {
      return -1;
    } else if (b.saleInfo.retailPrice === null) {
      return 1;
    } else {
      return 0;
    }
  };

  const ratingHighToLow = (a, b) => {
    if (
      a.volumeInfo.averageRating !== null &&
      b.volumeInfo.averageRating !== null
    ) {
      if (a.volumeInfo.averageRating > b.volumeInfo.averageRating) {
        return -1;
      } else if (a.volumeInfo.averageRating < b.volumeInfo.averageRating) {
        return 1;
      } else {
        return 0;
      }
    } else if (a.volumeInfo.averageRating === null) {
      return 1;
    } else if (b.volumeInfo.averageRating === null) {
      return -1;
    } else {
      return 0;
    }
  };

  const ratingLowToHigh = (a, b) => {
    if (
      a.volumeInfo.averageRating !== null &&
      b.volumeInfo.averageRating !== null
    ) {
      if (a.volumeInfo.averageRating > b.volumeInfo.averageRating) {
        return 1;
      } else if (a.volumeInfo.averageRating < b.volumeInfo.averageRating) {
        return -1;
      } else {
        return 0;
      }
    } else if (a.volumeInfo.averageRating === null) {
      return -1;
    } else if (b.volumeInfo.averageRating === null) {
      return 1;
    } else {
      return 0;
    }
  };

  const handleChange = (e) => {
    const sort = e.target.value;
    let sorted2 = [...sorted];
    if (sort === "p_h_l") {
      sorted2 = sorted2.sort(priceHighToLow);
      dispatch(setSorted(sorted2));
    } else if (sort === "p_l_h") {
      sorted2 = sorted2.sort(priceLowToHigh);
      dispatch(setSorted(sorted2));
    } else if (sort === "r_l_h") {
      sorted2 = sorted2.sort(ratingLowToHigh);
      dispatch(setSorted(sorted2));
    } else if (sort === "r_h_l") {
      sorted2 = sorted2.sort(ratingHighToLow);
      dispatch(setSorted(sorted2));
    }
    setSort(sort);
  };

  const filterByPrice = (e) => {
    const range = e.target.value;
    let filtered = _.union(sorted, books);
    if (filtered.length === 0) {
      filtered = [...books];
    }
    if (range === 0) {
      filtered = _.union(sorted, books);
      if (sort !== null) {
        applySortManually(sort, books);
      } else {
        dispatch(setFiltered(filtered));
      }
    } else if (range === 25) {
      filtered = filtered.filter(
        (item) =>
          item.saleInfo.retailPrice !== null &&
          item.saleInfo.retailPrice.amount <= 500
      );
      if (sort !== null) {
        applySortManually(sort, filtered);
      } else {
        dispatch(setFiltered(filtered));
      }
      // dispatch(setFiltered(filtered));
    } else if (range === 50) {
      filtered = filtered.filter(
        (item) =>
          item.saleInfo.retailPrice !== null &&
          item.saleInfo.retailPrice.amount <= 1000
      );
      if (sort !== null) {
        applySortManually(sort, filtered);
      } else {
        dispatch(setFiltered(filtered));
      }
      // dispatch(setFiltered(filtered));
    } else if (range === 75) {
      filtered = filtered.filter(
        (item) =>
          item.saleInfo.retailPrice !== null &&
          item.saleInfo.retailPrice.amount <= 2000
      );
      if (sort !== null) {
        applySortManually(sort, filtered);
      } else {
        dispatch(setFiltered(filtered));
      }
      // dispatch(setFiltered(filtered));
    } else if (range === 100) {
      filtered = filtered.filter(
        (item) =>
          item.saleInfo.retailPrice !== null &&
          item.saleInfo.retailPrice.amount >= 2000
      );
      if (sort !== null) {
        applySortManually(sort, filtered);
      } else {
        dispatch(setFiltered(filtered));
      }
      // dispatch(setFiltered(filtered));
    }
  };

  const applySortManually = (sort, array) => {
    let sorted2 = [...array];
    if (sort === "p_h_l") {
      sorted2 = sorted2.sort(priceHighToLow);
      dispatch(setSorted(sorted2));
    } else if (sort === "p_l_h") {
      sorted2 = sorted2.sort(priceLowToHigh);
      dispatch(setSorted(sorted2));
    } else if (sort === "r_l_h") {
      sorted2 = sorted2.sort(ratingLowToHigh);
      dispatch(setSorted(sorted2));
    } else if (sort === "r_h_l") {
      sorted2 = sorted2.sort(ratingHighToLow);
      dispatch(setSorted(sorted2));
    }
  };

  useEffect(() => {
    if (fetchingData) {
      dispatch(changeLoading(1));
    }
  }, [fetchingData]);

  return {
    fetchBooks,
    bookData,
    dispatch,
    setData,
    handleChange,
    filterByPrice,
    sort,
    keyword,
    filterFromBackend,
    searchparams,
    fetchBookData,
    reFetchBookData,
    function2,
  };
};

export default useSerach;
