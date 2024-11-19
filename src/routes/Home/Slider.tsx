import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../../api";
import { makeImagePath } from "../../utils";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 26vw;
  min-height: 150px;

  background-color: purple;
`;

const Title = styled.h2`
  font-size: 20px;

  background-color: green;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 10px;
  position: absolute;
  // animatePresence에서는 absolute 설정해주지 않으면 컴포넌트가 튄다
  // absolute는 width가 반드시 있어야 한다.
  top: 40px;
  width: 100vw;

  background-color: aquamarine;
`;

const Box = styled(motion.div)<{ bgimg: string }>`
  aspect-ratio: 27 / 40;
  background-image: url(${(props) => props.bgimg});
  background-size: cover;
  background-position: center center;
  border-radius: 10px;
`;

const PrevBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 40px;
  width: 10vw;
  aspect-ratio: 1 / 2;

  /* opacity: 0;
  &:hover {
    opacity: 1;
    color: white;
    transition: 1s;
  } */
`;

const NextBtn = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 40px;
  width: 10vw;
  aspect-ratio: 1 / 2;

  /* opacity: 0;
  &:hover {
    opacity: 1;
    color: white;
    transition: 1s;
  } */
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
                  bgimg={makeImagePath(movie.poster_path)}
                ></Box>
              ))}
          </Row>
        </AnimatePresence>
      )}

      <PrevBtn onClick={handlePrev}>
        <svg
          data-slot="icon"
          fill="currentColor"
          viewBox="3 0 15 20"
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
          viewBox="2 0 15 20"
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
