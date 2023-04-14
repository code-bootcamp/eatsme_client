import Head from "next/head";
import { MouseEvent, useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  infoWindowClickState,
  infoWindowState,
  mapState,
  markerState,
  pathState,
} from "../../../../../commons/stores";
import { IQuery } from "../../../../../commons/types/generated/types";
import { useEffectTMapLoad } from "../../../../commons/hooks/custom/useEffectTMapLoad";
import { useFetchDataSet } from "../../../../commons/hooks/custom/useFetchDataSet";
import { useMapFindRoad } from "../../../../commons/hooks/custom/useMapFindRoad";
import { useMapMarker } from "../../../../commons/hooks/custom/useMapMarker";
import { useSetIsActive } from "../../../../commons/hooks/custom/useSetIsActive";
import RouteDetail from "../../../../commons/routeDetail/routeDetail";
import * as S from "./routeListMiddleStyles";

interface IRouteListMiddleProps {
  data: Pick<IQuery, "fetchBoardsByEvery"> | undefined;
}

export default function RouteListMiddle(
  props: IRouteListMiddleProps
): JSX.Element {
  const [isActive, onClickIsActive] = useSetIsActive();
  const [, setMap] = useRecoilState(mapState);
  const [, setPath] = useRecoilState(pathState);
  const [marker] = useRecoilState(markerState);
  const [infoWindow, setInfoWindow] = useRecoilState(infoWindowState);
  const [infoWindowClick, setInfoWindowClick] =
    useRecoilState(infoWindowClickState);

  const { pickMapMarker } = useMapMarker();
  const { axiosFindRoad } = useMapFindRoad();
  const { fetchDataSet } = useFetchDataSet();

  useEffectTMapLoad(setMap);

  useEffect(() => {
    // search 마커들중 다른 마커 클릭시 켜져있던 인포윈도우 제거
    if (infoWindow.length > 1) {
      infoWindow[0].setMap(null);
      setInfoWindow([infoWindow[1]]);
    }
  }, [infoWindow]);

  useEffect(() => {
    if (
      props.data !== undefined &&
      props.data.fetchBoardsByEvery.length !== 0
    ) {
      fetchDataSet({
        setPath,
        setInfoWindowClick,
        data: props.data?.fetchBoardsByEvery[0],
      });
    }
  }, [props.data]);

  useEffect(() => {
    if (infoWindowClick > 0) {
      if (infoWindow.length !== 0) {
        infoWindow[0].setVisible(false);
      }
      marker.map((el: any) => el.setMap(null));
      pickMapMarker();
      void axiosFindRoad();
    }
  }, [infoWindowClick]);

  const onClickRoute =
    (idx: string) =>
    (event: MouseEvent<HTMLDivElement>): void => {
      fetchDataSet({
        setPath,
        setInfoWindowClick,
        data: props.data?.fetchBoardsByEvery[Number(idx)],
      });
      onClickIsActive(event);
    };

  return (
    <>
      <Head>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=fwJ1lVM3a0680zMo4QJLR1sByJarNOZ66mlgdoPf"></script>
      </Head>
      <S.Container>
        <S.Contents>
          <S.ListWrapper>
            <S.ItemWrapper>
              {props.data?.fetchBoardsByEvery.map((el, idx) => (
                <RouteDetail
                  data={el}
                  key={idx}
                  idx={idx}
                  isActive={isActive}
                  onClickRoute={onClickRoute}
                  onClickIsActive={onClickIsActive}
                />
              ))}
            </S.ItemWrapper>
          </S.ListWrapper>

          <S.MapWrapper>
            <div
              id="TMapApp"
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </S.MapWrapper>
        </S.Contents>
      </S.Container>
    </>
  );
}
