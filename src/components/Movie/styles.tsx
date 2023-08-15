import { buttonBaseClasses, svgIconClasses } from "@mui/material";
import Box from "@mui/material/Box";
import generateUtilityClasses from "@mui/material/generateUtilityClasses";
import { styled } from "@mui/material/styles";
import "typeface-satisfy";
import "typeface-raleway";

export const movieDetailComponentClasses = generateUtilityClasses(
  "movieDetailComponent",
  ["moviePoster", "youtubePlayer", "movieDetails", "buttonBox"]
);
export const MovieDetailComponent = styled(Box)(({}) => ({
  display: "flex",
  flexDirection: "row",

  [`& .${movieDetailComponentClasses.moviePoster}`]: {
    flexDirection: "column",
    backgroundSize: "cover",
    backgroundPosition: "center",
    justifyContent: "end",
    height: "500px",
  },

  [`& .${movieDetailComponentClasses.youtubePlayer}`]: {
    justifyContent: "center",
    [`& .${buttonBaseClasses.root}`]: {
      cursor: "pointer",
      display: "flex",
      alignSelf: "baseline",
      minWidth: "min-content",
      backgroundColor: "black",

      [`& .${svgIconClasses.root}`]: { color: "white" },
    },
  },

  [`& .${movieDetailComponentClasses.movieDetails}`]: {
    color: "white",
    padding: 10,
    background: "linear-gradient(to bottom, transparent, black)",
    flexDirection: "column",
    fontFamily: "Raleway",

    [`& .${movieDetailComponentClasses.buttonBox}`]: {
      gap: 10,
      [`& .${buttonBaseClasses.root}`]: {
        cursor: "pointer",
        position: "inherit",
        display: "flex",
        color: "black",
        minWidth: "10px",
        gap: 10,
        backgroundColor: "white",
        borderRadius: 10,
        fontFamily: "Raleway",
        [`&:hover`]: {
          color: "white",
          backgroundColor: "black",
          [`& .${svgIconClasses.root}`]: {
            color: "white",
          },
        },

        [`& .${svgIconClasses.root}`]: {
          color: "black",
        },
      },
    },
  },
}));
