import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../../api";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 170px;
  margin-bottom: 10px;
  position: relative;
  background-color: purple;
  //padding: 0 7px;
`;

const Title = styled.h2`
  padding-left: 60px;
  font-size: 20px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 7px;
  width: 100%;
  position: absolute;
  // animatePresence에서는 absolute 설정해주지 않으면 컴포넌트가 튄다
  // absolute는 width가 반드시 있어야 한다.
  top: 30px;
`;

const Box = styled(motion.div)`
  height: 120px;
  background-color: grey;
  border-radius: 5px;
`;

const PrevBtn = styled.span`
  position: absolute;
  left: 10px;
  top: 0;
  background-color: blue;
  cursor: pointer;
`;

const NextBtn = styled.span`
  position: absolute;
  right: 10px;
  top: 0;
  background-color: blue;
  cursor: pointer;
`;

interface ISliderProps {
  title: string;
  pathKey: string;
}

const offset = 6;

export default function Slider({ title, pathKey }: ISliderProps) {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", `${pathKey}`],
    () => getMovies(pathKey)
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false); // 유저가 클릭을 빠르게 여러번 했을때 애니메이션이 정상적으로 작동하지 않는 것을 방지하기 위함.

  const increaseIndex = () => {
    if (leaving) return;
    toggleLeaving();

    setIndex((prev) => prev + 1);
  };
  const decreaseIndex = () => {
    if (leaving) return;
    toggleLeaving();
    setIndex((prev) => prev - 1);
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Wrapper>
      <Title>{title}</Title>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          key={index}
          initial={{ x: window.innerWidth + 7 }}
          animate={{ x: 0 }}
          exit={{ x: -window.innerWidth - 7 }}
          transition={{ duration: 1 }}
        >
          {data?.results
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box key={movie.id}>{movie.title}</Box>
            ))}
          {/* 
          {data?.results.slice(0, 6).map((movie) => (
            <Box key={movie.id}>{movie.title}</Box>
          ))} */}
        </Row>
      </AnimatePresence>

      <PrevBtn onClick={decreaseIndex}>
        <svg
          data-slot="icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="40"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z"
          ></path>
        </svg>
      </PrevBtn>
      <NextBtn onClick={increaseIndex}>
        <svg
          data-slot="icon"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          width="40"
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
