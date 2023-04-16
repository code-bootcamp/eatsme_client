import { Modal } from "antd";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  infoWindowClickState,
  infoWindowState,
  mapState,
  markerState,
  pathState,
  slideSettingState,
} from "../../../../../commons/stores";
import { useChangeRouteWriteInput } from "../../../../commons/hooks/custom/useChangeRouteWriteInput";
import { useClickCreateBoard } from "../../../../commons/hooks/custom/useClickCreateBoard";
import { useClickRouteWriteArrow } from "../../../../commons/hooks/custom/useClickRouteWriteArrow";
import { useClickUpdateBoard } from "../../../../commons/hooks/custom/useClickUpdateBoard";
import { useEffectTMapLoad } from "../../../../commons/hooks/custom/useEffectTMapLoad";
import { useMapFindRoad } from "../../../../commons/hooks/custom/useMapFindRoad";
import { useMapMarker } from "../../../../commons/hooks/custom/useMapMarker";
import { useSetIsToggle } from "../../../../commons/hooks/custom/useSetIsToggle";
import { onClickMapSearch } from "../../../../commons/libraries/onClickMapSearch";
import RouteWriteImg from "../../../../commons/routeWriteImg/routeWriteImg";
import * as S from "./routeWriteTopStyles";

export interface IRouteWriteTopProps {
  isEdit: boolean;
}

export default function RouteWriteTop(props: IRouteWriteTopProps): JSX.Element {
  const [isToggle, changeIsToggle] = useSetIsToggle();
  const { onChangeInput } = useChangeRouteWriteInput();
  const { onClickCreateBoard } = useClickCreateBoard();
  const { onClickUpdateBoard } = useClickUpdateBoard();
  const { onClickNext, onClickPrev } = useClickRouteWriteArrow();

  const [path] = useRecoilState(pathState);
  const [, setMap] = useRecoilState(mapState);
  const [marker] = useRecoilState(markerState);
  const [infoWindowClick] = useRecoilState(infoWindowClickState);
  const [infoWindow, setInfoWindow] = useRecoilState(infoWindowState);
  const [slideSetting, setSlideSetting] = useRecoilState(slideSettingState);
  const { onClickSearch } = onClickMapSearch();
  const { pickMapMarker } = useMapMarker();
  const { axiosFindRoad } = useMapFindRoad();

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
              <RouteWriteImg idx={idx} />
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
