import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import useSerach from "../talons/useSerach";
import _ from "lodash";

// MUI imports

import SearchIcon from "@mui/icons-material/Search";
import { Box, Button, TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Slider from "@mui/material/Slider";

// Custom CSS
import css from "../assets/css/bookApp.module.css";
import { filterMetric } from "../constants";
import { changeLoading } from "../store/slices/books.slice";

export const Serach = () => {
  const {
    fetchBooks,
    bookData,
    dispatch,
    setData,
    handleChange,
    filterByPrice,
    sort,
    searchparams,
    filterFromBackend,
    fetchBookData,
    reFetchBookData,
    function2,
  } = useSerach();
  const { register, handleSubmit, setValue } = useForm();

  const key = searchparams.get("keyword");
  const index = searchparams.get("index");
  const filter = searchparams.get("filter");

  console.log(key, filter, index, "*********");

  // useEffect(() => {
  //   if (key) {
  //     fetchBookData({
  //       variables: {
  //         input: key,
  //         pageID: parseInt(index),
  //       },
  //     });
  //   }
  // }, []);

  useEffect(() => {
    if (key) {
      function2(key, index, filter);
      setValue("name", key);
    }
    if (_.size(bookData) > 0) {
      console.log(
        "tried to set the data from sueeffect of Search.jsx",
        bookData.length
      );
      dispatch(setData(bookData.books));
      dispatch(changeLoading(0));
    }
  }, [bookData, key]);

  return (
    <div className={css.Wrapper}>
      <form
        action=""
        onSubmit={handleSubmit(fetchBooks)}
        style={{ display: "flex", width: "100%", margin: "20px auto" }}
      >
        <TextField
          variant="outlined"
          label="Search for books"
          type="text"
          {...register("name")}
          sx={{ flexGrow: 1 }}
        />
        <Button variant="outlined" type="submit">
          <SearchIcon />
        </Button>
      </form>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Sorting</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={(event) => handleChange(event)}
            sx={{ width: "32%" }}
            // defaultValue={}
            label="Sorting"
          >
            <MenuItem value={"p_h_l"}>Price - High to Low</MenuItem>
            <MenuItem value={"p_l_h"}>Price - Low to High</MenuItem>
            <MenuItem value={"r_h_l"}>Rating - High to Low</MenuItem>
            <MenuItem value={"r_l_h"}>Rating - Low to High</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label2" sx={{ marginLeft: "68%" }}>
            Filter
          </InputLabel>
          <Select
            labelId="demo-simple-select-label2"
            id="demo-simple-select"
            onChange={(event) => filterFromBackend(event.target.value)}
            sx={{ width: "32%", marginLeft: "68%" }}
            defaultValue={filter}
            label="Filter"
          >
            <MenuItem value={"undefined"} disabled={true}>
              No Filter
            </MenuItem>
            <MenuItem value={"paid-ebooks"}>Paid books</MenuItem>
            <MenuItem value={"free-ebooks"}>Free books</MenuItem>
            <MenuItem value={"full"}>Full text availabe </MenuItem>
            <MenuItem value={"partial"}>Only partial text</MenuItem>
            <MenuItem value={"ebooks"}>Only Google ebooks</MenuItem>
          </Select>
        </FormControl>

        {/* <Slider
            step={null}
            defaultValue={0}
            marks={filterMetric.marks}
            onChange={(event) => filterByPrice(event)}
            sx={{ width: "50%", mr: 5 }}
          /> */}
      </Box>
    </div>
  );
};
