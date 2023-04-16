import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
// ${mq[0]} {
//   font-size: 50px;
// }

export const SelectList = styled.div`
  width: 230px;
  height: 470px;
  padding: 20px;
  background: #ffffff;
  border: 1px solid #bdbdbd;
  border-radius: 10px;
  overflow: auto;
  scrollbar-width: none;
  ${mq[2]} {
    width: 100%;
    height: 300px;
    padding: 10px;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  & > div:last-of-type {
    border-bottom: 1px solid #e0e0e0;
  }
`;

export const Location = styled.div`
  width: 100%;
  border: 1px solid #e0e0e0;
  border-bottom: none;
  text-align: center;
  line-height: 38px;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    border: 2px solid #fbb240;
    color: #fbb240;
    line-height: 36px;
  }
`;
