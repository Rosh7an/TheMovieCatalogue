import axios from "axios";
import React, { useEffect, useState } from "react";
import { API_BASE_URL, Genres_List_URL } from "../constants";

type GenreType = { id: number; name: string };

function GenreList() {
  const [genreList, setGenreList] = useState<GenreType[]>([]);

  const apiKey = process.env.REACT_APP_MOVIE_API_KEY;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/${Genres_List_URL}`, {
          params: { api_key: apiKey },
        });
        setGenreList(response.data.genres);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [API_BASE_URL, apiKey]);
  return genreList;
}

export default GenreList;
