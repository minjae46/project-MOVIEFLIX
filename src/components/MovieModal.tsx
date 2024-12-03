import styled from "styled-components";
import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getMovie, IMovieDetail } from "../api";
import { makeImagePath, makeReleaseDate } from "../utils";

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const Modal = styled(motion.div)`
  width: 50vw;
  height: 80vh;
  z-index: 10;
  background-color: black;
  border-radius: 10px;
  overflow-y: hidden;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const Header = styled.div<{ backdropimg: string }>`
  height: 55%;
  display: flex;
  justify-content: flex-end;
  background-image: linear-gradient(to top, black, transparent),
    url("${(props) => props.backdropimg}");
  background-size: cover;
`;

const Content = styled.div`
  padding: 0 20px;
`;

const Title = styled.h1`
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 15px;
`;

const Info = styled.div`
  margin-bottom: 15px;
  span {
    margin-right: 5px;
    font-size: 16px;
    opacity: 0.6;
  }
`;

const Description = styled.p`
  font-size: 16px;
  opacity: 0.9;
  line-height: 1.3;
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
  margin-bottom: 15px;
`;

interface IMovieModalProps {
  onCloseClick: () => void;
  id: number;
  sliderId: string;
  title: string;
}

export default function MovieModal({
  onCloseClick,
  id,
  sliderId,
  title,
}: IMovieModalProps) {
  const { data } = useQuery<IMovieDetail>(["movie", id], () =>
    getMovie(id.toString())
  );

  return (
    <Wrapper>
      <Modal layoutId={`${sliderId}${id}`}>
        <Header backdropimg={makeImagePath(data?.backdrop_path || "")}></Header>
        <Content>
          <Title>{title}</Title>
          <Info>
            <span>{makeReleaseDate(data?.release_date || "")}</span>
            <span>{data?.runtime}</span>
          </Info>
          <Genres>
            {data?.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </Genres>
          <Description>{data?.overview}</Description>
        </Content>
      </Modal>
      <Overlay
        onClick={onCloseClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {/* 오버레이를 분리하는 이유 : 오버레이 클릭시 모달 창 닫힘 기능을 구현하기 위함.  */}
    </Wrapper>
  );
}
