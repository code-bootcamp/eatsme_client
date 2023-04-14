import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { infoWindowState } from "../../../../commons/stores";
import { useClickInfoWindow } from "./useClickInfoWindow";

declare const window: typeof globalThis & {
  Tmapv2: any;
};

interface IUseMapPopUp {
  onInfoWindow: (position: any, map: any, data: any, idx: number) => void;
}

export const useMapPopUp = (): IUseMapPopUp => {
  const { onClickAdd, onClickCancel } = useClickInfoWindow();
  const [, setInfoWindow] = useRecoilState(infoWindowState);
  const router = useRouter();

  const onInfoWindow = (
    position: any,
    map: any,
    data: any,
    idx: number
  ): void => {
    const TInfoWindow = new window.Tmapv2.InfoWindow({
      position,
      align: 12,
      content: `
    <div style=' display: flex; flex-direction: column; position: relative; width: 200px; padding: 20px 10px 10px; box-shadow: 0px 1px 2px rgba(60, 64, 67, 0.3),0px 2px 6px 2px rgba(60, 64, 67, 0.15); border-radius: 10px; background-color: white;'>
        <img src='/delete.webp' id='deleteImg' style=' position: absolute; width: 15px; height: 15px; top: 3px; right: 3px; cursor: pointer; '>
        <div style=' display: flex; flex-direction: row;'>
          <div style=' display: flex; flex-direction: row; justify-content: center; align-items: center; width: 45px; height: 45px; margin-right: 10px;'>
            <img src='/defaultFood.webp' style='width: 100%; height: 100%; object-fit: contain'/>
          </div>
          <div>
            <div style='font-weight: 600; font-size: 12px; margin-bottom: 3px'>
              ${idx === -1 ? data.name : data.restaurantName}
            </div>
            <div style=' margin-top: 5px; margin-bottom: 20px; font-weight: 500; font-size: 10px; word-break: break-all'>
              ${
                idx === -1
                  ? data.newAddressList.newAddress[0].fullAddressRoad
                  : ""
              }
            </div>
          </div>
        </div>
        <button class='Btn' style=' position: absolute; width: 45px; height: 20px; bottom: 6px; right: 6px; background: #fbb240; border-radius: 5px; border: none; font-weight: 500; font-size: 10px; color: #ffffff; cursor: pointer;' >
          ${
            idx === -1
              ? "추가"
              : router.asPath === "/eatsMe/routeList/"
              ? "예약"
              : "취소"
          }
        </button>
      </div>
      `,
      border: "0",
      background: "false",
      type: 2,
      map,
    });
    setInfoWindow((prev: any) => [...prev, TInfoWindow]);

    const onClickDelete = (): void => {
      TInfoWindow.setVisible(false);
    };

    const img = document.querySelectorAll("#deleteImg");
    img[0].addEventListener("click", onClickDelete);
    img[0].addEventListener("touchstart", onClickDelete);

    const btn = document.querySelectorAll(".Btn");
    btn[0].addEventListener("click", () => {
      if (idx === -1) {
        onClickAdd(data);
        onClickDelete();
      } else if (router.asPath === "/eatsMe/routeList/") {
        localStorage.setItem(
          "reserve",
          JSON.stringify({
            restaurantId: data.restaurantId,
            restaurantName: data.restaurantName,
            locationLat: data.location.lat,
            locationLng: data.location.lng,
          })
        );
        window.location.href = "/eatsMe/reserve";
      } else {
        onClickCancel(idx);
      }
    });
    btn[0].addEventListener("touchstart", () => {
      if (idx === -1) {
        onClickAdd(data);
        onClickDelete();
      } else if (router.asPath === "/eatsMe/routeList/") {
        localStorage.setItem(
          "reserve",
          JSON.stringify({
            restaurantId: data.restaurantId,
            restaurantName: data.restaurantName,
            locationLat: data.location.lat,
            locationLng: data.location.lng,
          })
        );
        window.location.href = "/eatsMe/reserve";
      } else {
        onClickCancel(idx);
      }
    });

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
  return { onInfoWindow };
};
