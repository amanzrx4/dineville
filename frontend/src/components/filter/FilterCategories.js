import * as React from "react";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import { axiosInstance } from "../../util/axiosConfig";
import { useQuery } from "@tanstack/react-query";

const ListItem = styled("li")(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

export default function FilterCategories({
  selectedCategories,
  setSelectedCategories,
}) {
  const {
    isLoading,
    isError,
    data: categories,
    error,
  } = useQuery(["categories"], () => axiosInstance.get("api/categories"));

  const handleSelect = (id) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories((prev) => prev.filter((item) => item !== id));
      return console.log("selected", selectedCategories);
    }

    return setSelectedCategories((prev) => [...prev, id]);
  };

  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        listStyle: "none",
        p: 0.5,
        m: 0,
      }}
      component="ul"
    >
      {categories &&
        categories.data.map((data) => {
          return (
            <ListItem key={data._id} onClick={() => handleSelect(data._id)}>
              <Chip
                variant={
                  selectedCategories.includes(data._id) ? "filled" : "outlined"
                }
                label={data.name}
              />
            </ListItem>
          );
        })}
    </Paper>
  );
}
