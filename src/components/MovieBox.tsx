import { useState } from "react";
import styled from "styled-components";
import { makeImagePath, makeReleaseDate } from "../utils";
import { motion, AnimatePresence } from "framer-motion";
import MovieModal from "./MovieModal";

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
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 10%);

  width: 100%;
  opacity: 0;
  position: absolute;
  bottom: -10%;
  border-radius: 5px;
  padding: 20px 10px 10px 10px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 15px;
    font-weight: 800;
    margin-bottom: 12px;
    line-height: 1.2;
  }
`;

const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;
  svg {
    width: 30px;
    fill: white;
    opacity: 0.5;
    &:hover {
      opacity: 1;
      cursor: pointer;
    }
    transition: 0.4s;
  }
`;

const InfoText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  span {
    font-size: 12px;
  }
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    cursor: "default",
    scale: 1.3,
    y: -50,
    transition: {
      delay: 0.5,
      duration: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 0.2,
      type: "tween",
    },
  },
};

interface IMovieBoxProps {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  sliderId: string;
}

export default function MovieBox({
  sliderId,
  id,
  title,
  poster_path,
  release_date,
  vote_average,
}: IMovieBoxProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenClick = () => {
    setIsModalOpen(true);
  };
  const handleCloseClick = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Box
        key={id}
        layoutId={`${sliderId}${id}`}
        variants={boxVariants}
        initial="normal"
        whileHover="hover"
        exit="exit"
        transition={{ type: "tween" }}
        bgimg={makeImagePath(poster_path)}
      >
        <Info variants={infoVariants}>
          <h1>{title}</h1>
          <InfoBox>
            <InfoText>
              <span>{makeReleaseDate(release_date)}</span>
              {/* 참고로 React Elements를 제외한 객체(Date 등)는 리액트 노드의 자식으로 유효하지 않다.
                즉, <div>{여기에 객체 바로 못 넣는다}</div>
                객체를 직접 넣기 위해선 key, type, props 속성이 반드시 존재해야 한다. */}
              <span>평점 {vote_average.toFixed(1)}</span>
            </InfoText>
            <svg
              onClick={handleOpenClick}
              data-slot="icon"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-7-4a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM9 9a.75.75 0 0 0 0 1.5h.253a.25.25 0 0 1 .244.304l-.459 2.066A1.75 1.75 0 0 0 10.747 15H11a.75.75 0 0 0 0-1.5h-.253a.25.25 0 0 1-.244-.304l.459-2.066A1.75 1.75 0 0 0 9.253 9H9Z"
              ></path>
            </svg>
          </InfoBox>
        </Info>
      </Box>
      <AnimatePresence>
        {isModalOpen && (
          <MovieModal
            onCloseClick={handleCloseClick}
            id={id}
            sliderId={sliderId}
            title={title}
          />
        )}
      </AnimatePresence>
    </>
  );
}
