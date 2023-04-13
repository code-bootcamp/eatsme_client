import axios from "axios";
import { useRecoilState } from "recoil";
import { findLineState, mapState, pathState } from "../../../../commons/stores";
import { useMapMarker } from "./useMapMarker";

declare const window: typeof globalThis & {
  Tmapv2: any;
};

interface IUseMapFindRoad {
  axiosFindRoad: () => Promise<void>;
}

export const useMapFindRoad = (): IUseMapFindRoad => {
  const [findLine, setFindLine] = useRecoilState(findLineState);
  const [path] = useRecoilState(pathState);
  const [map] = useRecoilState(mapState);

  const drawFindRoad = (result: any): void => {
    // axios를 통해 받은 데이터로 맵에 길찾기 작성
    for (let i = 0; i < result.features.length; i++) {
      const feature = result.features[i];
      if (feature.geometry.type === "LineString") {
        const Line = [];
        for (let j = 0; j < feature.geometry.coordinates.length; j++) {
          const startPt = new window.Tmapv2.LatLng(
            feature.geometry.coordinates[j][1],
            feature.geometry.coordinates[j][0]
          );
          Line.push(startPt);
        }
        const TLine = new window.Tmapv2.Polyline({
          path: Line,
          strokeColor: "#457aff",
          strokeWeight: 4,
          map,
        });
      }
    }
  };

  const axiosFindRoad = async (): Promise<void> => {
    // 출발 및 도착이 작성 되어 있을시에만 길찾기 작동
    if (path?.info?.[1].restaurantName === "상호명") return;
    if (findLine.length !== 0) {
      // 이전 길찾기 내역이 있을경우 해당 Line을 제거
      findLine.map((el: any) => el.setMap(null));
      setFindLine([]);
    }

    const dataPos: any = {};
    for (let i = 0; i < path.info.length; i++) {
      // axios에 필요한 값들 정리
      if (path.info[i].restaurantName === "상호명") {
        break;
      }
      if (i === 0) {
        dataPos.start = path.info[i].location;
      } else if (i === 1) {
        dataPos.end = path.info[i].location;
      } else {
        if (dataPos.stopOver === undefined) {
          dataPos.stopOver = `${path.info[i].location.lng},${path.info[i].location.lat}`;
        } else {
          // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
          dataPos.stopOver += `_${path.info[i].location.lng},${path.info[i].location.lat}`;
        }
      }
    }
    const result = await axios({
      method: "POST",
      headers: { appKey: "fwJ1lVM3a0680zMo4QJLR1sByJarNOZ66mlgdoPf" },
      url: "https://apis.openapi.sk.com/tmap/routes?version=1&format=json",
      data: {
        startX: dataPos.start.lng,
        startY: dataPos.start.lat,
        endX: dataPos.end.lng,
        endY: dataPos.end.lat,
        passList: dataPos.stopOver,
        reqCoordType: "WGS84GEO",
        resCoordType: "WGS84GEO",
        trafficInfo: "Y",
      },
    });
    drawFindRoad(result.data);
  };

  return { axiosFindRoad };
};
