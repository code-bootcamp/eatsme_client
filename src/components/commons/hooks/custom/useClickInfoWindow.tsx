import { useRecoilState } from "recoil";
import {
  infoWindowClickState,
  pathState,
  slideSettingState,
} from "../../../../commons/stores";

interface IUseClickInfoWindow {
  onClickAdd: (data: any) => void;
  onClickCancel: (idx: number) => void;
}

export const useClickInfoWindow = (): IUseClickInfoWindow => {
  const [slideSetting, setSlideSetting] = useRecoilState(slideSettingState);
  const [, setInfoWindowClick] = useRecoilState(infoWindowClickState);
  const [, setPath] = useRecoilState(pathState);
  const area: Record<string, string> = {
    서울: "서울시",
    부산: "부산시",
    대구: "대구시",
    인천: "인천시",
    광주: "광주시",
    대전: "대전시",
    울산: "울산시",
    세종시: "세종시",
    경기: "경기도",
    강원: "강원도",
    충북: "충청북도",
    충남: "충청남도",
    전북: "전라북도",
    전남: "전라남도",
    경북: "경상북도",
    경남: "경상남도",
    제주: "제주도",
  };

  const onClickAdd = (data: any): void => {
    if (slideSetting.nowPage === 1) {
      setPath((prev: any) => ({
        ...prev,
        startArea: area[data.upperAddrName],
        startPoint: data.middleAddrName.split(" ")[0],
      }));
    } else if (slideSetting.nowPage === 2) {
      setPath((prev: any) => ({
        ...prev,
        endArea: area[data.upperAddrName],
        endPoint: data.middleAddrName.split(" ")[0],
      }));
    }
    setPath((prev: any) => ({
      ...prev,
      info: prev.info.map((el: any, idx: number) => {
        if (idx === slideSetting.nowPage - 1)
          return {
            ...el,
            section:
              data.upperAddrName === "세종시"
                ? data.lowerAddrName
                : data.middleAddrName,
            area: area[data.upperAddrName],
            restaurantName: data.name,
            location: {
              lat: Number(data.noorLat),
              lng: Number(data.noorLon),
            },
          };
        return { ...el };
      }),
    }));
    setInfoWindowClick((prev) => prev + 1);
  };

  const onClickCancel = (idx: number): void => {
    const defaultInfo: any = {
      restaurantName: "상호명",
      recommend: "",
      imgUrl: "",
      section: "",
      area: "",
      location: {
        lat: 0,
        lng: 0,
      },
    };

    setSlideSetting((prev) => {
      if (prev.nowPage !== 0) {
        return { ...prev, nowPage: prev.nowPage - 1 };
      } else {
        return prev;
      }
    });

    setPath((prev: any) => {
      const info = [...prev.info];
      info.splice(idx, 1);
      info.push(defaultInfo);
      return { ...prev, info };
    });
    setInfoWindowClick((prev) => prev + 1);
  };

  return { onClickAdd, onClickCancel };
};
