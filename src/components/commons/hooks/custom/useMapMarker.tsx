import { useRecoilState } from "recoil";
import {
  mapState,
  markerState,
  pathState,
  pickMarkerState,
  slideSettingState,
} from "../../../../commons/stores";
import { useMapPopUp } from "../../libraries/useMapPopUp";

declare const window: typeof globalThis & {
  Tmapv2: any;
};

interface IUseMapMarker {
  searchMapMarker: (data: any) => void;
  pickMapMarker: () => void;
}

export const useMapMarker = (): IUseMapMarker => {
  const [map] = useRecoilState(mapState);
  const [marker, setMarker] = useRecoilState(markerState);
  const [pickMarker, setPickMarker] = useRecoilState(pickMarkerState);
  const [slideSetting] = useRecoilState(slideSettingState);
  const [path, setPath] = useRecoilState(pathState);
  const { onInfoWindow } = useMapPopUp();

  // 키워드 검색시 마커 작성 함수
  const searchMapMarker = (data: any): void => {
    // 이미 마커가 작성되어 있을시 모두 제거
    if (marker.length !== 0) {
      marker.map((el: any) => el.setMap(null));
    }

    const PTbounds = new window.Tmapv2.LatLngBounds();
    const markerArr: any[] = [];

    for (let i = 0; i < data.length; i++) {
      if (data[i].name === path.info[slideSetting.nowPage - 1].restaurantName)
        continue;
      // 마커 위치 잡기
      const position = new window.Tmapv2.LatLng(
        data[i].noorLat,
        data[i].noorLon
      );
      // 마커 작성
      const TMarker = new window.Tmapv2.Marker({
        position,
        icon: "/marker_gr.webp",
        iconSize: new window.Tmapv2.Size(40, 40),
        map,
        title: "가게 정보보기",
      });
      TMarker.addListener("click", () => {
        onInfoWindow(position, map, data[i], true);
      });
      TMarker.addListener("touchstart", () => {
        onInfoWindow(position, map, data[i], true);
      });
      markerArr.push(TMarker);
      PTbounds.extend(position);
    }
    setMarker(markerArr);
    map.fitBounds(PTbounds);
  };

  // 추가 버튼 클릭시 나의 코스에 등록된 지점의 맵 마커
  const pickMapMarker = (): void => {
    // 이미 마커가 작성되어 있을시 모두 제거

    if (pickMarker.length !== 0) {
      pickMarker.map((el: any) => el.setMap(null));
    }

    const addIcon = (i: number): string => {
      // 마커 아이콘 색상
      if (i === 0) {
        return "/marker_red.webp";
      } else if (i === 1) {
        return "/marker_purple.webp";
      } else {
        return "/marker_or.webp";
      }
    };

    const PTbounds = new window.Tmapv2.LatLngBounds();
    const markerArr: any[] = [];

    for (let i = 0; i < path.info.length; i++) {
      if (path.info[i].restaurantName === "상호명") break;

      // 마커 위치 잡기
      const position = new window.Tmapv2.LatLng(
        path.info[i].location.lat,
        path.info[i].location.lng
      );
      // 마커 작성
      const TMarker = new window.Tmapv2.Marker({
        position,
        icon: addIcon(i),
        iconSize: new window.Tmapv2.Size(40, 40),
        map,
        title: "가게 정보보기",
      });
      // 마커 클릭 이벤트 작성 (PC,모바일)
      TMarker.addListener("click", () => {
        onInfoWindow(position, map, path.info[i], false);
      });
      TMarker.addListener("touchstart", () => {
        onInfoWindow(position, map, path.info[i], false);
      });
      markerArr.push(TMarker);
      PTbounds.extend(position);
    }

    // 현재 맵 센터 수정
    setPickMarker(markerArr);
    map.fitBounds(PTbounds);
  };
  return { searchMapMarker, pickMapMarker };
};
