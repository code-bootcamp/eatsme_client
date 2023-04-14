import styled from "@emotion/styled";
const breakpoints = [576, 800, 1200];
const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 32px 45px;
  background: white;
  ${mq[2]} {
    padding: 15px 20px;
  }
`;
export const Contents = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${mq[2]} {
    flex-direction: column;
  }
`;
export const ListWrapper = styled.article`
  width: calc(55% - 25px);
  ${mq[2]} {
    width: 100%;
    height: 266px;
    overflow: auto;
    ::-webkit-scrollbar {
      display: none;
    }
    margin-bottom: 20px;
  }
`;

export const ItemWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px 0;
  ${mq[2]} {
    gap: 15px 0;
  }
`;
export const MapWrapper = styled.article`
  position: sticky;
  width: calc(45% - 25px);
  height: 645px;
  top: 17vh;
  right: 0px;
  overflow: hidden;
  ${mq[2]} {
    width: 100%;
    height: 433px;
  }
  ${mq[1]} {
    height: 405px;
  }
`;
