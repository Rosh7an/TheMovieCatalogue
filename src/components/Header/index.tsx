import FavoriteIcon from "@mui/icons-material/Favorite";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { Headerstyles, headerStyleClasses } from "./styles";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink, Navigate } from "react-router-dom";
// import {ReactComponent as AppIcon} from "../../assets/AppIcon.webp";
type HeaderProps = {
  isFavoriteMovies: boolean;
  setFavoriteMovie: React.Dispatch<React.SetStateAction<boolean>>;
};
function Header({ isFavoriteMovies, setFavoriteMovie }: HeaderProps) {
  return (
    <Headerstyles>
      <Grid xs={12} item display={"flex"} flexDirection={"row"}>
        <Grid container className={headerStyleClasses.title} xs={8} item>
          <img
            src={require("../../assets/play.png")}
            alt="app-icon"
            height={"50px"}
          />
          The Movie Catalogue
        </Grid>
        <Grid container className={headerStyleClasses.actionStyles} xs={4} item>
          <Grid className={headerStyleClasses.searchStyle}>
            <TextField />
            <SearchIcon color="primary" fontSize="large" />
          </Grid>
          <Grid onClick={() => setFavoriteMovie(!isFavoriteMovies)}>
            <FavoriteIcon
              fontSize="large"
              className={
                isFavoriteMovies ? headerStyleClasses.favIconActive : ""
              }
            />
            {isFavoriteMovies ? (
              <Navigate to={"home/movies/favorites"} />
            ) : (
              <Navigate to="home/movies" />
            )}
          </Grid>
          <AccountCircleIcon color="primary" fontSize="large" />
        </Grid>
      </Grid>
    </Headerstyles>
  );
}

export default Header;
