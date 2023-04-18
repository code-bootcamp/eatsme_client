import styled from "@emotion/styled";
import { IAlarmToggle } from "./alarm";

export const Container = styled.div<Pick<IAlarmToggle, "isToggle">>`
  display: ${(props) => (props.isToggle ? "block" : "none")};
  position: absolute;
  right: 10px;
  top: calc(100% + 20px);
  width: 280px;
  padding: 15px 15px 20px;
  background-color: white;
  border: 1px solid #e0e0e0;
  h4 {
    font-size: 16px;
    font-weight: 500;
  }
  button {
    position: absolute;
    top: 15px;
    right: 15px;
    cursor: pointer;
    width: 20px;
    height: 20px;
    text-indent: -9999px;
    background: url(./delete.webp) no-repeat;
    background-size: contain;
  }
`;
export const AlarmList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 200px;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  margin-top: 15px;
  border-top: 1px solid #e0e0e0;
  li {
    position: relative;
    display: flex;
    align-items: center;
    gap: 0 8px;
    padding: 9px 0;
    list-style: none;
    border-bottom: 1px solid #e0e0e0;
    p {
      font-size: 12px;
      line-height: 16px;
      color: #797979;
    }
    img {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 14px;
      height: 14px;
      cursor: pointer;
    }
  }
`;
