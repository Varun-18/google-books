// Custom hook

import useDetail from "../talons/useDetail";

// MUI imports

import { Button } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import _ from "lodash";

// CSS

import css from "../assets/css/bookApp.module.css";
import { Rating } from "react-simple-star-rating";

export const BookDetail = () => {
  const {
    bookDetail,
    bookDetailError,
    detailsLoading,
    description,
    show,
    toggleShow,
  } = useDetail();
  console.log(bookDetail);

  return (
    <div className={css.pdp_Wrapper}>
      {detailsLoading ? (
        <div>
          <Backdrop open={detailsLoading}>
            <CircularProgress />
          </Backdrop>
        </div>
      ) : (
        <div>
          {bookDetail ? (
            <div style={{ display: "flex" }}>
              <div className={css.image_container}>
                <img
                  className={css.pdp_image}
                  src={
                    bookDetail.book.volumeInfo.imageLinks
                      ? bookDetail.book.volumeInfo.imageLinks.thumbnail
                        ? bookDetail.book.volumeInfo.imageLinks.thumbnail
                        : ""
                      : ""
                  }
                  alt=""
                />
              </div>
              <div className={css.content}>
                <h1>{bookDetail.book.volumeInfo.title}</h1>
                <div
                  className={css.description}
                  dangerouslySetInnerHTML={{
                    __html: description,
                  }}
                />
                <Button onClick={toggleShow}>
                  show {show ? "less " : "more"}
                </Button>
                <table className={css.pdp_details_table}>
                  <tbody>
                    <tr>
                      <td>Rating:</td>
                      <td className={css.pdp_dynamic_data}>
                        {
                          <Rating
                            size={"15px"}
                            readonly={true}
                            initialValue={
                              bookDetail.book.volumeInfo.averageRating
                            }
                          />
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Page Count : </td>
                      <td className={css.pdp_dynamic_data}>
                        {bookDetail.book.volumeInfo.pageCount &&
                          bookDetail.book.volumeInfo.pageCount}
                      </td>
                    </tr>
                    <tr>
                      <td>Published Date : </td>
                      <td className={css.pdp_dynamic_data}>
                        {bookDetail.book.volumeInfo.publishedDate &&
                          bookDetail.book.volumeInfo.publishedDate}
                      </td>
                    </tr>
                    <tr>
                      <td>Price :</td>
                      <td className={css.pdp_dynamic_data}>
                        {bookDetail.book.saleInfo.retailPrice
                          ? bookDetail.book.saleInfo.retailPrice.amount + " INR"
                          : " Unavailable"}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div className={css.authors}>
                  <h4>Authors</h4>
                  <ol>
                    {_.size(bookDetail.book.volumeInfo.authors) > 0 &&
                      bookDetail.book.volumeInfo.authors.map((author) => (
                        <li>{author}</li>
                      ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            <div>"no data found"</div>
          )}
          {bookDetailError ? (
            <div>{JSON.stringify(bookDetailError)}</div>
          ) : null}
        </div>
      )}
    </div>
  );
};
