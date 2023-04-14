import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Container = styled.div`
  margin-top: 40px;
  width: 100%;
  height: calc(100vh - 390px);
  overflow: hidden;
  ${mq[2]} {
    margin: 5vw auto;
    width: 90% !important;
    height: calc(100vh - 340px - 5vw);
  }
  ${mq[1]} {
    height: calc(100vh - 300px - 5vw);
  }
  ${mq[0]} {
    height: calc(100vh - 395px - 5vw);
  }
`;
