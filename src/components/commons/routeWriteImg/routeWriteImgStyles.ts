import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

interface IImgChk {
  imgUrl?: string;
}

export const ImgWrap = styled.div<IImgChk>`
  position: relative;
  cursor: pointer;
  width: 130px;
  height: 130px;
  border: 3px dotted #d9d9d9;
  border: ${(props) => props.imgUrl !== "" && "none"};
  input {
    width: 1px;
    height: 1px;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  ::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 24px;
    height: 24px;
    background: url(/plus.webp) no-repeat;
    background-size: contain;
    display: ${(props) => (props.imgUrl === "" ? "block" : "none")};
  }
  ${mq[1]} {
    position: absolute;
    right: 0;
    bottom: 94px;
    width: 108px;
    height: 108px;
  }
`;
