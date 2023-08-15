import { Box, generateUtilityClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import "typeface-raleway";

export const categoryCardClasses = generateUtilityClasses(
  "categoryCardComponent",
  ["categoryTitle", "cardStyles", "imageStyles", "movieCard"]
);
export const CategoryCardComponent = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "column",
  flexWrap: "wrap",
  overflowX: "scroll",
  overflowY: "hidden",
  [`& .${categoryCardClasses.categoryTitle}`]: {
    color: "white",
    padding: 10,
    fontSize: 20,
    fontFamily: "Raleway",
  },
  [`& .${categoryCardClasses.cardStyles}`]: {
    display: "flex",
    flexDirection: "row",

    width: "fit-content",
  },
  [`& .${categoryCardClasses.movieCard}`]: {
    backgroundColor: "inherit",
    cursor: "pointer",
    transition: "transform 0.3s ease",
    [`&:hover`]: {
      transform: "perspective(500px) translateZ(50px)",
      position: "inherit",
    },
  },
  [`& .${categoryCardClasses.imageStyles}`]: {
    height: "400px",
    borderRadius: 20,
    padding: 10,
  },
}));
