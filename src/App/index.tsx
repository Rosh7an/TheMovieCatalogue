import { useEffect, useState } from "react";
import Categories from "../components/Categories";
import Header from "../components/Header";
import Movie from "../components/Movie";
import { AppComponent } from "./styles";
import { MovieType } from "../services/movieData";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { fireStore } from "../config";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Favorite from "../favorite";

export default function App() {
  const [isMovieSelected, setMovieSelected] = useState(false);
  const [movieId, setMovieId] = useState<number>(667538);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFavoriteMovies, setFavoriteMovies] = useState(false);

  console.log(favorites);

  const [categoryNames, setCategoryNames] = useState<string[]>([
    "trending",
    "top-rated",
    "popular",
  ]);

  useEffect(() => {
    if (isFavoriteMovies === true) {
      setCategoryNames(["Favorites"]);
    } else {
      setCategoryNames(["trending", "top-rated", "popular"]);
    }
  }, [isFavoriteMovies]);

  const [isInitiallyRendered, setIsInitiallyRendered] = useState(false);

  const getData = async () => {
    const docRef = doc(fireStore, "favorites", "favoriteMovies");

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const favorites = docSnap.data();

      setFavorites(favorites.key); // Update the state with the retrieved data
      setIsInitiallyRendered(true);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getData();
    };
    fetchData();
  }, []);

  const updateData = async () => {
    await setDoc(doc(fireStore, "favorites", "favoriteMovies"), {
      key: favorites,
    });
  };

  useEffect(() => {
    if (isInitiallyRendered) {
      updateData();
    }
  }, [favorites]);

  return (
    <AppComponent>
      <BrowserRouter>
        <Header
          isFavoriteMovies={isFavoriteMovies}
          setFavoriteMovie={setFavoriteMovies}
        />
        <div style={{ height: 60 }} />
        <Movie
          isMovieSelected={isMovieSelected}
          setMovieSelected={setMovieSelected}
          movieId={movieId}
          favorites={favorites}
          setFavorites={setFavorites}
          isFavoriteMovies={isFavoriteMovies}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/home/movies" />} />
          <Route
            path="home/movies/*"
            element={
              <Categories
                categoryNames={categoryNames}
                setMovieSelected={setMovieSelected}
                setMovieId={setMovieId}
                isFavoriteMovies={isFavoriteMovies}
                favorites={favorites}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </AppComponent>
  );
}
