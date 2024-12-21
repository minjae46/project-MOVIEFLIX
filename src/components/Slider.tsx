import { useEffect, useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import MovieBox from "./MovieBox";
import useWindowWidth from "../hooks/useWindowWidth";

const Container = styled.div<{ movieH: number }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: ${(props) => props.movieH * 1.2}px;
  position: relative;
`;

const Title = styled.h2`
  font-size: 20px;

  @media (max-width: 1200px) {
    font-size: 19px;
  }
  @media (max-width: 950px) {
    font-size: 18px;
  }
  @media (max-width: 900px) {
    font-size: 17px;
  }
  @media (max-width: 650px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 15px;
  }
  @media (max-width: 500px) {
    font-size: 14px;
  }
  @media (max-width: 450px) {
    font-size: 12px;
  }
`;

const Row = styled(motion.div)<{ offset: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.offset}, 1fr);
  gap: 10px;
  width: 90vw;
  position: absolute;
  // animatePresence에서는 absolute 설정해주지 않으면 컴포넌트가 튄다
  top: 8%;
`;

const PrevBtn = styled.span<{ movieH: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: ${(props) => props.movieH}px;
  position: absolute;
  left: 0;
  top: 8%;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: white;
    transition: 1s;
  }
`;

const NextBtn = styled.span<{ movieH: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5vw;
  height: ${(props) => props.movieH}px;
  position: absolute;
  right: 0;
  top: 8%;
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 1;
    color: white;
    transition: 1s;
  }
`;

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

interface ISliderProps {
  title: string;
  pathKey: string;
}

export default function Slider({ title, pathKey }: ISliderProps) {
  const { data } = useQuery<IGetMoviesResult>(["movies", pathKey], () =>
    getMovies(pathKey)
  );

  const width = useWindowWidth();

  const [leaving, setLeaving] = useState(false); // 유저가 클릭을 빠르게 여러번 했을때 애니메이션이 정상적으로 작동하지 않는 것을 방지하기 위함.
  const [back, setBack] = useState(false);
  const [index, setIndex] = useState(0); // 현재 슬라이더에서 가장 첫 번째 영화의 위치.
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (width >= 1400) setOffset(6);
    if (width < 1400) setOffset(5);
    if (width < 1100) setOffset(4);
    if (width < 800) setOffset(3);
  }, [width]);

  const movieH = ((width * 0.9 - (offset - 1) * 10) / offset / 27) * 40; // 근사치 계산식. 완벽히 정확치 않음.

  const handleNext = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(false);
      const totalMovies = data.results.length;
      const maxIndex = totalMovies - (totalMovies % offset) - offset;
      // index가 가질 수 있는 가장 높은 숫자. 이 숫자를 넘어가면 남은 영화가 없거나 부족해지므로.
      // offset 개수로 나누었을 때 딱 떨어지지 않는 경우를 방지하기 위한 식.
      setIndex((prev) => (prev + offset > maxIndex ? 0 : prev + offset));
    }
  };
  const handlePrev = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      setBack(true);
      const totalMovies = data.results.length;
      const maxIndex = totalMovies - (totalMovies % offset) - offset;
      setIndex((prev) => (prev - offset < 0 ? maxIndex : prev - offset));
    }
  };

  const toggleLeaving = () => setLeaving((prev) => !prev);

  return (
    <Container movieH={movieH}>
      <Title>{title}</Title>

      <AnimatePresence
        initial={false}
        onExitComplete={toggleLeaving}
        custom={back}
      >
        <Row
          key={index} // key가 바뀌어야 애니메이션 동작
          variants={rowVariants} // 부모의 variant는 자식 컴포넌트에게도 상속된다.
          initial="hidden"
          animate="visible"
          exit="exit"
          custom={back}
          transition={{ duration: 1 }}
          offset={offset}
        >
          {data?.results.slice(index, index + offset).map((movie) => (
            <MovieBox
              key={movie.id}
              {...movie}
              layoutId={pathKey}
              offset={offset}
            />
          ))}
        </Row>
      </AnimatePresence>

      <PrevBtn onClick={handlePrev} movieH={movieH}>
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
      <NextBtn onClick={handleNext} movieH={movieH}>
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
    </Container>
  );
}
