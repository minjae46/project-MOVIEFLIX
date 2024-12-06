import styled from "styled-components";

const Container = styled.div`
  padding: 30vh 5vw;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10vh 10px;
`;

const Header = styled.div`
  width: 100vw;
  height: 20vh;
  position: fixed;
  top: 0;
  z-index: 98;

  background-color: black;
`;

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <Header></Header>
      <Container>{props.children}</Container>
    </>
  );
}
