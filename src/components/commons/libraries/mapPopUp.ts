import { IMapMarkerProps } from "./mapMarker";
import { useClickInfoWindow } from "../hooks/custom/useClickInfoWindow";
import { Dispatch, SetStateAction } from "react";
import { ICreateBoardInput } from "../../../commons/types/generated/types";
import { ISlideSetting } from "../../units/eatsMe/routeWrite/top/routeWriteTop";
declare const window: typeof globalThis & {
  Tmapv2: any;
};

interface IMapPopUpProps extends IMapMarkerProps {
  position?: any;
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
  setReserve?: any;
  isMobile: boolean;
}

export const mapPopUp = (position: any, map: any): void => {
  const { onClickAdd, onClickDelete } = useClickInfoWindow();
  const AAAA = () => {
    TInfoWindow.setMap(null);
  };
  const TInfoWindow = new window.Tmapv2.InfoWindow({
    position,
    align: 12,
    content: `
    <div style=' display: flex; flex-direction: column; position: relative; width: 200px; padding: 20px 10px 10px; box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3),0px 2px 6px 2px rgba(60, 64, 67, 0.15); border-radius: 10px; background-color: white;'>
        <img src='/delete.webp' id='deleteImg' style=' position: absolute; width: 15px; height: 15px; top: 3px; right: 3px; cursor: pointer; ${(onclick =
          AAAA)}'>
        <div style=' display: flex; flex-direction: row;'>
          <div style=' display: flex; flex-direction: row; justify-content: center; align-items: center; width: 45px; height: 45px; margin-right: 10px;'>
            <img src='/defaultFood.webp' style='width: 100%; height: 100%; object-fit: contain'/>
          </div>
          <div>
            <div style='font-weight: 600; font-size: 12px; margin-bottom: 3px'>
             가가가가가가
            </div>
            <div style=' margin-top: 5px; margin-bottom: 20px; font-weight: 500; font-size: 10px; word-break: break-all'>
              다다
            </div>
          </div>
        </div>
        <button class='Btn' style=' position: absolute; width: 45px; height: 20px; bottom: 6px; right: 6px; background: #fbb240; border-radius: 5px; border: none; font-weight: 500; font-size: 10px; color: #ffffff; cursor: pointer;'>
          다다
        </button>
      </div>
      `,
    border: "0",
    background: "false",
    type: 2,
    map,
  });
  // props.setInfoWindow?.((prev) => [...prev, TInfoWindow]);

  // if (!props.isMobile) {
  //   const img = document.querySelectorAll("#deleteImg");
  //   img[img.length - 1].addEventListener("click", () => {
  //     TInfoWindow.setVisible(false);
  //   });

  //   const btn = document.querySelectorAll(".Btn");

  //   btn[btn.length - 1].addEventListener("click", () => {
  //     TInfoWindow.setVisible(false);
  //     if (props.isSearch === true) {
  //       onClickAdd(props);
  //     } else if (props.isWrite === true && props.isSearch === false) {
  //       onClickDelete(props);
  //     } else if (props.isWrite === false) {
  //       props.setReserve?.({
  //         restaurantId: props.data?.restaurantId,
  //         restaurantName: props.data.restaurantName,
  //         locationLat: props.data.location.lat,
  //         locationLng: props.data.location.lng,
  //       });
  //     }
  //   });
  // } else {
  //   const img = document.querySelectorAll("#deleteImg");
  //   img[img.length - 1].addEventListener("touchstart", () => {
  //     TInfoWindow.setVisible(false);
  //   });

  //   const btn = document.querySelectorAll(".Btn");

  //   btn[btn.length - 1].addEventListener("touchstart", () => {
  //     TInfoWindow.setVisible(false);
  //     if (props.isSearch === true) {
  //       onClickAdd(props);
  //     } else if (props.isWrite === true && props.isSearch === false) {
  //       onClickDelete(props);
  //     } else if (props.isWrite === false) {
  //       props.setReserve?.({
  //         restaurantId: props.data?.restaurantId,
  //         restaurantName: props.data.restaurantName,
  //         locationLat: props.data.location.lat,
  //         locationLng: props.data.location.lng,
  //       });
  //     }
  //   });
  // }
};
