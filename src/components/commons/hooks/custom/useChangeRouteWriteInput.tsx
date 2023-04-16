import { ChangeEvent } from "react";
import { useRecoilState } from "recoil";
import { pathState, slideSettingState } from "../../../../commons/stores";

interface IUseChangeRouteWriteInput {
  onChangeInput: (
    pageNum: number
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
}

export const useChangeRouteWriteInput = (): IUseChangeRouteWriteInput => {
  const [, setPath] = useRecoilState(pathState);
  const [, setSlideSetting] = useRecoilState(slideSettingState);

  const onChangeInput =
    (pageNum: number) => (event: ChangeEvent<HTMLInputElement>) => {
      if (pageNum === 0) {
        // 코스 이름 작성
        setPath((prev: any) => ({
          ...prev,
          title: event.target.value,
        }));
        setSlideSetting((prev) => ({ ...prev, disabled_next: false }));
      } else if (event.target.id === "recommend") {
        // 추천 메뉴 작성
        setPath((prev: any) => ({
          ...prev,
          info: prev.info.map((el: any, idx: number) => {
            if (pageNum - 1 === idx)
              return {
                ...el,
                recommend: event.target.value,
              };
            return { ...el };
          }),
        }));
      } else {
        // 검색 키워드 작성
        setSlideSetting((prev) => ({
          ...prev,
          keyword: prev.keyword.map((el, idx) => {
            if (idx === pageNum - 1) {
              return event.target.value;
            } else {
              return el;
            }
          }),
        }));
      }
    };
  return { onChangeInput };
};
