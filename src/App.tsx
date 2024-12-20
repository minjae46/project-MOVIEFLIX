import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/ScrollToTop";

const GlobalStyle = createGlobalStyle`
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

* {
box-sizing: border-box;
margin: 0;
}
body {
background-color: #000000;
font-family: sans-serif;
color: #FFFFFF;
overflow-x: hidden
}
a {
  text-decoration:none;
  color:inherit;
  cursor: pointer;
}
button {
  border: none;
  background: transparent;
}
button:focus,
button:active,
textarea:focus,
textarea:active,
input:focus,
input:active {
  box-shadow: none;
  outline: none;
}
svg {
  outline: none;
}
::-webkit-scrollbar {
  display: none;
}
`;

function App() {
  return (
    <>
      <GlobalStyle />
      <Header />
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default App;
