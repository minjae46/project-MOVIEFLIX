import styled from "styled-components";
import { useQuery } from "react-query";
import { getPopularMovies, IGetMoviesResult } from "../../api";
import { makeImagePath } from "../../utils";
import Loader from "../../components/Loader";
import Slider from "./Slider";

const Wrapper = styled.div``;

const Banner = styled.div<{ backdropimg: string }>`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.backdropimg});
  background-size: cover;
`;

const Title = styled.h1`
  width: 35%;
  margin-bottom: 20px;
  font-size: 55px;
  font-weight: 600;
`;

const Overview = styled.p`
  width: 30%;
  font-size: 17px;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const SliderContainer = styled.div`
  width: 100vw;
  position: absolute;
  top: 90vh;
`;

let sliderList = [
  { title: "최고 인기 영화를 만나보세요", pathKey: "popular" },
  { title: "현재 상영작을 만나보세요", pathKey: "now_playing" },
  { title: "기다림이 아깝지 않은 영화들", pathKey: "upcoming" },
  { title: "별점이 높은 영화들", pathKey: "top_rated" },
];

export default function Home() {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "home"],
    getPopularMovies
  );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Banner
            backdropimg={makeImagePath(data?.results[0].backdrop_path || "")}
          >
            <Title>{data?.results[0].title}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>
          <SliderContainer>
            {sliderList.map((slider, index) => (
              <Slider
                key={index}
                title={slider.title}
                pathKey={slider.pathKey}
              />
            ))}
          </SliderContainer>
        </>
      )}
    </Wrapper>
  );
}
