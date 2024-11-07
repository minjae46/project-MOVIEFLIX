import styled from "styled-components";
import { useQuery } from "react-query";
import { getHomeMovies, IGetMoviesResult, IMovie } from "../api";
import { makeImagePath } from "../utils";
import Loader from "../components/Loader";

const Wrapper = styled.div``;

const Banner = styled.div<{ backdropImg: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.backdropImg});
  background-size: cover;
`;

const Title = styled.h1`
  width: 35%;
  margin-bottom: 20px;
  font-size: 50px;
`;

const Overview = styled.p`
  width: 35%;
  font-size: 18px;
  line-height: 1.2;
`;

export default function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getHomeMovies
  );
  console.log(data);
  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <Banner
          backdropImg={makeImagePath(data?.results[0].backdrop_path || "")}
        >
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </Banner>
      )}
    </Wrapper>
  );
}
