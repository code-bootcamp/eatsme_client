import { Modal } from "antd";
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import {
  infoWindowClickState,
  infoWindowState,
  mapState,
  markerState,
  pathState,
  slideSettingState,
} from "../../../../../commons/stores";
import { useChangeUploadFile } from "../../../../commons/hooks/custom/useChangeUploadFile";
import { useClickCreateBoard } from "../../../../commons/hooks/custom/useClickCreateBoard";
import { useClickUpdateBoard } from "../../../../commons/hooks/custom/useClickUpdateBoard";
import { useEffectTMapLoad } from "../../../../commons/hooks/custom/useEffectTMapLoad";
import { useMapFindRoad } from "../../../../commons/hooks/custom/useMapFindRoad";
import { useMapMarker } from "../../../../commons/hooks/custom/useMapMarker";
import { useSetIsToggle } from "../../../../commons/hooks/custom/useSetIsToggle";
import { onClickMapSearch } from "../../../../commons/libraries/onClickMapSearch";
import * as S from "./routeWriteTopStyles";

export interface ISlideSetting {
  keyword: string[];
  nowPage: number;
  isActive: boolean;
  disabled_next: boolean;
  disabled_prev: boolean;
}

export interface IRouteWriteTopProps {
  isEdit: boolean;
}

