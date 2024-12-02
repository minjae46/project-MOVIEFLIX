import styled from "styled-components";
import { motion } from "framer-motion";

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
  background-color: white;
  width: 30vw;
  aspect-ratio: 27 / 40;
  z-index: 10;
  border-radius: 10px;
`;

const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

interface IMovieModalProps {
  id: number;
  onCloseClick: () => void;
  sliderId: string;
}

export default function MovieModal({
  id,
  onCloseClick,
  sliderId,
}: IMovieModalProps) {
  return (
    <Wrapper>
      <Modal layoutId={`${sliderId}${id}`}>movie modal : {id}</Modal>
      <Overlay
        onClick={onCloseClick}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      {/* 오버레이를 분리하는 이유 : 오버레이 클릭시 모달 창 닫힘 기능을 구현하기 위함.  */}
    </Wrapper>
  );
}
