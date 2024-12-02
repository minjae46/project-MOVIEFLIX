import styled from "styled-components";
import { IMovie } from "../api";
import { makeImagePath, makeReleaseDate } from "../utils";
import { motion } from "framer-motion";

const Box = styled(motion.div)<{ bgimg: string }>`
  aspect-ratio: 27 / 40;
  background-image: url(${(props) => props.bgimg});
  background-color: black;
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 25%);
  opacity: 0;
  position: absolute;
  width: 100%;
  bottom: -10%;
  border-radius: 5px;
  padding: 50px 10px 20px 10px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 12px;
  }
  span {
    font-size: 12px;
    margin-bottom: 7px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    zIndex: 9,
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.2,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.5,
      duaration: 0.2,
      type: "tween",
    },
  },
};

export default function MovieBox(movie: IMovie) {
  return (
    <Box
      key={movie.id}
      variants={boxVariants}
      initial="normal"
      whileHover="hover"
      transition={{ type: "tween" }}
      bgimg={makeImagePath(movie.poster_path)}
    >
      <Info variants={infoVariants}>
        <h1>{movie.title}</h1>
        <span>{makeReleaseDate(movie.release_date)}</span>
        {/* 참고로 React Elements를 제외한 객체(Date 등)는 리액트 노드의 자식으로 유효하지 않다.
            즉, <div>{여기에 객체 바로 못 넣는다}</div>
            객체를 직접 넣기 위해선 key, type, props 속성이 반드시 존재해야 한다. */}
        <span>평점 {movie.vote_average.toFixed(1)}</span>
      </Info>
    </Box>
  );
}
