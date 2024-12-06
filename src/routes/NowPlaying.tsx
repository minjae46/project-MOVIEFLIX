import { useQuery } from "react-query";
import { getNowPlayingMovies, IGetMoviesResult } from "../api";
import Layout from "../components/Layout";
import MovieBox from "../components/MovieBox";
import { useLocation } from "react-router-dom";

export default function NowPlaying() {
  const { data } = useQuery<IGetMoviesResult>(
    ["nowPlaying"],
    getNowPlayingMovies
  );
  const location = useLocation();

  return (
    <Layout>
      {data?.results.map((movie) => (
        <MovieBox key={movie.id} {...movie} layoutId={location.pathname} />
      ))}
    </Layout>
  );
}
