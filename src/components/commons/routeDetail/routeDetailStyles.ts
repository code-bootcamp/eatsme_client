import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Container = styled.div`
  position: relative;
  background-color: #f5f5f5;
  width: 100%;
  color: black;
`;

export const TopWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 8px;
  ${mq[2]} {
    width: auto;
  }
`;

export const ModifyImg = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 8px;
  right: 34px;
  cursor: pointer;
`;

export const HeartImg = styled.img`
  position: absolute;
  width: 24px;
  height: 24px;
  top: 8px;
  right: 8px;
  cursor: pointer;
`;

export const UserInfoWBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90px;

  & > div:last-of-type {
    margin-top: 8px;
    font-weight: 500;
    font-size: 12px;
  }
`;

export const UserImg = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-self: flex-start;
  max-width: 194px;
  margin: 0 auto;
`;

export const RouteTitle = styled.div`
  word-break: break-all;
  font-weight: 600;
  font-size: 14px;
`;

export const CreateAt = styled.div`
  margin-top: 2px;
  align-self: flex-end;
  font-size: 12px;
  text-align: end;
  color: #999999;
`;

export const LocationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 202px;
  height: 46px;
  margin-right: 65px;
  ${mq[0]} {
    display: none;
  }
`;

export const StartEndLocation = styled.div`
  width: 70px;
  text-align: center;
  & div {
    font-weight: 500;
    font-size: 14px;
  }
`;

export const ListArrowImg = styled.div`
  width: 45px;
  height: 45px;
  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ArrowDownImg = styled.img`
  position: absolute;
  width: 26px;
  height: 26px;
  bottom: 8px;
  right: 8px;
  cursor: pointer;
`;

export const DivideLine = styled.div`
  width: 97%;
  margin: 0 auto 18px;
  border-bottom: 1px solid #e5e5e5;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 18px;
  width: 100%;
`;

export const RestaurantBox = styled.div`
  width: 40%;
`;

export const RestaurantName = styled.div`
  display: flex;
  flex-direction: row;

  & > div {
    margin-bottom: 25px;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
  }
`;

export const ImgCircle = styled.img`
  width: 12px;
  height: 12px;
  margin-right: 8px;
  margin-top: 2px;
`;