export default function RouteWriteTop(props: IRouteWriteTopProps): JSX.Element {
  const { onClickCreateBoard } = useClickCreateBoard();
  const { onClickUpdateBoard } = useClickUpdateBoard();
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<Record<string, string>>({});
  const [isToggle, changeIsToggle] = useSetIsToggle();
  const { onChangeUploadFile } = useChangeUploadFile();

  const [slideSetting, setSlideSetting] = useRecoilState(slideSettingState);
  const [path, setPath] = useRecoilState(pathState);
  const [marker] = useRecoilState(markerState);
  const [, setMap] = useRecoilState(mapState);
  const [infoWindow, setInfoWindow] = useRecoilState(infoWindowState);
  const { onClickSearch } = onClickMapSearch();
  const { pickMapMarker } = useMapMarker();
  const { axiosFindRoad } = useMapFindRoad();
  const [infoWindowClick] = useRecoilState(infoWindowClickState);

  useEffectTMapLoad(setMap);

  useEffect(() => {
    // search 마커들중 다른 마커 클릭시 켜져있던 인포윈도우 제거
    if (infoWindow.length > 1) {
      infoWindow[0].setMap(null);
      setInfoWindow([infoWindow[1]]);
    }
  }, [infoWindow]);

  useEffect(() => {
    // infoWindow의 추가,취소 버튼 클릭시
    // 켜져있던 infoWindow 닫기, 마커 다시 찍기, 변경된 값으로 길찾기 다시작성, 이전 및 다음 슬라이드 버튼 설정
    if (infoWindowClick > 0) {
      if (infoWindow.length !== 0) {
        infoWindow[0].setVisible(false);
      }
      marker.map((el: any) => el.setMap(null));
      pickMapMarker();
      void axiosFindRoad();

      if (slideSetting.nowPage === 5) {
        // 슬라이드가 코스 최대 작성 갯수인 5 페이지라면 다음 버튼 비활성화
        setSlideSetting((prev) => ({ ...prev, disabled_next: true }));
      } else {
        setSlideSetting((prev) => ({ ...prev, disabled_next: false }));
      }

      if (slideSetting.nowPage === 0) {
        // 슬라이드가 제일 첫 페이지 라면 이전 버튼 비활성화
        setSlideSetting((prev) => ({ ...prev, disabled_prev: true }));
      }

      if (path.info[1].restaurantName !== "상호명") {
        // 최소 2개의 음식점이 작성됬다면 코스작성 버튼 활성화
        setSlideSetting((prev) => ({ ...prev, isActive: false }));
      } else {
        setSlideSetting((prev) => ({ ...prev, isActive: true }));
      }
    }
  }, [infoWindowClick]);

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

  const onClickNext = (): void => {
    // infoWindow 및 마커 지우기
    if (infoWindow.length > 0) {
      infoWindow[0].setVisible(false);
    }
    if (marker.length > 1) {
      marker.map((el: any) => el.setVisible(false));
    }

    if (path.info[slideSetting.nowPage].restaurantName === "상호명") {
      setSlideSetting((prev) => ({
        ...prev,
        disabled_next: true,
      }));
    }
    setSlideSetting((prev) => ({
      ...prev,
      disabled_prev: false,
      nowPage: prev.nowPage + 1,
    }));
  };

  const onClickPrev = (): void => {
    // infoWindow 및 마커 지우기
    if (infoWindow.length > 0) {
      infoWindow[0].setVisible(false);
    }
    if (marker.length > 1) {
      marker.map((el: any) => el.setVisible(false));
    }

    if (slideSetting.nowPage - 1 === 0) {
      setSlideSetting((prev) => ({
        ...prev,
        disabled_prev: true,
      }));
    }
    setSlideSetting((prev) => ({
      ...prev,
      disabled_next: false,
      nowPage: prev.nowPage - 1,
    }));
  };

  const onClickImg = (event: MouseEvent<HTMLInputElement>): void => {
    event.stopPropagation();
    imgRef.current?.click();
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0];

    if (file === undefined) return;
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (result) => {
      if (typeof result.target?.result === "string") {
        setImage((prev) => ({
          ...prev,
          [slideSetting.nowPage]: result.target?.result,
        }));
        void onChangeUploadFile({
          file,
          setPath,
          nowPage: slideSetting.nowPage - 1,
        });
      }
    };
  };

  return (
    <S.Container>
      <S.BtnWrap>
        <S.PrevBtn
          onClick={onClickPrev}
          disabled={slideSetting.disabled_prev}
        />
        <S.NextBtn
          onClick={onClickNext}
          disabled={slideSetting.disabled_next}
        />
      </S.BtnWrap>
      <S.StyledSlider>
        {slideSetting.keyword.map((_, idx) =>
          idx === 0 ? (
            // 코스 타이틀 작성
            <S.RouteBox nowPage={slideSetting.nowPage} key={idx}>
              <input
                className="title"
                type="text"
                placeholder="코스 이름을 정해주세요."
                onChange={onChangeInput(idx)}
                maxLength={35}
                value={path?.title ?? ""}
              />
            </S.RouteBox>
          ) : (
            // 경유지
            <S.RouteBox nowPage={slideSetting.nowPage} key={idx}>
              <S.SearchContainer>
                <S.SearchWrap keyword={slideSetting.keyword[idx - 1]}>
                  <input
                    type="text"
                    id={String(idx)}
                    placeholder={
                      idx === 1
                        ? "출발지를 입력해주세요."
                        : idx === 2
                        ? "도착지를 입력해주세요."
                        : "경유지를 입력해주세요."
                    }
                    onChange={onChangeInput(idx)}
                    value={slideSetting.keyword[idx - 1]}
                  />
                  <button
                    onClick={() => {
                      onClickSearch(slideSetting.keyword[idx - 1]);
                    }}
                  ></button>
                </S.SearchWrap>
                <S.StoreWrap>
                  <S.Store
                    type="text"
                    readOnly
                    value={path.info[idx - 1].restaurantName}
                  />
                  <S.Menu
                    id="recommend"
                    type="text"
                    placeholder="추천메뉴"
                    onChange={onChangeInput(idx)}
                    value={path.info[idx - 1].recommend ?? ""}
                  />
                </S.StoreWrap>
              </S.SearchContainer>

              <S.ImgWrap onClick={onClickImg} imgUrl={image[idx] ?? ""}>
                {image[idx] !== undefined ? (
                  <img src={image[idx] ?? ""} />
                ) : (
                  <></>
                )}
                <input type="file" ref={imgRef} onChange={onChangeFile} />
              </S.ImgWrap>
              <S.RegisterBtn
                disabled={slideSetting.isActive}
                onClick={changeIsToggle}
              >
                {props.isEdit ? "코스수정" : "코스완료"}
              </S.RegisterBtn>
            </S.RouteBox>
          )
        )}
      </S.StyledSlider>
      {isToggle && (
        <Modal
          open={true}
          onOk={changeIsToggle}
          onCancel={changeIsToggle}
          width={400}
          footer={null}
          closable={false}
        >
          <S.Text>코스 {props.isEdit ? "수정" : "등록"}을 하시겠습니까?</S.Text>
          <S.ModalBtnWrap>
            <button onClick={changeIsToggle}>취소</button>
            <button
              onClick={() => {
                if (props.isEdit) {
                  void onClickUpdateBoard(path);
                } else {
                  void onClickCreateBoard(path);
                }
              }}
            >
              {props.isEdit ? "수정" : "등록"}
            </button>
          </S.ModalBtnWrap>
        </Modal>
      )}
    </S.Container>
  );
}
