import { Modal } from "antd";
import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRecoilState } from "recoil";
import { mapState, markerState } from "../../../../../commons/stores";
import {
  ICreateBoardInput,
  IQuery,
} from "../../../../../commons/types/generated/types";
import { useChangeUploadFile } from "../../../../commons/hooks/custom/useChangeUploadFile";
import { useClickCreateBoard } from "../../../../commons/hooks/custom/useClickCreateBoard";
import { useClickUpdateBoard } from "../../../../commons/hooks/custom/useClickUpdateBoard";
import { useEffectTMapLoad } from "../../../../commons/hooks/custom/useEffectTMapLoad";
import { useSetIsToggle } from "../../../../commons/hooks/custom/useSetIsToggle";
import { mapFindRoad } from "../../../../commons/libraries/mapFindRoad";
import { mapMarker } from "../../../../commons/libraries/mapMarker";
import {
  mapSearch,
  onClickMapSearch,
} from "../../../../commons/libraries/onClickMapSearch";
import * as S from "./routeWriteTopStyles";

export interface ISlideSetting {
  keyword: string[];
  nowPage: number;
  isActive: boolean;
  disabled_next: boolean;
  disabled_prev: boolean;
}

export interface IRouteWriteTopProps {
  setMap: Dispatch<any>;
  map: any;
  data: Pick<IQuery, "fetchBoard"> | undefined;
  isEdit: boolean;
  path: any;
  setPath: Dispatch<any>;
  isSet: boolean;
}

export default function RouteWriteTop(props: IRouteWriteTopProps): JSX.Element {
  const { onClickCreateBoard } = useClickCreateBoard();
  const { onClickUpdateBoard } = useClickUpdateBoard();
  const imgRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<Record<string, string>>({});
  const [isToggle, changeIsToggle] = useSetIsToggle();
  const [marker, setMarker] = useState<any[]>([]);
  const [pickMarker, setPickMarker] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any[]>([]);
  const [findLine, setFindLine] = useState<any[]>([]);
  const { onChangeUploadFile } = useChangeUploadFile();
  const [slideSetting, setSlideSetting] = useState<ISlideSetting>({
    keyword: ["", "", "", "", "", ""],
    nowPage: 0,
    isActive: true,
    disabled_next: true,
    disabled_prev: true,
  });

  const [map, setMap] = useRecoilState(mapState);
  const { onClickSearch } = onClickMapSearch();

  useEffectTMapLoad(setMap);
  // useEffectTMapLoad({
  //   isSearch: false,
  //   isSet: props.isSet,
  //   data: props.path,
  //   isWrite: true,
  //   setMap: props.setMap,
  //   marker: pickMarker,
  //   setMarker: setPickMarker,
  //   findLine,
  //   setFindLine,
  //   setInfoWindow,
  //   setSlideSetting,
  //   slideSetting,
  //   map: props.map,
  //   setPath: props.setPath,
  // });

  // useEffect(() => {
  //   if (marker.length !== 0) {
  //     marker.map((el) => el.setMap(null));
  //     mapMarker({
  //       data: props.path,
  //       isSearch: false,
  //       isWrite: true,
  //       map: props.map,
  //       setMap: props.setMap,
  //       marker: pickMarker,
  //       setMarker: setPickMarker,
  //       setInfoWindow,
  //       slideSetting,
  //       setSlideSetting,
  //       setPath: props.setPath,
  //     });
  //   } else if (marker.length === 0 && pickMarker.length !== 0) {
  //     mapMarker({
  //       data: props.path,
  //       isSearch: false,
  //       isWrite: true,
  //       map: props.map,
  //       setMap: props.setMap,
  //       marker: pickMarker,
  //       setMarker: setPickMarker,
  //       setInfoWindow,
  //       slideSetting,
  //       setSlideSetting,
  //       setPath: props.setPath,
  //     });
  //   }
  //   if (props.path?.info?.[1].restaurantName !== "상호명") {
  //     mapFindRoad({
  //       data: props.path,
  //       isWrite: true,
  //       map: props.map,
  //       findLine,
  //       setFindLine,
  //     });
  //   } else {
  //     findLine.map((el) => el.setMap(null));
  //     setFindLine([]);
  //   }

  //   if (
  //     slideSetting.nowPage !== 0 &&
  //     props.path?.info?.[slideSetting.nowPage - 1].restaurantName !== "상호명"
  //   ) {
  //     if (slideSetting.nowPage + 1 < 6 && slideSetting.nowPage !== 0) {
  //       setSlideSetting((prev) => ({ ...prev, disabled_next: false }));
  //     }
  //     if (slideSetting.nowPage >= 2) {
  //       setSlideSetting((prev) => ({ ...prev, isActive: false }));
  //     }
  //   } else if (slideSetting.nowPage === 0 && props.path.title !== "") {
  //     if (props.isEdit && props.path?.info?.[1].restaurantName !== "상호명") {
  //       setSlideSetting((prev) => ({
  //         ...prev,
  //         isActive: false,
  //       }));
  //     }
  //     setSlideSetting((prev) => ({
  //       ...prev,
  //       disabled_next: false,
  //       disabled_prev: true,
  //     }));
  //   } else {
  //     setSlideSetting((prev) => ({
  //       ...prev,
  //       disabled_next: true,
  //       isActive: true,
  //     }));
  //   }
  // }, [props.path.info]);

  // useEffect(() => {
  //   if (infoWindow.length > 1) {
  //     infoWindow[0].setMap(null);
  //     setInfoWindow([infoWindow[1]]);
  //   }
  // }, [infoWindow]);

  const onChangeInput =
    (pageNum: number) => (event: ChangeEvent<HTMLInputElement>) => {
      if (pageNum === 0) {
        // 코스 이름 작성
        props.setPath((prev: ICreateBoardInput) => ({
          ...prev,
          title: event.target.value,
        }));
        setSlideSetting((prev) => ({ ...prev, disabled_next: false }));
      } else if (event.target.id === "recommend") {
        // 추천 메뉴 작성
        props.setPath((prev: ICreateBoardInput) => ({
          ...prev,
          info: prev.info.map((el, idx) => {
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
    if (infoWindow.length > 0) {
      infoWindow[0].setVisible(false);
    }
    if (marker.length > 1) {
      marker.map((el) => el.setMap(null));
    }

    if (props.path?.info?.[slideSetting.nowPage].restaurantName === "상호명") {
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
          setPath: props.setPath,
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
                value={props.path?.title ?? ""}
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
                    onClick={onClickSearch(slideSetting.keyword[idx - 1])}
                  ></button>
                </S.SearchWrap>
                <S.StoreWrap>
                  <S.Store
                    type="text"
                    readOnly
                    value={props.path.info[idx - 1].restaurantName}
                  />
                  <S.Menu
                    id="recommend"
                    type="text"
                    placeholder="추천메뉴"
                    onChange={onChangeInput(idx)}
                    value={props.path.info[idx - 1].recommend ?? ""}
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
                  void onClickUpdateBoard(props.path);
                } else {
                  void onClickCreateBoard(props.path);
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
