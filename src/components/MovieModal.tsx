import styled from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getMovieDetail, IGetMovieDetailResult } from "../api";
import { makeImagePath, makeReleaseDate, makeRuntimeToHour } from "../utils";
import Loader from "./Loader";

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const Modal = styled(motion.div)`
  width: 55vw;
  height: 90vh;
  z-index: 10;
  background-color: black;
  border-radius: 10px;
  overflow-y: scroll;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Header = styled.div<{ backdropimg: string }>`
  height: 65%;
  padding: 10px;
  display: flex;
  justify-content: flex-end;
  background-image: linear-gradient(to top, black, transparent),
    url("${(props) => props.backdropimg}");
  background-size: cover;
`;

const CloseBtn = styled.div`
  width: 35px;
  cursor: pointer;
  svg {
    fill: white;
    opacity: 0.6;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
    transition: 0.4s;
  }
`;

const Content = styled.div`
  padding: 0 30px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 20px;
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  span {
    font-size: 16px;
    opacity: 0.6;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.4;
  margin-bottom: 15px;
  /* text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; */
`;

const Genres = styled.ul`
  display: flex;
  gap: 10px;
  li {
    font-size: 20px;
    font-weight: 600;
  }
`;

interface IMovieModalProps {
  handleCloseClick: () => void;
  id: number;
  layoutId: string;
  title: string;
}

export default function MovieModal({
  handleCloseClick,
  id,
  layoutId,
  title,
}: IMovieModalProps) {
  const { data, isLoading } = useQuery<IGetMovieDetailResult>(
    ["movie", id],
    () => getMovieDetail(id.toString())
  );

  return (
    <Wrapper>
      <Modal layoutId={`${layoutId} + ${id}`}>
        <Header backdropimg={makeImagePath(data?.backdrop_path || "")}>
          <CloseBtn onClick={handleCloseClick}>
            <svg
              data-slot="icon"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
              ></path>
            </svg>
          </CloseBtn>
        </Header>
        <Content>
          <Title>{title}</Title>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <InfoBox>
                <Info>
                  <span>{makeReleaseDate(data?.release_date || "")} 개봉</span>
                  <span>{makeRuntimeToHour(data?.runtime || 0)}</span>
                  <span>
                    평점
                    {data?.vote_average === 0
                      ? " 없음"
                      : ` ${data?.vote_average.toFixed(1)}`}
                  </span>
                </Info>
                <Genres>
                  {data?.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </Genres>
              </InfoBox>
              <Description>{data?.overview}</Description>
            </>
          )}
        </Content>
      </Modal>
      <Overlay
        onClick={handleCloseClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {/* 오버레이 컴포넌트를 분리하는 이유 : 오버레이 클릭시 모달 창 닫힘 기능을 구현하기 위함.  */}
    </Wrapper>
  );
}
