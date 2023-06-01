import { configureStore,combineReducers } from "@reduxjs/toolkit";
import booksReducer from "./slices/books.slice";


const reducer = combineReducers({
    books : booksReducer
})

export const store = configureStore({
    reducer
})