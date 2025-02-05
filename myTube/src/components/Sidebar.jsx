import React from "react";
import { Stack } from "@mui/material";
import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { sx: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category, index) => {
        return (
          <button
            onClick={() => {
              setSelectedCategory(category.name);
            }}
            key={index}
            className="category-btn"
            style={{
              background: category.name === selectedCategory && "#FC1503",
              color: "white",
            }}
          >
            <span
              style={{
                color: category.name === selectedCategory ? "white" : "red",
                marginRight: "15px",
              }}
            >
              {" "}
              {<category.icon />}{" "}
            </span>
            <span> {category.name} </span>
          </button>
        );
      })}
    </Stack>
  );
};

export default Sidebar;
