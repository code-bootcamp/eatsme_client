import { ISlideSetting } from "../../units/eatsMe/routeWrite/top/routeWriteTop";
import { SetStateAction, Dispatch } from "react";
import { ICreateBoardInput } from "../../../commons/types/generated/types";
import { mapPopUp } from "./useMapPopUp";
declare const window: typeof globalThis & {
  Tmapv2: any;
};

export interface IMapMarkerProps {
  isSearch?: boolean;
  isWrite?: boolean;
  data?: any;
  setMap?: Dispatch<any>;
  map?: any;
  idx?: number | undefined;
  path?: ICreateBoardInput;
  marker?: any[];
  keyword?: string;
  infoWindow?: any[];
  slideSetting?: ISlideSetting;
  setSlideSetting?: Dispatch<SetStateAction<ISlideSetting>>;
  setMarker?: Dispatch<SetStateAction<any[]>>;
  findLine?: any[];
  setFindLine?: Dispatch<SetStateAction<any[]>>;
  setInfoWindow?: Dispatch<SetStateAction<any[]>>;
  setPath?: Dispatch<SetStateAction<ICreateBoardInput>>;
  setReserve?: Dispatch<SetStateAction<string>>;
}

export const mapMarker = (props: IMapMarkerProps): void => {
  if (props.marker?.length !== 0) {
    props.marker?.map((el) => el.setMap(null));
  }

  const addIcon = (i: number): string => {
    if (props.isSearch === true) {
      return "/marker_gr.webp";
    } else if (i === 0) {
      return "/marker_red.webp";
    } else if (i === 1) {
      return "/marker_purple.webp";
    } else {
      return "/marker_or.webp";
    }
  };

  const addMarker = (i: number): void => {
    const position = new window.Tmapv2.LatLng(
      props.isSearch === true
        ? props.data[i].noorLat
        : props.isWrite === true
        ? props.data.info[i].location.lat
        : props.data.personalMapData[i].location.lat,
      props.isSearch === true
        ? props.data[i].noorLon
        : props.isWrite === true
        ? props.data.info[i].location.lng
        : props.data.personalMapData[i].location.lng
    );
    const TMarker = new window.Tmapv2.Marker({
      position,
      icon: addIcon(i),
      iconSize: new window.Tmapv2.Size(40, 40),
      map: props.map,
      title: "가게 정보보기",
    });

    const mobileCheck = (): boolean => {
      const user = navigator.userAgent;

      if (
        user.includes("iPhone") ||
        user.includes("Android") ||
        user.includes("iPad") ||
        user.includes("iPod")
      ) {
        return true;
      }

      return false;
    };
    const isMobile = mobileCheck();

    if (!isMobile) {
      if (props.isSearch === true) {
        TMarker.addListener("click", () => {
          mapPopUp({ ...props, position, data: props.data?.[i], isMobile });
        });
      } else if (props.isSearch === false && props.isWrite === true) {
        TMarker.addListener("click", () => {
          mapPopUp({
            ...props,
            position,
            data: props.data?.info?.[i],
            idx: i,
            isMobile,
          });
        });
      } else if (props.isWrite === false) {
        TMarker.addListener("click", () => {
          mapPopUp({
            ...props,
            position,
            data: props.data?.personalMapData?.[i],
            idx: i,
            isMobile,
          });
        });
      }
      markerArr.push(TMarker);
      PTbounds.extend(position);
    } else {
      if (props.isSearch === true) {
        TMarker.addListener("touchstart", () => {
          mapPopUp({ ...props, position, data: props.data?.[i], isMobile });
        });
      } else if (props.isSearch === false && props.isWrite === true) {
        TMarker.addListener("touchstart", () => {
          mapPopUp({
            ...props,
            position,
            data: props.data?.info?.[i],
            idx: i,
            isMobile,
          });
        });
      } else if (props.isWrite === false) {
        TMarker.addListener("touchstart", () => {
          mapPopUp({
            ...props,
            position,
            data: props.data?.personalMapData?.[i],
            idx: i,
            isMobile,
          });
        });
      }
      markerArr.push(TMarker);
      PTbounds.extend(position);
    }
  };

  const PTbounds = new window.Tmapv2.LatLngBounds();
  const markerArr: any[] = [];
  for (
    let i = 0;
    i <
    (props.isSearch === true
      ? props.data.length
      : props.isWrite === true
      ? props.data?.info?.length
      : props.data.personalMapData.length);
    i++
  ) {
    if (
      props.isSearch === false &&
      props.isWrite === true &&
      props.data.info[i].restaurantName === "상호명"
    ) {
      break;
    }

    if (
      props.isSearch === false &&
      props.isWrite === false &&
      props.data.personalMapData[i].restaurantName === "상호명"
    ) {
      break;
    }

    if (
      props.isSearch === true &&
      (props.idx ?? 0) > 0 &&
      props.data[i].name ===
        props.path?.info[(props.idx ?? 0) - 1].restaurantName
    ) {
      continue;
    }
    if (props.isSearch === true) {
      if (
        props.data[i].middleBizName === "음식점" ||
        props.data[i].middleBizName === "카페" ||
        props.data[i].middleBizName === "술집"
      ) {
        if (props.data[i].name.indexOf("주차장") === -1) {
          addMarker(i);
        }
      }
    } else {
      addMarker(i);
    }
  }

  if (
    props.isSearch === false &&
    props.isWrite === true &&
    props.data.info[0].restaurantName === "상호명"
  ) {
    return;
  } else if (
    props.isSearch === false &&
    props.isWrite === false &&
    props.data.personalMapData[0].restaurantName === "상호명"
  ) {
    return;
  }
  if (
    Object.prototype.hasOwnProperty.call(props, "isWrite") &&
    props.isWrite === true &&
    props.data.info[1].restaurantName === "상호명"
  ) {
    const latlng = props.data.info[0].location;

    props.map.setCenter(new window.Tmapv2.LatLng(latlng.lat, latlng.lng));
    props.setMarker?.(markerArr);
    return props.map.setZoom(15);
  }
  props.map.fitBounds(PTbounds);
  props.setMarker?.(markerArr);
};
