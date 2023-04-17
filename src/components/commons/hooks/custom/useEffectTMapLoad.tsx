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
