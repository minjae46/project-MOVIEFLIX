import { useQuery } from "react-query";
import { getPopularMovies, IGetMoviesResult } from "../api";
import Layout from "../components/Layout";
import MovieBox from "../components/MovieBox";
import { useLocation } from "react-router-dom";

export default function Popular() {
  const { data } = useQuery<IGetMoviesResult>(["popular"], getPopularMovies);
  const location = useLocation();

  return (
    <Layout>
      {data?.results.map((movie) => (
        <MovieBox key={movie.id} {...movie} layoutId={location.pathname} />
      ))}
    </Layout>
  );
}
