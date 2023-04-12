import { useRecoilState } from "recoil";
import { mapState, markerState } from "../../../../commons/stores";
import { mapPopUp } from "../../libraries/mapPopUp";

declare const window: typeof globalThis & {
  Tmapv2: any;
};

interface IUseMapMarker {
  searchMapMarker: (data: any) => void;
}

export const useMapMarker = (): IUseMapMarker => {
  const [map] = useRecoilState(mapState);
  const [marker, setMarker] = useRecoilState(markerState);

  // 키워드 검색시 마커 작성 함수
  const searchMapMarker = (data: any): void => {
    // 이미 마커가 작성되어 있을시 모두 제거
    if (marker.length !== 0) {
      marker.map((el: any) => el.setMap(null));
    }

    const PTbounds = new window.Tmapv2.LatLngBounds();
    const markerArr: any[] = [];

    for (let i = 0; i < data.length; i++) {
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
        mapPopUp(position, map);
      });
      markerArr.push(TMarker);
      PTbounds.extend(position);
    }
    setMarker(markerArr);
    map.fitBounds(PTbounds);
  };

  return { searchMapMarker };
};
