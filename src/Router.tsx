import { useMemo, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import Favorite from "./favorite";

export default function AppRouter() {
  const [isFavoriteMovies, setFavoriteMovies] = useState(false);
  const pathURL = useMemo(() => {
    const urlPath = isFavoriteMovies ? "home/favorite-movies" : "home/*";
    return urlPath;
  }, [isFavoriteMovies]);

  console.log(pathURL);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={pathURL} replace />} />

        <Route
          index
          element={
            <App
              isFavoriteMovies={isFavoriteMovies}
              setFavoriteMovies={setFavoriteMovies}
            />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
