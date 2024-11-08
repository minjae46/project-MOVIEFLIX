import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../../api";

const Container = styled.div<{ positionOffset: number }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  position: absolute;
  top: ${(props) => 430 + props.positionOffset * 200}px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 8px;
  width: 100%;
  padding: 0 60px;
  position: absolute;
  top: 35px;
`;

const Title = styled.h2`
  padding-left: 60px;
  margin-bottom: 20px;
  font-size: 22px;
`;

const Box = styled(motion.div)`
  height: 120px;
  background-color: grey;
  border-radius: 5px;
`;

const PrevBtn = styled.span`
  position: absolute;
  left: 10px;
  top: 35px;
  background-color: blue;
  cursor: pointer;
`;

const NextBtn = styled.span`
  position: absolute;
  right: 10px;
  top: 35px;
  background-color: blue;
  cursor: pointer;
`;

interface ISliderProps {
  title: string;
  pathKey: string;
  positionOffset: number;
}

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth + 8,
//   },
//   visible: { x: 0 },
//   exit: { x: -window.outerWidth - 8 },
// };

const offset = 6;

export default function Slider({
  title,
  pathKey,
  positionOffset,
}: ISliderProps) {
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", `${pathKey}`],
    () => getMovies(pathKey)
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  console.log("포지션옵셋", positionOffset);
  console.log("인덱스", index);
  console.log("리빙", leaving);

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
    <Container positionOffset={positionOffset}>
      <Title>{title}</Title>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row
          key={index}
          // variants={rowVariants}
          initial={{ x: window.outerWidth }}
          animate={{ x: 0 }}
          exit={{ x: -window.outerWidth }}
          transition={{ type: "tween", duration: 1 }}
        >
          {/* {data?.results
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie) => (
              <Box key={movie.id}>{movie.title}</Box>
            ))} */}

          {data?.results.slice(0, 6).map((movie) => (
            <Box key={movie.id}>{movie.title}</Box>
          ))}
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
    </Container>
  );
}
