import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

interface ISearch {
  keyword?: string;
}

interface ISetting {
  nowPage: number;
}
export const Container = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  border-bottom: 3px solid #eee;
`;
export const StyledSlider = styled.div`
  display: flex;
  overflow: hidden;
  height: 100%;
  width: calc(100% - 280px);
  margin: 0 auto;
  ${mq[2]} {
    width: calc(100% - 200px);
  }
  ${mq[0]} {
    width: calc(100% - 50px);
  }
`;
export const BtnWrap = styled.div`
  button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    width: 60px;
    height: 60px;
    background-color: transparent;
    background-repeat: no-repeat;
    background-size: contain;
    z-index: 1;
    ${mq[0]} {
      top: 80%;
    }
  }
`;
export const NextBtn = styled.button`
  right: 80px;
  background-image: url(/nextBtn_gr.webp);
  :enabled {
    background-image: url(/nextBtn_or.webp);
    background-size: contain;
  }
  ${mq[2]} {
    right: 20px;
  }
`;
export const PrevBtn = styled.button`
  left: 80px;
  background-image: url(/prevBtn_gr.webp);
  :enabled {
    background-image: url(/prevBtn_or.webp);
    background-size: contain;
  }
  ${mq[2]} {
    left: 20px;
  }
`;
export const RouteBox = styled.div<ISetting>`
  display: flex !important;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
  position: relative;
  transition: 0.6s;
  transform: translateX(
    ${(props) => props.nowPage !== 0 && `-${props.nowPage}00%`}
  );
  width: 100%;
  padding: 35px 30px;
  background-color: white;
  ${mq[2]} {
    padding: 35px 0;
  }
  ${mq[1]} {
    position: relative;
    justify-content: center;
    flex-direction: column;
    gap: 10px 0;
  }
  .title {
    width: 100%;
    font-size: 20px;
    font-weight: 500;
    padding: 16px 16px;
    background-color: #eee;
    margin: 0 100px;
    ::placeholder {
      color: #999;
      text-align: center;
    }
    ${mq[2]} {
      margin: 0 8vw;
    }
    ${mq[1]} {
      margin: 0;
    }
  }
`;
export const Text = styled.div`
  text-align: center;
  font-size: 24px;
  padding: 40px 0;
  font-weight: 500;
`;
export const ModalBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  gap: 0 20px;
  margin-top: 20px;
  padding-top: 10px;
  width: 100%;
  border-top: 1px solid #e0e0e0;
  button {
    cursor: pointer;
    width: 20%;
    padding: 0 15px;
    font-size: 18px;
    font-weight: 500;
    color: #757575;
    line-height: 40px;
    background-color: #fff;
    border-bottom: 2px solid #fbb240;
    :hover {
      color: black;
    }
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px 0;
  width: 550px;
  ${mq[2]} {
    width: 56%;
  }
  ${mq[1]} {
    width: 100%;
  }
`;
export const SearchWrap = styled.div<ISearch>`
  display: flex;
  width: 100%;
  padding: 10px 20px;
  border-bottom: 2px solid #eee;
  border-color: ${(props) => props.keyword !== "" && "#FBB240"};
  input {
    width: calc(100% - 30px);
    background-color: transparent;
    font-size: 20px;
    line-height: 32px;
    font-weight: 500;
    ::placeholder {
      color: #999;
    }
  }
  button {
    cursor: pointer;
    width: 30px;
    height: 30px;
    background: url(/search.webp) no-repeat;
    background-size: contain;
    text-indent: -9999px;
  }
`;
export const StoreWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  ${mq[1]} {
    flex-direction: column;
  }
  input {
    width: 45%;
    padding: 10px 20px;
    border-bottom: 2px solid #eee;
    background-color: transparent;
    font-size: 18px;
    line-height: 32px;
    color: #999;
    text-align: center;
    ::placeholder {
      color: #999;
    }
    ${mq[1]} {
      width: 60%;
    }
  }
`;
export const Store = styled.input`
  border-color: ${(props) => props.value !== "상호명" && "#FBB240 !important"};
  color: ${(props) => props.value !== "상호명" && "black !important"};
  font-weight: ${(props) => props.value !== "상호명" && "500"};
`;
export const Menu = styled.input`
  border-color: ${(props) =>
    props.value !== "" ? "#FBB240 !important" : "#eee !important"};
  color: ${(props) => props.value !== "" && "black !important"};
  font-weight: ${(props) => props.value !== "" && "500"};
`;

export const RegisterBtn = styled.button`
  cursor: pointer;
  width: 130px;
  background-color: #d9d9d9;
  color: white;
  font-size: 30px;
  font-weight: 700;
  line-height: 130px;
  :enabled {
    background-color: #fbb240;
  }
  ${mq[1]} {
    width: 100%;
    height: auto;
    line-height: 50px;
  }
  ${mq[0]} {
    width: 65%;
  }
`;
