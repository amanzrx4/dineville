import React, { useState } from "react";
import { axiosInstance } from "../util/axiosConfig";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { CircularProgress, Typography } from "@mui/material";
import Dishcard from "./UI/Dishcard";
import FilterCategories from "./filter/FilterCategories";
const Explore = () => {
  function addToCart() {
    console.log("added to cart");
  }

  const [selectedCategories, setSelectedCategories] = useState([]);

  const {
    isLoading,
    isError,
    data: dishes,
    error,
  } = useQuery(["dishes", selectedCategories], () => {
    return axiosInstance.get("api/dishes", {
      params: {
        ...(selectedCategories && { categories: selectedCategories }),
      },
    });
  });

  return (
    <>
      <FilterCategories
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      {isLoading ? (
        <CircularProgress />
      ) : isError ? (
        <span>{error.response.data.error.message}</span>
      ) : dishes.data.length > 0 ? (
        dishes.data.map((data) => (
          <Dishcard key={data._id} dish={data} addToCart={addToCart} />
        ))
      ) : (
        <Typography sx={{ color: "blue" }}>No dishes</Typography>
      )}
    </>
  );
  /* 
  if (isLoading) return <CircularProgress />;

  if (isError) {
    console.log("rrror", error)
    return <span>{error.response.data.error.message}</span>;
  }

  return (
    <>
      

      {filterDishes(dishes.data).length > 0 ? (
        filterDishes(dishes.data).map((data) => (
          <Dishcard key={data._id} dish={data} addToCart={addToCart} />
        ))
      ) : (
        <Typography sx={{ color: "blue" }}>No dishes</Typography>
      )}
    </>
  ); */
};

export default Explore;
