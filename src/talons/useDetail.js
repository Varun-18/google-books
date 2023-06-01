import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Query } from "../constants";

const useDetail = () => {
  const { id } = useParams();
  let [show, setShow] = useState(false);
  const {
    data: bookDetail,
    error: bookDetailError,
    loading: detailsLoading,
  } = useQuery(Query.GET_BOOK, {
    variables: {
      bookId: id,
    },
  });
  let description = null;

  if (bookDetail) {
    if (show) {
      description = bookDetail.book.volumeInfo.description;
    } else {
      description = bookDetail.book.volumeInfo.description.slice(0, 500)+". . . . .";
    }
  }

  const toggleShow = () => {
    setShow(!show);
  };

  return {
    bookDetail,
    bookDetailError,
    detailsLoading,
    description,
    show,
    toggleShow,
  };
};

export default useDetail;
