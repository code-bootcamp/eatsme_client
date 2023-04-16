import { useEffect } from "react";
import { SetterOrUpdater } from "recoil";

declare const window: typeof globalThis & {
  Tmapv2: any;
};

export const useEffectTMapLoad = (setMap: SetterOrUpdater<any>): void => {
  useEffect(() => {
    const initTmap = (): void => {
      const TMap = new window.Tmapv2.Map("TMapApp", {
        center: new window.Tmapv2.LatLng(37.5666805, 126.9784147),
        width: "100%",
        height: "100%",
        zoom: 15,
        zIndexInfoWindow: 11,
      });
      setMap(TMap);
    };
    initTmap();
  }, []);
};

// export const useEffectTMapLoad = (props: IUseEffectTMapLoadProps): void => {
//   const router = useRouter();
//   useEffect(() => {
//     const initTmap = (): void => {
//       if (Object.keys(props.map).length === 0) {
//         const TMap = new window.Tmapv2.Map("TMapApp", {
//           center: new window.Tmapv2.LatLng(37.5666805, 126.9784147),
//           width: "100%",
//           height: "100%",
//           zoom: 15,
//           zIndexInfoWindow: 11,
//         });
//         props.setMap?.(TMap);
//       }

//       if (
//         router.asPath !== "/eatsMe/routeWrite/" &&
//         props.isSet === true &&
//         Object.keys(props.map).length !== 0
//       ) {
//         mapMarker({ ...props });
//         mapFindRoad({ ...props });
//       }
//       if (
//         router.asPath === "/eatsMe/routeList/" &&
//         Object.keys(props.map).length !== 0 &&
//         props.data !== undefined
//       ) {
//         mapMarker({ ...props });
//         mapFindRoad({ ...props });
//       }
//     };
//     initTmap();
//   }, [props.isWrite === false ? props.data : props.isSet]);
// };
