import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

interface IToggleProps {
  isStartToggle?: boolean;
  isEndToggle?: boolean;
  isEnd?: boolean;
  isStart?: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${mq[2]} {
    padding: 20px;
  }
  ${mq[0]} {
    padding: 10px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0 10px;
  width: 100%;
  background-color: white;
  position: relative;
`;

export const CityWrapper = styled.div`
  position: relative;
`;
export const City = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 150px;
  height: 60px;
  background: #f5f5f5;
  cursor: pointer;
  ${mq[1]} {
    height: 36px;
  }

  & > div:first-of-type {
    width: calc(100% - 34px);
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    ${mq[1]} {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const Arrow = styled.div<IToggleProps>`
  width: 24px;
  height: 24px;
  background-image: ${(props) =>
    props.isStart === true ? "url(/arrow_up.webp)" : "url(/arrow_down.webp)"};

  ${mq[1]} {
    width: 20px;
    height: 20px;
  }
`;

export const SelectorWrapper = styled.div`
  display: ${(props: { isToggle: boolean }) =>
    props.isToggle ? "block" : "none"};
  position: absolute;
  top: 85px;
  left: 0;
  z-index: 1;
  cursor: pointer;
  ${mq[2]} {
    width: 100%;
  }
`;
export const DistrictWrapper = styled.div`
  position: relative;
`;

export const District = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 150px;
  height: 60px;
  background: #f5f5f5;
  cursor: pointer;
  ${mq[1]} {
    height: 36px;
  }
  & > div:first-of-type {
    width: calc(100% - 34px);
    text-align: center;
    font-weight: 500;
    font-size: 18px;
    ${mq[1]} {
      font-size: 14px;
      line-height: 20px;
    }
  }
`;

export const ArrowImg = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  ${mq[1]} {
    width: 36px;
    height: 36px;
    transform: rotateZ(90deg);
  }
`;

export const LocationBtn = styled.button`
  all: unset;
  text-align: center;
  width: 120px;
  height: 60px;
  background: #fbb240;
  color: white;
  font-size: 18px;
  font-weight: 500;
  margin-left: 36px;
  cursor: pointer;
`;
