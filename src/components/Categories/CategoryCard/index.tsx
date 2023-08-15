import Card from "@mui/material/Card";
import { useEffect, useState } from "react";
import {
  API_BASE_URL,
  IMAGE_URL,
  Popular_Movie_List_URL,
  Top_Rated_Movie_List_URL,
  Trending_Movie_URL,
} from "../../../constants";
import FetchMovieData, { MovieType } from "../../../services/movieData";
import { CategoryCardComponent, categoryCardClasses } from "./styles";
import axios from "axios";
import Box from "@mui/material/Box";

type CategoryCardProp = {
  categoryName: string;
  setMovieSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setMovieId: React.Dispatch<React.SetStateAction<number>>;
  isFavoriteMovies: boolean;
  favorites: number[];
};

function CategoryCard({
  categoryName,
  setMovieSelected,
  setMovieId,
  isFavoriteMovies,
  favorites,
}: CategoryCardProp) {
  const [movieDataList, setMovieDataList] = useState<MovieType[]>([]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const apiKey: string = process.env.REACT_APP_MOVIE_API_KEY as string;

  let categoryURL: string;

  switch (categoryName) {
    case "trending":
      categoryURL = Trending_Movie_URL;
      break;
    case "top-rated":
      categoryURL = Top_Rated_Movie_List_URL;
      break;
    case "popular":
      categoryURL = Popular_Movie_List_URL;
      break;
    default:
      categoryURL = Popular_Movie_List_URL;
      break;
  }

  const { movieData } = FetchMovieData({
    categoryURL: categoryURL,
    fetchMovie: false,
  });

  useEffect(() => {
    const fetchData = async () => {
      const selectedMovieDataList: MovieType[] = [];

      try {
        for (const favorite of favorites) {
          const response = await axios.get(
            `${API_BASE_URL}/movie/${favorite}?/language=en-US`,
            {
              params: { api_key: apiKey, append_to_response: "videos" },
            }
          );

          if (response.data) {
            selectedMovieDataList.push(response.data);
          }
        }

        setMovieDataList(selectedMovieDataList);
      } catch (error) {
        console.error(error);
      }
    };

    if (isFavoriteMovies) {
      fetchData();
    }
  }, [API_BASE_URL, apiKey, favorites, isFavoriteMovies]);

  const moviesToShow = isFavoriteMovies ? movieDataList : movieData;

  return (
    <CategoryCardComponent>
      <div className={categoryCardClasses.categoryTitle}>
        {categoryName.toLocaleUpperCase()}
      </div>
      <Box className={categoryCardClasses.cardStyles}>
        {moviesToShow?.map((movie) => (
          <Card
            className={categoryCardClasses.movieCard}
            onClick={() => {
              setMovieSelected(true);
              setMovieId(movie.id);
              scrollToTop();
            }}
            onTouchStart={(e) => e.preventDefault()}
            key={movie.id}
          >
            <img
              src={`${IMAGE_URL}/${movie.poster_path}`}
              className={categoryCardClasses.imageStyles}
            />
          </Card>
        ))}
      </Box>
    </CategoryCardComponent>
  );
}

export default CategoryCard;
