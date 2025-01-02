import { useState } from "react";
import styled from "styled-components";
import { makeImagePath, makeReleaseDate } from "../utils/utils";
import { motion, AnimatePresence } from "framer-motion";
import MovieModal from "./MovieModal";

const Box = styled(motion.div)<{ bgimg: string; offset: number }>`
  aspect-ratio: 27 / 40;
  background-image: url(${(props) => props.bgimg});
  background-color: black;
  background-size: cover;
  background-position: center center;
  border-radius: 5px;
  cursor: pointer;
  &:first-child,
  &:nth-child(${(props) => props.offset}n + 1) {
    transform-origin: center left;
  }
  &:nth-child(${(props) => props.offset}n) {
    transform-origin: center right;
  }
`;

const InfoBox = styled(motion.div)`
  width: 100%;
  height: 20%;
  min-height: 60px;
  display: flex;
  flex-direction: column;
  padding: 10px;
  position: relative;
  top: 85%;
  opacity: 0;
  background-color: black;
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
`;

const Title = styled.h1`
  font-size: 14px;
  font-weight: 800;
  line-height: 1.2;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  span {
    font-size: 11px;
    opacity: 0.6;
  }
`;

const MoreBtn = styled.div`
  width: 25px;
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

const boxVariants = {
  initial: {
    scale: 0.9,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
  },
  hover: {
    zIndex: 100,
    cursor: "default",
    scale: 1.5,
    y: -50,
    transition: {
      delay: 0.4,
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
      delay: 0.4,
      duration: 0.3,
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
  layoutId?: string;
  offset?: number;
}

export default function MovieBox({
  layoutId = "",
  id,
  title,
  poster_path,
  release_date,
  offset = 0,
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
        layoutId={layoutId + id}
        variants={boxVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        transition={{ type: "tween", duration: 0.3 }}
        bgimg={makeImagePath(poster_path)}
        offset={offset}
      >
        <InfoBox variants={infoVariants}>
          <Title>{title}</Title>
          <Info>
            <Text>
              <span>{makeReleaseDate(release_date)} 개봉</span>
              {/* 참고로 React Elements를 제외한 객체(Date 등)는 리액트 노드의 자식으로 유효하지 않다.
                즉, <div>{여기에 객체 바로 못 넣는다}</div>
                객체를 직접 넣기 위해선 key, type, props 속성이 반드시 존재해야 한다. */}
            </Text>
            <MoreBtn onClick={handleOpenClick}>
              <svg
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
            </MoreBtn>
          </Info>
        </InfoBox>
      </Box>
      <AnimatePresence>
        {isModalOpen && (
          <MovieModal
            handleCloseClick={handleCloseClick}
            layoutId={layoutId}
            id={id}
            title={title}
          />
        )}
      </AnimatePresence>
    </>
  );
}
