import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  width: 100%;
  height: 684px;
  /* 미디어 쿼리 1200px */
  ${mq[2]} {
    gap: 0;
    height: auto;
    padding: 0 25px;
  }
`;

export const Title = styled.span`
  font-size: 35px;
  font-weight: bold;
  color: black;
  margin: 84px 0;
  /* 미디어 쿼리 1200px */
  ${mq[2]} {
    display: none;
  }
`;

export const ListWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 20px;
  width: 100%;
  padding: 0 114px;
  /* 미디어 쿼리 1200px */
  ${mq[2]} {
    flex-direction: column;
    justify-content: flex-start;
    padding: 0;
    margin: 0;
  }

`;
