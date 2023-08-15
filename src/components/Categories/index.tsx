import { MovieType } from "../../services/movieData";
import CategoryCard from "./CategoryCard";

type CategoriesProp = {
  categoryNames: string[];

  setMovieSelected: React.Dispatch<React.SetStateAction<boolean>>;
  setMovieId: React.Dispatch<React.SetStateAction<number>>;
  isFavoriteMovies: boolean;
  favorites: number[];
};
function Categories({
  categoryNames,
  setMovieSelected,
  setMovieId,
  isFavoriteMovies,
  favorites,
 
}: CategoriesProp) {
  return (
    <>
      {categoryNames.map((category) => (
        <CategoryCard
          categoryName={category}
          setMovieSelected={setMovieSelected}
          setMovieId={setMovieId}
          isFavoriteMovies={isFavoriteMovies}
          favorites={favorites}
         
        />
      ))}
    </>
  );
}

export default Categories;
