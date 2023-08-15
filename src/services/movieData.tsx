import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "../constants";

type GenreType = { id: string; name: string };
type results = {
  results: [{ id: string; name: string; key: string; site: string }];
};
export type MovieType = {
  adult: boolean;
  backdrop_path: string;
  genres: GenreType[];
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  videos: results;
  vote_average: number;
  vote_count: number;
};

type movieDataProp = {
  categoryURL: string;
  fetchMovie: boolean;
};
 function FetchMovieData({ categoryURL, fetchMovie }: movieDataProp) {
  const [movieData, setMovieData] = useState<MovieType[]>([]);
  const [selectedMovieData, setselectedMovieData] = useState<MovieType>();
  const apiKey: string = process.env.REACT_APP_MOVIE_API_KEY as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${categoryURL}`, {
          params: { api_key: apiKey, append_to_response: "videos" },
        });
        fetchMovie
          ? setselectedMovieData(response.data)
          : setMovieData(response.data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [API_BASE_URL, apiKey, categoryURL]);

  return { movieData, selectedMovieData };
}

export default FetchMovieData;
