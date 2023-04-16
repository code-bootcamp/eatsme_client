import styled from "@emotion/styled";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
`;

export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 34px;

  & > img {
    width: 24px;
    height: 24px;
  }
`;

export const ReplyWriteWrapper = styled.form`
  position: relative;
  width: 100%;
  padding: 6px;
  background-color: white;
`;

export const ReplyWrapper = styled.div`
  position: relative;
  width: 100%;
  padding: 6px;
  background-color: white;
`;

export const ImgBox = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 34px;
  top: 3px;
  right: 3px;

  & > img {
    width: 16px;
    height: 16px;
    object-fit: contain;
    cursor: pointer;
  }
`;

export const ReplyUserInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    width: 25px;
    height: 25px;
    margin-right: 6px;
    border-radius: 50%;
  }

  & > div {
    font-weight: 500;
    font-size: 12px;
  }
`;

export const Reply = styled.div`
  margin-top: 10px;
  font-weight: 500;
  font-size: 12px;
`;

export const ReplySubmit = styled.button`
  position: absolute;
  top: 6px;
  right: 10px;
  width: 46px;
  height: 28px;
  background-color: #fbb240;
  color: white;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;

export const ReplyTextarea = styled.textarea`
  width: 100%;
  height: auto;
  resize: none;
  border: none;
  margin-top: 10px;
  font-weight: 500;
  font-size: 12px;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

export const ReplyModifyBox = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ReplyMModifyTextarea = styled.textarea`
  width: 100%;
  height: auto;
  resize: none;
  border: none;
  margin-top: 10px;
  font-weight: 500;
  font-size: 12px;
  overflow: hidden;
  &:focus {
    outline: none;
  }
`;

export const ReplyModifySubmit = styled.button`
  align-self: flex-end;
  width: 46px;
  height: 28px;
  margin-top: 6px;
  background-color: #fbb240;
  color: white;
  font-weight: 500;
  font-size: 12px;
  cursor: pointer;
`;
