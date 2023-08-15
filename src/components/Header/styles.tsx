import { inputBaseClasses } from "@mui/material";
import svgIconClasses from "@mui/material/SvgIcon/svgIconClasses";
import textFieldClasses from "@mui/material/TextField/textFieldClasses";
import generateUtilityClasses from "@mui/material/generateUtilityClasses";
import { styled } from "@mui/material/styles";

import "typeface-satisfy";

export const headerStyleClasses = generateUtilityClasses(
  "headerStylesComponent",
  ["title", "otherContents", "searchStyle", "actionStyles", "favIconActive"]
);

export const Headerstyles = styled("div")(({}) => ({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  height: 70,
  position: "fixed",
  backgroundColor: "black",
  top: 0,
  [`.${headerStyleClasses.title}`]: {
    display: "flex",
    alignItems: "center",
    fontSize: 50,
    color: "red",
    fontFamily: "Satisfy",
    justifyContent: "space-evenly",
  },

  [`.${headerStyleClasses.otherContents}`]: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    fontSize: 20,
    color: "white",
    gap: 10,
    marginRight: "10%",
    fontFamily: "Preahvihear",
  },

  [`& .${headerStyleClasses.actionStyles}`]: {
    alignItems: "center",
    justifyContent: "space-evenly",

    [`& .${svgIconClasses.root}`]: { color: "white", cursor: "pointer" },
    [`& .${headerStyleClasses.searchStyle}`]: {
      display: "flex",
      alignItems: "center",
    },
    [`& .${headerStyleClasses.favIconActive}`]: {
      [`&.${svgIconClasses.root}`]: { color: "red", cursor: "pointer" },
    },
  },

  [`& .${textFieldClasses.root}`]: {
    backgroundColor: "white",
    borderRadius: 20,
    width: "100%",

    [`& .${inputBaseClasses.input}`]: { padding: 10 },
  },
}));
