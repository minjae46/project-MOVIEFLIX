import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../../api";
import { makeImagePath, makeReleaseDate } from "../../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: 27vw;
  min-height: 180px;

  // background-color: purple;
`;

const Title = styled.h2`
  font-size: 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  position: absolute;
  // animatePresence에서는 absolute 설정해주지 않으면 컴포넌트가 튄다
  // absolute는 width가 반드시 있어야 한다.
  top: 35px;
  width: 90vw;

  // background-color: blue;
`;

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

const PrevBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 40px;
  width: 5vw;
  aspect-ratio: 1 / 3.5;
  opacity: 0.3;
  &:hover {
    opacity: 1;
    color: white;
    transition: 1s;
  }
`;

const NextBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 40px;
  width: 5vw;
  aspect-ratio: 1 / 3.5;
  opacity: 0.3;
  &:hover {
    opacity: 1;
    color: white;
    transition: 1s;
  }
`;

interface ISliderProps {
  title: string;
  pathKey: string;
}

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.innerWidth - 10 : window.innerWidth + 10,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.innerWidth + 10 : -window.innerWidth - 10,
  }),
};

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

const offset = 7;

export default function Slider({ title, pathKey }: ISliderProps) {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", `${pathKey}`],
    () => getMovies(pathKey)
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false); // 유저가 클릭을 빠르게 여러번 했을때 애니메이션이 정상적으로 작동하지 않는 것을 방지하기 위함.
  const [back, setBack] = useState(false);

  const handleNext = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1; // page가 0에서 시작하므로 -1
      setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }
  };
  const handlePrev = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = data.results.length;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      <Title>{title}</Title>

      {isLoading ? (
        <span>Loading...</span>
      ) : (
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <Row
            key={index}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            custom={back}
            transition={{ duration: 1 }}
          >
            {data?.results
              .slice(offset * index, offset * index + offset)
              .map((movie) => (
                <Box
                  key={movie.id}
                  variants={boxVariants} // 부모의 variant는 자식 컴포넌트에게도 상속된다.
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
              ))}
          </Row>
        </AnimatePresence>
      )}

      <PrevBtn onClick={handlePrev}>
        <svg
          data-slot="icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
          ></path>
        </svg>
      </PrevBtn>
      <NextBtn onClick={handleNext}>
        <svg
          data-slot="icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
          ></path>
        </svg>
      </NextBtn>
    </Wrapper>
  );
}
