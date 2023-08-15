import CloseIcon from "@mui/icons-material/Close";
import FavoriteIcon from "@mui/icons-material/Favorite";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import YouTube from "react-youtube";
import { Discover_Movie_URL, IMAGE_URL } from "../../constants";
import GenreList from "../../services/genresList";
import useMovieData from "../../services/movieData";
import { MovieDetailComponent, movieDetailComponentClasses } from "./styles";

type MovieProps = {
  isMovieSelected: boolean;
  setMovieSelected: React.Dispatch<React.SetStateAction<boolean>>;
  movieId?: number;
  favorites: number[];
  setFavorites: React.Dispatch<React.SetStateAction<number[]>>;
  isFavoriteMovies: boolean;
};
function Movie({
  isMovieSelected,
  setMovieSelected,
  movieId,
  favorites,
  setFavorites,
  isFavoriteMovies,
}: MovieProps) {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [trailerInvoked, setTrailerInvoked] = useState(false);

  const modifyFavorites = (id: number) => {
    if (!favorites.includes(id) && !isFavoriteMovies) {
      setFavorites([...favorites, id]);
    } else {
      setFavorites(favorites.filter((fav) => fav != id));
    }
  };

  console.log(favorites);

  const genreList = GenreList();

  const { movieData } = useMovieData({
    categoryURL: Discover_Movie_URL,
    fetchMovie: false,
  });

  const { selectedMovieData } = useMovieData({
    categoryURL: `/movie/${movieId}?/language=en-US`,
    fetchMovie: true,
  });

  useEffect(() => {
    const interval = setTimeout(() => {
      setCurrentMovieIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % movieData.length;
        return nextIndex;
      });
    }, 5000);

    return () => clearTimeout(interval);
  }, [currentMovieIndex, movieData]);

  if (movieData.length === 0) {
    return null;
  }

  const currentMovie =
    isMovieSelected && selectedMovieData
      ? selectedMovieData
      : movieData[currentMovieIndex];

  const genres =
    isMovieSelected && movieId
      ? currentMovie.genres.map((genre) => genre.name).join(", ")
      : genreList
          ?.filter((genres) => currentMovie?.genre_ids?.includes(genres.id))
          .map((genre) => genre.name)
          .join(", ");

  const selectedMovieVideos = selectedMovieData?.videos.results
    .filter((video) => video.name.includes("Trailer"))
    .map((trailer) => ({
      id: trailer.id,
      name: trailer.name,
      link: `${trailer.key}`,
    }));

  const trailerLink = selectedMovieVideos?.map((video) => video.link);
  {
    console.log();
  }
  return (
    <MovieDetailComponent>
      <Grid
        container
        className={movieDetailComponentClasses.moviePoster}
        style={{
          backgroundImage: `url("${IMAGE_URL}/${currentMovie.backdrop_path}")`,
        }}
      >
        {trailerInvoked && trailerLink && (
          <Grid container className={movieDetailComponentClasses.youtubePlayer}>
            <YouTube videoId={trailerLink[0]} />
            <Button onClick={() => setTrailerInvoked(!trailerInvoked)}>
              <CloseIcon />
            </Button>
          </Grid>
        )}

        {!trailerInvoked && (
          <Grid container className={movieDetailComponentClasses.movieDetails}>
            <div>
              <h1>{currentMovie.title}</h1>

              {isMovieSelected && (
                <Grid
                  container
                  className={movieDetailComponentClasses.buttonBox}
                >
                  <Button onClick={() => setTrailerInvoked(!trailerInvoked)}>
                    <YouTubeIcon />
                    Trailer
                  </Button>
                  <Button onClick={() => modifyFavorites(currentMovie.id)}>
                    <FavoriteIcon />
                    {favorites.includes(currentMovie.id)
                      ? "Remove from Favorites"
                      : "Favorites"}
                  </Button>
                </Grid>
              )}

              <h4>Rating: {currentMovie.vote_average}</h4>
              <h4>Genre: {genres}</h4>
              <h4>Release Date: {currentMovie.release_date}</h4>
              <h5>{currentMovie.overview}</h5>
            </div>
          </Grid>
        )}
      </Grid>
    </MovieDetailComponent>
  );
}

export default Movie;
// link: `${trailer.site.toLocaleLowerCase()}.com/watch?v=${trailer.key}`,
