// Action creators from the slice

import {
  setBooks,
  sortedArray,
  setKeyword,
  increaseIndex,
  setFilterState,
} from "../slices/books.slice";

export const setData = (data) => (dispatch) => {
  try {
    dispatch(setBooks(data));
  } catch (error) {
    console.log(error);
  }
};

export const setSorted = (data) => (dispatch) => {
  try {
    dispatch(sortedArray(data));
  } catch (error) {
    console.log(error);
  }
};

export const keywordCreation = (keyword) => (dispatch) => {
  try {
    dispatch(setKeyword(keyword));
  } catch (error) {
    console.log(error);
  }
};

export const setFiltered = (data) => (dispatch) => {
  try {
    dispatch(sortedArray(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchNextBooks = (index) => (dispatch) => {
  try {
    dispatch(increaseIndex(index));
  } catch (error) {
    console.log(error);
  }
};

export const setDefaultFilter = (data) => (dispatch) => {
  try {
    dispatch(setFilterState(data));
  } catch (error) {
    console.log(error);
  }
};


