import _ from "lodash";
import React, { useEffect } from "react";
import useListing from "../talons/useListing";

// MUI imports

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// Star Rating

import { Rating } from "react-simple-star-rating";

// Custom CSS

import css from "../assets/css/bookApp.module.css";
import useSerach from "../talons/useSerach";
import { Pagination, Stack } from "@mui/material";
import { setData } from "../store/actions/books";

export const BookListing = () => {
  const {
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
  } = useListing();
  console.log(loading);

  // const key = searchparams.get("keyword");
  // const indexParam = searchparams.get("index");
  // const filter = searchparams.get("filter");

  useEffect(() => {
    // if (key) {
    //   reFetchData(key, indexParam, filter);
    // }
    if (_.size(bookData) > 0) {
      dispatch(setData(bookData.books));
    }
  }, [bookData]);

  return (
    <div className={css.Wrapper}>
      {sorted.length > 0 ? (
        <div style={{ margin: "25px auto" }}>
          {_.size(sorted) > 0 ? (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {sorted.map((book) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                  <Card sx={{ textAlign: "left" }}>
                    <CardMedia
                      sx={{ height: "250px", width: 200, margin: "0 auto" }}
                      image={
                        book.volumeInfo.imageLinks
                          ? book.volumeInfo.imageLinks.thumbnail
                          : ""
                      }
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {book.volumeInfo.title.length > 20
                          ? book.volumeInfo.title.substring(0, 18) + "..."
                          : book.volumeInfo.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {book.volumeInfo.description &&
                          book.volumeInfo.description.substring(0, 80) + "..."}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Price :{" "}
                        {book.saleInfo.retailPrice
                          ? book.saleInfo.retailPrice.amount
                          : null}{" "}
                        INR
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        Author :{" "}
                        {book.volumeInfo.authors
                          ? book.volumeInfo.authors[0]
                          : null}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 2 }}
                      >
                        <Rating
                          size={"15px"}
                          readonly={true}
                          initialValue={book.volumeInfo.averageRating}
                        />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        onClick={() => navigateToDetailPage(book.id)}
                      >
                        SHOW DETAILS
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          ) : (
            // <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            //   No books found in the particular filter type
            // </Typography>
            <CircularProgress />
          )}
        </div>
      ) : loading === 1 ? (
        <CircularProgress />
      ) : (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No books found
        </Typography>
      )}
      {_.size(sorted) > 0 ? (
        <Stack spacing={2} sx={{ textAlign: "center" }}>
          <Pagination
            count={10}
            page={pageID && parseInt(pageID / 10) === 0 ? 1 : pageID / 10}
            onChange={(event, value) => fetchNext(event, value)}
          />
        </Stack>
      ) : null}

      {/* {loading ? <CircularProgress /> : null} */}
    </div>
  );
};
