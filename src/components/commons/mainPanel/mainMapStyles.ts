import styled from "@emotion/styled";
const breakpoints = [576, 900, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

interface IModal {
  isOpen: boolean;
  move?: boolean;
}
export const ReactPlayer = styled.div`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100vw;
  height: 100%;
  transition: transform 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  left: 0;
  top: 0;
  video {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.3s;
    .common {
      cursor: pointer;
      transition: 0.3s;
      :hover {
        fill: rgba(251, 178, 64);
        transform: translate(5%, 5%);
      }
    }
    ${mq[1]} {
      top: 40%;
      width: 300px;
    }
    ${mq[0]} {
      top: 50%;
      width: 300px;
    }
  }
`;

export const ModalWrap = styled.div<IModal>`
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  transition: ${(props) => (props.isOpen ?? false ? "0.5s" : "0.5s 0.5s")};
`;
export const Modal = styled.div<IModal>`
  position: absolute;
  bottom: 0;
  left: 50%;
  display: flex;
  justify-content: space-between;
  transform: translateX(-50%);
  transition: 0.6s cubic-bezier(1, 0.02, 1, 1);
  background-color: #eee;
  .left {
    left: ${(props) =>
      props.move === undefined ? "300px" : props.move ? "300px" : "60vw"};
    ${mq[1]} {
      left: ${(props) =>
        props.move === undefined ? "100px" : props.move ? "100px" : "60vw"};
    }
  }
  .right {
    right: ${(props) =>
      props.move === undefined ? "300px" : props.move ? "60vw" : "300px"};
    ${mq[1]} {
      right: ${(props) =>
        props.move === undefined ? "100px" : props.move ? "60vw" : "100px"};
    }
  }
  .arrow::before,
  .arrow::after {
    content: "";
    position: absolute;
    display: block;
    box-sizing: border-box;
    transition: 0.15s ease-in-out;
  }
  .left::before {
    left: -50px;
  }
  .right::before {
    right: -50px;
  }
  .arrow::before {
    width: 0%;
    height: 5px;
    top: 50%;
    background: var(--colour);
    transform: translate(0, -50%);
  }
  .arrow::after {
    width: 20px;
    height: 20px;

    top: 50%;
    border: 5px solid var(--colour);
    border-left: 0;
    border-bottom: 0;
  }
  .left::after {
    left: 21px;
    transform: translate(50%, -50%) rotate(45deg);
    ${mq[1]} {
      left: 7px;
    }
  }
  .right::after {
    right: 42px;
    transform: translate(50%, -50%) rotate(225deg);
    ${mq[1]} {
      right: 28px;
    }
  }
  .left:hover::after {
    left: calc(100px - 46px / 2);
    transform: translate(-50%, -50%) rotate(45deg);
    ${mq[1]} {
      left: calc(85px - 46px / 2);
    }
  }
  .right:hover::after {
    right: calc(65px - 46px / 2);
    transform: translate(-50%, -50%) rotate(225deg);
    ${mq[1]} {
      right: calc(55px - 46px / 2);
    }
  }
  .left:hover::before {
    left: -2px;
    ${mq[1]} {
      left: 12px;
    }
  }
  .right:hover::before {
    right: -7px;
    ${mq[1]} {
      right: 12px;
    }
  }

  .arrow:hover {
    cursor: pointer;
    border-color: transparent;
  }
  .arrow:hover::before {
    opacity: 1;
    transition: 0.15s ease;
    width: calc(100% + 5px);
  }
  .arrow:hover::after {
    transition: 0.15s ease;
    width: 30px;
    height: 30px;
  }
`;
export const MoveBtn = styled.button<IModal>`
  --colour: #fbb240;
  position: absolute;
  bottom: ${(props) => (props.isOpen ? "40vh" : "-40vh")};
  cursor: pointer;
  border-bottom: 5px solid #fbb240;
  background-color: transparent;
  transition: bottom 0.6s, left 0.6s, right 0.6s;
  display: flex;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  border-radius: 50%;
  border: 5px solid var(--colour);
  ${mq[1]} {
    width: 70px;
    height: 70px;
    bottom: ${(props) => (props.isOpen ? "10vh" : "-20vh")};
  }
  span {
    position: absolute;
    left: 50%;
    top: -60%;
    transform: translateX(-50%);
    font-size: 30px;
    font-weight: 600;
    color: white;
    white-space: nowrap;
    ${mq[1]} {
      top: -80%;
      font-size: 24px;
    }
  }
`;
