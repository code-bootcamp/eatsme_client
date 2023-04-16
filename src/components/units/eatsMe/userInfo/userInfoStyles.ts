import styled from "@emotion/styled";
import { Tabs } from "antd";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);
// ${mq[0]} {
//   font-size: 50px;
// }

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 780px;
  background-color: white;
  /* 미디어 쿼리 1200px */
  ${mq[2]} {
    height: auto;
    justify-content: center;
  }
`;
export const Style = styled(Tabs)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 40px;
  color: #a3a3a3;

  /* 미디어 쿼리 1200px */
  ${mq[2]} {
    flex-direction: column;
    margin-top: 0;
    gap: 40px 0;
    & .ant-tabs-nav-list {
      flex-direction: row !important;
      gap: 0 30px;
    }
    & .ant-tabs-tab {
      width: fit-content;
      padding: 0 !important;
      margin-top: 0 !important;
    }
    & .ant-tabs-tab:nth-child(4),
    & .ant-tabs-tab:nth-child(3),
    & .ant-tabs-tab:nth-child(2) {
      padding: 0 10px 0 45px !important;
      ::after {
        content: "";
        top: 50%;
        left: 5px;
        transform: translateY(-50%);
      }
    }
    & .ant-tabs-tab:nth-child(4).ant-tabs-tab-active,
    & .ant-tabs-tab:nth-child(3).ant-tabs-tab-active,
    & .ant-tabs-tab:nth-child(2).ant-tabs-tab-active {
      ::before {
        content: "";
        position: absolute;
        bottom: 50%;
        left: 0;
        transform: translateY(30px);
        width: 100%;
        border-bottom: 3px solid #fbb240;
      }
    }

    & .ant-tabs-tab:first-of-type {
      margin-right: auto;
    }
    & .ant-tabs > .ant-tabs-nav {
      align-items: flex-start !important;
    }
    & .ant-tabs-nav-wrap {
      padding: 20px 0;
      margin: 0 25px;
      border-bottom: 1px solid #e0e0e0;
    }
    & .ant-tabs-ink-bar {
      display: none;
    }
    & .ant-tabs-content-holder {
      margin-left: 0;
      border-left: 0;
      height: calc(100vh - 363px);
      overflow: auto;
      margin-bottom: 20px;
      ::-webkit-scrollbar {
        display: none;
      }
    }
    .ant-tabs-tabpane {
      padding-left: 0 !important;
    }
  }
  & .ant-tabs-tab {
    position: relative;
    ::after {
      content: "";
      position: absolute;
      top: 12px;
      left: 45px;
      width: 30px;
      height: 30px;
      background-repeat: no-repeat;
      background-size: contain;
    }
  }
  & .ant-tabs-tab:nth-of-type(2) {
    ::after {
      background-image: url(/pick_gr.webp);
    }
  }
  & .ant-tabs-tab:nth-of-type(2).ant-tabs-tab-active {
    ::after {
      background-image: url(/pick_or.webp);
    }
  }
  & .ant-tabs-tab:nth-of-type(3) {
    ::after {
      background-image: url(/write_gr.webp);
    }
  }
  & .ant-tabs-tab:nth-of-type(3).ant-tabs-tab-active {
    ::after {
      background-image: url(/write_or.webp);
    }
  }
  & .ant-tabs-tab:nth-of-type(4) {
    ::after {
      background-image: url(/book_gr.webp);
    }
  }
  & .ant-tabs-tab:nth-of-type(4).ant-tabs-tab-active {
    ::after {
      background-image: url(/book_or.webp);
    }
  }
  & .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fbb240; /* 선택된 탭 폰트 색상 설정 */
  }

  & .ant-tabs-ink-bar {
    background-color: #fbb240; // 변경 할 커서 색상
  }

  & .ant-tabs-nav .ant-tabs-tab:hover {
    cursor: pointer; /* 탭 커서 색상 설정 */
    color: #fbb240; /* 마우스를 올려 놓은 탭 폰트 색상 설정 */
  }
  /* 미디어 쿼리 800px */
  ${mq[1]} {
    & .ant-tabs-nav-wrap {
      margin: 0 55px;
    }
    & .ant-tabs-content-holder {
      height: calc(100vh - 268px);
      padding: 0 35px;
    }
  }
  @media (max-width: 655px) {
    & .ant-tabs-content-holder {
      padding: 0 2vw;
    }
    & .ant-tabs-nav-list {
      gap: 0 1vw;
    }
    & .ant-tabs-tab {
      ::after {
        width: 24px;
        height: 24px;
      }
    }
    & .ant-tabs-tab:nth-child(4),
    & .ant-tabs-tab:nth-child(3),
    & .ant-tabs-tab:nth-child(2) {
      padding: 0 5px 0 29px !important;
      ::after {
        left: 0;
      }
    }
    & .ant-tabs-tab:nth-child(4).ant-tabs-tab-active,
    & .ant-tabs-tab:nth-child(3).ant-tabs-tab-active,
    & .ant-tabs-tab:nth-child(2).ant-tabs-tab-active {
      ::before {
        transform: translateY(20px);
        border-width: 2px;
      }
    }
  }
`;
export const Tab = styled.div`
  line-height: 40px;
  text-align: center;
  width: 200px;
  font-size: 18px;
  position: relative;
  ${mq[2]} {
    width: auto;
  }
  @media (max-width: 655px) {
    font-size: 14px;
    line-height: 24px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 100%;
`;

export const UserBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 216px;
`;

export const ImgWrap = styled.div`
  position: relative;
  width: 168px;
  height: 168px;

  ::after {
    position: absolute;
    right: 15px;
    bottom: 0;
    content: "";
    width: 30px;
    height: 30px;
    background: url(/imgSelect.webp) no-repeat;
    background-size: contain;
  }
  input {
    display: none;
  }
`;
export const UserImg = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 50%;
  object-fit: contain;
  cursor: pointer;
  /* 미디어 쿼리 800px */
  ${mq[1]} {
    width: 100px;
    height: 100px;
  }
`;
