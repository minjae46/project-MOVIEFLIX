import styled from "styled-components";
import { useQuery } from "react-query";
import { getPopularMovies, IGetMoviesResult } from "../api";
import { makeImagePath } from "../utils/utils";
import Slider from "../components/Slider";
import Footer from "../components/Footer";

// const Banner = styled.div<{ backdropimg: string }>`
//   width: 100vw;
//   height: 90vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   padding: 0 5vw;
//   background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
//     url(${(props) => props.backdropimg});
//   background-size: cover;
//   background-position: top;
// `;

const BannerContainer = styled.div`
  position: relative;
`;

const Banner = styled.img`
  width: 100%;
  object-fit: contain;
  mask-image: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
`;

const InfoBox = styled.div`
  position: absolute;
  top: 45%;
  left: 5%;
`;

const Title = styled.h1`
  width: 35%;
  margin-bottom: 20px;
  font-size: 55px;
  font-weight: 600;

  @media (max-width: 1600px) {
    font-size: 45px;
  }
  @media (max-width: 1000px) {
    font-size: 35px;
  }
  @media (max-width: 700px) {
    font-size: 25px;
  }
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

  @media (max-width: 1000px) {
    font-size: 13px;
  }
  @media (max-width: 700px) {
    font-size: 10px;
  }
`;

const SliderContainer = styled.div`
  width: 100vw;
  background-color: inherit;
  position: absolute;
  top: 90vh;
`;

const sliderList = [
  { title: "최고 인기 영화를 만나보세요", pathKey: "popular" },
  { title: "현재 상영작을 만나보세요", pathKey: "now_playing" },
  { title: "기다림이 아깝지 않은 영화들", pathKey: "upcoming" },
  { title: "평점이 높은 영화들", pathKey: "top_rated" },
];

export default function Home() {
  const { data } = useQuery<IGetMoviesResult>(["home"], getPopularMovies);

  return (
    <>
      {/* <Banner backdropimg={makeImagePath(data?.results[0].backdrop_path || "")}>
      </Banner> */}
      <BannerContainer>
        <Banner src={makeImagePath(data?.results[0].backdrop_path || "")} />
        <InfoBox>
          <Title>{data?.results[0].title}</Title>
          <Overview>{data?.results[0].overview}</Overview>
        </InfoBox>
      </BannerContainer>

      <SliderContainer>
        {sliderList.map((slider, index) => (
          <Slider key={index} title={slider.title} pathKey={slider.pathKey} />
        ))}
        <Footer />
      </SliderContainer>
    </>
  );
}
