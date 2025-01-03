import { useSearchParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getSearchedMovies, IGetMoviesResult } from "../api";
import Layout from "../components/Layout";
import MovieBox from "../components/MovieBox";

export default function Search() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword");

  const { data } = useQuery<IGetMoviesResult>(["search", keyword], () =>
    getSearchedMovies(keyword || "")
  );

  return (
    <Layout>
      {data?.results.map((movie) => (
        <MovieBox key={movie.id} {...movie} layoutId={keyword || ""} />
      ))}
    </Layout>
  );
}
