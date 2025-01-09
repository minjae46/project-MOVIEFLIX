import { useState, useEffect, useRef } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";

const Nav = styled(motion.nav)`
  display: flex;
  flex-direction: column;
  width: 100vw;
  padding: 20px 5vw;
  position: fixed;
  top: 0;
  z-index: 99;
`;

const ColContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled(motion.svg)`
  width: 95px;
  height: 25px;
  margin-right: 50px;
  fill: red;
  path {
    stroke: white;
    stroke-width: 7px;
  }
`;

const Hambg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  opacity: 0.8;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }

  @media (min-width: 700px) {
    display: none;
  }
`;

const Menu = styled.ul`
  display: flex;
  gap: 20px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const Item = styled.li<{ selected: boolean }>`
  opacity: ${(props) => (props.selected ? 1 : 0.6)};
  font-size: 15px;
  &:hover {
    opacity: 1;
  }
  transition: opacity 0.3s ease-in-out;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  color: white;
  svg {
    width: 28px;
    &:hover {
      cursor: pointer;
    }
  }
`;

const Input = styled(motion.input)`
  width: 270px;
  position: absolute;
  right: 0;
  padding: 10px 10px;
  padding-left: 45px;
  transform-origin: right center;
  background-color: black;
  font-size: 16px;
  color: white;
  border: 0.5px solid white;
  z-index: -1;
`;

const MenuMobile = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding-top: 20px;

  @media (min-width: 700px) {
    display: none;
  }
`;

export default function Header() {
  const [scrollDown, setScrollDown] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();
  const keyword = searchParams.get("keyword");

  // useScroll, useTransform 훅 사용하는 방법
  // const { scrollY } = useScroll();
  // const navBgColor = useTransform(
  //   scrollY,
  //   [0, 200],
  //   ["rgba(0,0,0,0)", "rgba(0,0,0,1)"]
  // );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) setScrollDown(true);
      else setScrollDown(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const toggleSearch = () => {
    setSearchOpen((prev) => !prev);
    searchRef.current?.focus();
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef?.current?.contains(event.target as Node)
      )
        setSearchOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchRef]);

  const handleKeword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    navigate(`/search?keyword=${keyword}`);
    if (!keyword) {
      navigate(`/`);
    }
  };

  return (
    <Nav
      // style={{ backgroundColor: navBgColor }}
      initial={{ backgroundColor: "rgba(0,0,0,0)" }}
      animate={{
        backgroundColor: scrollDown ? "rgba(0,0,0,1)" : "rgba(0,0,0,0)",
      }}
      transition={{ duration: 0.5 }}
    >
      <ColContainer>
        <Col>
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <motion.path
              initial={{ pathLength: 0, fillOpacity: 0 }}
              animate={{ pathLength: 1, fillOpacity: 1 }}
              transition={{
                default: { duration: 15 },
                fillOpacity: { duration: 3 },
              }}
              d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z"
            />
          </Logo>

          <Hambg>
            <svg
              data-slot="icon"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                clip-rule="evenodd"
                fill-rule="evenodd"
                d="M2 4.75A.75.75 0 0 1 2.75 4h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 4.75ZM2 10a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75A.75.75 0 0 1 2 10Zm0 5.25a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H2.75a.75.75 0 0 1-.75-.75Z"
              ></path>
            </svg>
          </Hambg>

          <Menu>
            <Item selected={pathname === "/" && true}>
              <Link to="/">홈</Link>
            </Item>
            <Item selected={pathname === "/popular" && true}>
              <Link to="/popular">대세 인기작</Link>
            </Item>
            <Item selected={pathname === "/nowplaying" && true}>
              <Link to="/nowplaying">현재 상영작</Link>
            </Item>
            <Item selected={pathname === "/upcoming" && true}>
              <Link to="/upcoming">개봉 예정작</Link>
            </Item>
            <Item selected={pathname === "/toprated" && true}>
              <Link to="/toprated">최고 평점작</Link>
            </Item>
          </Menu>
        </Col>

        <Col>
          <Search>
            <motion.svg
              onClick={toggleSearch}
              initial={{ scale: 1 }}
              animate={{ x: searchOpen ? -235 : 0 }}
              whileTap={{ scale: 1.5 }}
              transition={{ type: "linear" }}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z"
                clipRule="evenodd"
                fillRule="evenodd"
              ></path>
            </motion.svg>
            <Input
              ref={searchRef}
              initial={{
                scaleX: 0,
              }}
              animate={{
                scaleX: searchOpen ? 1 : 0,
              }}
              transition={{ type: "linear" }}
              placeholder="제목으로 검색해보세요"
              onChange={handleKeword}
              value={keyword || ""} // 검색창에 이전에 검색한 키워드 게속 남아있게 하기
            />
          </Search>
        </Col>
      </ColContainer>

      <MenuMobile>
        <Item selected={pathname === "/" && true}>
          <Link to="/">홈</Link>
        </Item>
        <Item selected={pathname === "/popular" && true}>
          <Link to="/popular">대세 인기작</Link>
        </Item>
        <Item selected={pathname === "/nowplaying" && true}>
          <Link to="/nowplaying">현재 상영작</Link>
        </Item>
        <Item selected={pathname === "/upcoming" && true}>
          <Link to="/upcoming">개봉 예정작</Link>
        </Item>
        <Item selected={pathname === "/toprated" && true}>
          <Link to="/toprated">최고 평점작</Link>
        </Item>
      </MenuMobile>
    </Nav>
  );
}
