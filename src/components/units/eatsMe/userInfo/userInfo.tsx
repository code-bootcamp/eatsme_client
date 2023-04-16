import { Tabs } from "antd";
import * as S from "./userInfoStyles";
import PickedList from "./pickedList/pickedList";
import ReserveListMiddle from "./reserveList/middle/reserveListMiddle";

import { ChangeEvent, useRef, useState } from "react";
import { useMutationUploadFile } from "../../../commons/hooks/mutation/useMutationUploadFile";
import { useMutationUpdateUser } from "../../../commons/hooks/mutation/useMutationUpdateUser";
import UserWriteList from "./userWriteList/userWriteList";
import { useRecoilState } from "recoil";
import { fetchLoginUserState } from "../../../../commons/stores";

export default function UserInfo(): JSX.Element {
  const [imgUrl, setImgUrl] = useState("/userImg.webp");
  const [, setFile] = useState<File>();
  const ImgRef = useRef<HTMLInputElement>(null);
  const [fetchLoginUser] = useRecoilState(fetchLoginUserState);
  const [updateUser] = useMutationUpdateUser();
  const [uploadFile] = useMutationUploadFile();

  const onFile = async (e: ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];
    if (file === undefined) return;

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = async (e) => {
      if (typeof e.target?.result === "string") {
        setImgUrl(e.target.result);
        setFile(file);

        const resultFile = await uploadFile({ variables: { file } });

        await updateUser({
          variables: {
            updateUserInput: {
              userImg: resultFile.data?.uploadFile,
            },
          },
        });
      }
    };
  };

  const onClickImg = (): void => {
    ImgRef.current?.click();
  };
  return (
    <S.Container>
      <S.Wrapper>
        <S.Style tabPosition={"left"} defaultActiveKey="1">
          <Tabs.TabPane
            tab={
              <S.ImgWrap onClick={onClickImg}>
                <S.UserImg
                  src={
                    fetchLoginUser.userImg === null
                      ? imgUrl
                      : `https://storage.googleapis.com/${String(
                          fetchLoginUser.userImg
                        )}`
                  }
                />
                <input
                  type="file"
                  ref={ImgRef}
                  onChange={(e) => {
                    void onFile(e);
                  }}
                />
              </S.ImgWrap>
            }
            key="4"
            disabled
          ></Tabs.TabPane>
          <Tabs.TabPane tab={<S.Tab>찜 목록</S.Tab>} key="1">
            <PickedList />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<S.Tab>내가 쓴 글</S.Tab>} key="2">
            <UserWriteList />
          </Tabs.TabPane>
          <Tabs.TabPane tab={<S.Tab>예약 확인</S.Tab>} key="3">
            <ReserveListMiddle />
          </Tabs.TabPane>
        </S.Style>
      </S.Wrapper>
    </S.Container>
  );
}
