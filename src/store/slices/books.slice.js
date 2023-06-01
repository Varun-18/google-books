import { createSlice } from "@reduxjs/toolkit";

const state = {
  books: [],
  sorted: [],
  index: 1,
  keyword: null,
  filterState: undefined,
  loading: -1,
};

const bookSlice = createSlice({
  name: "booksSlice",
  initialState: state,
  reducers: {
    setBooks: (state, action) => {
      return { ...state, sorted: action.payload, books: action.payload };
    },
    sortedArray: (state, action) => {
      return { ...state, sorted: action.payload };
    },
    setKeyword: (state, action) => {
      return { ...state, keyword: action.payload };
    },
    increaseIndex: (state, action) => {
      return { ...state, index: action.payload };
    },
    setFilterState: (state, action) => {
      return { ...state, filterState: action.payload };
    },
    changeLoading: (state, action) => {
      return { ...state, loading: action.payload };
    },
  },
});

export const {
  setBooks,
  sortedArray,
  setKeyword,
  increaseIndex,
  setFilterState,
  changeLoading,
} = bookSlice.actions;
export default bookSlice.reducer;
