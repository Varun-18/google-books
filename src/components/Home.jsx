import React from "react";
import { BookListing } from "./BookListing";
import { Serach } from "./Serach";

export const Home = () => {
  return (
    <div>
      <Serach />
      <BookListing />
    </div>
  );
};
