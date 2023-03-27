import styled from "@emotion/styled";

export const EmailBox = styled.div`
  display: flex;
  flex-direction: column;

  > span {
    font-size: 20px;
  }

  > input {
    width: 400px;
    height: 40px;
    margin-top: 10px;
    padding: 10px;
    background-color: #f5f5f5;
  }

  > p {
    color: #fa5c37;
    font-size: 12px;
    margin: 2px 0;
  }
`;

export const EmailTokenBtn = styled.button<{ isActive?: boolean }>`
  width: 400px;
  height: 40px;
  margin: 15px 0 30px 0;
  color: white;
  background-color: ${({ isActive }) =>
    isActive === true ? "#fbb240" : "#A5A5A5"};
  cursor: pointer;
`;

export const AccreditBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 0;
  margin-bottom: 30px;
  color: #333333;
  background-color: #f5f5f5;

  > span {
    font-size: 12px;
  }

  > button {
    all: unset;
    font-size: 12px;
    border-bottom: 1px solid #333333;
    cursor: pointer;
  }

  > p {
    color: #fa5c37;
    font-size: 12px;
    margin: 2px 0;
  }
`;

export const TokenBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin: 15px 0;

  > input {
    width: 220px;
    height: 40px;
    padding: 0 40px;
  }

  > span {
    width: 32px;
    font-size: 14px;
    color: #fa5c37;
    margin: 0 14px;
  }
`;

export const TokenBtn = styled.button<{ isActive?: boolean }>`
  width: 50px;
  height: 40px;
  font-size: 14px;
  color: white;
  background-color: ${({ isActive }) =>
    isActive === true ? "#fbb240" : "#A5A5A5"};
  cursor: pointer;
`;
