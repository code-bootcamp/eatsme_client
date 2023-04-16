import { useRecoilState } from "recoil";
import {
  infoWindowState,
  markerState,
  pathState,
  slideSettingState,
} from "../../../../commons/stores";

interface IUseClickRouteWriteArrow {
  onClickNext: () => void;
  onClickPrev: () => void;
}

export const useClickRouteWriteArrow = (): IUseClickRouteWriteArrow => {
  const [path] = useRecoilState(pathState);
  const [marker] = useRecoilState(markerState);
  const [infoWindow] = useRecoilState(infoWindowState);
  const [slideSetting, setSlideSetting] = useRecoilState(slideSettingState);

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
  return { onClickNext, onClickPrev };
};
