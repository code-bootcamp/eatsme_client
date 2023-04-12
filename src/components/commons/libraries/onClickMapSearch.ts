import { useMapMarker } from "./../hooks/custom/useMapMarker";
import { Modal } from "antd";

declare const window: typeof globalThis & {
  Tmapv2: any;
};

interface IUseClickMapSearch {
  onClickSearch: (keyword: string) => void;
}

export const onClickMapSearch = (): IUseClickMapSearch => {
  const { searchMapMarker } = useMapMarker();

  const onClickSearch = (keyword: string) => (): void => {
    const onComplete = (data: any): void => {
      const resultData = data._responseData.searchPoiInfo.pois.poi;
      const newData = [];
      for (let i = 0; i < resultData.length; i++) {
        // 검색하여 받은 데이터에서 음식점중 주차장만 아닌것만 뽑아내기
        if (
          resultData[i].middleBizName === "음식점" ||
          resultData[i].middleBizName === "카페" ||
          resultData[i].middleBizName === "술집"
        ) {
          if (resultData[i].name.indexOf("주차장") === -1) {
            newData.push(resultData[i]);
          }
        }
      }
      searchMapMarker(newData);
    };

    const onError = (): void => {
      Modal.error({
        title: "해당하는 음식점이 없습니다",
        okText: "확인",
        okButtonProps: {
          style: { backgroundColor: "#fbb240", color: "white" },
        },
      });
    };

    const optionObj = {
      reqCoordType: "WGS84GEO",
      resCoordType: "WGS84GEO",
      count: 40,
    };
    const params = {
      onComplete,
      onError,
    };
    const tData = new window.Tmapv2.extension.TData();
    tData.getPOIDataFromSearchJson(
      encodeURIComponent(keyword),
      optionObj,
      params
    );
  };
  return { onClickSearch };
};
