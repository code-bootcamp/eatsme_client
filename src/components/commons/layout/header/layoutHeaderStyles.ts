import styled from "@emotion/styled";
import { IHeader } from "./layoutHeader";

const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
// ${mq[0]} {
//   font-size: 50px;
// }

export const Container = styled.header<IHeader>`
  position: ${(props) => (props.hiddenCss ? "fixed" : "static")};
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  z-index: 1;
  width: 100%;
  height: 80px;
  background-color: ${(props) => (props.hiddenCss ? "transparent" : "#fbb240")};
  ${mq[1]} {
    height: 60px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  height: 100%;
  ${mq[1]} {
    width: 100%;
  }
  & > img {
    width: 160px;
    height: 50px;
    object-fit: contain;
    cursor: pointer;
    ${mq[1]} {
      width: 128px;
      height: 40px;
    }
  }
`;

export const NavBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 0 20px;
  ${mq[1]} {
    justify-content: stretch;
    gap: 0 20px;
    width: fit-content;
  }
  ${mq[0]} {
    gap: 0 10px;
  }
  & > a {
    all: unset;
    font-size: 20px;
    font-weight: 500;
    color: white;
    cursor: pointer;
    ${mq[1]} {
      font-size: 18px;
    }
    ${mq[0]} {
      font-size: 12px;
    }
    :hover {
      border-bottom: 2px solid white;
    }
  }
`;

export const BtnWrapper = styled.div`
  position: relative;
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  ${mq[1]} {
    width: fit-content;
    gap: 0 20px;
    justify-content: stretch;
    margin-right: 20px;
  }
  ${mq[1]} {
    gap: 0 5px;
    margin-right: 10px;
  }
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  & > img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    margin-bottom: 2px;
    ${mq[0]} {
      width: 20px;
      height: 20px;
    }
  }
`;

export const LoginBtn = styled.button`
  all: unset;
  font-size: 14px;
  font-weight: bold;
  height: 32px;
  color: white;
  margin-left: 4px;
  ${mq[0]} {
    font-size: 12px;
  }
  :hover {
    border-bottom: 1px solid white;
  }
`;

export const JoinBtn = styled.button`
  all: unset;
  width: 60px;
  height: 32px;
  font-size: 14px;
  font-weight: bold;
  color: white;
  text-align: center;
  cursor: pointer;
  ${mq[0]} {
    font-size: 12px;
  }
  :hover {
    border-bottom: 1px solid white;
  }
`;

export const UserInfoBtn = styled.button`
  all: unset;
  width: 60px;
  height: 32px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  color: white;
  cursor: pointer;
  ${mq[0]} {
    font-size: 12px;
  }
  :hover {
    border-bottom: 1px solid white;
  }
`;
