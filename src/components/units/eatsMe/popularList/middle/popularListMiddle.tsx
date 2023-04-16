import Head from "next/head";
import { useState } from "react";
import { useEffectTMapLoad } from "../../../../commons/hooks/custom/useEffectTMapLoad";
import * as S from "./popularListMiddleStyles";

declare const window: typeof globalThis & {
  Tmapv2: any;
};

export default function PopularListMiddle(props: any): JSX.Element {
  const [map, setMap] = useState<any>({});
  const [marker, setMarker] = useState<any>(null);
  useEffectTMapLoad(setMap);

  const onClickStore = (event: any): any => {
    if (marker !== null) {
      marker.setMap(null);
    }
    const position = new window.Tmapv2.LatLng(
      ...event.currentTarget.id.split(",")
    );
    const PTbounds = new window.Tmapv2.LatLngBounds();
    PTbounds.extend(position);
    const TMarker = new window.Tmapv2.Marker({
      position,
      icon: "/marker_or.webp",
      iconSize: new window.Tmapv2.Size(40, 40),
      map,
    });
    if (map !== undefined) {
      map.fitBounds(PTbounds);
      map.setZoom(18);
      setMarker(TMarker);
    }
  };
  return (
    <>
      <Head>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=fwJ1lVM3a0680zMo4QJLR1sByJarNOZ66mlgdoPf"></script>
      </Head>
      <S.Container>
        <S.ListWrapper>
          {props.location?.data.map((el: any, idx: any) => (
            <S.StoreBox
              key={Number(idx) + 1}
              onClick={onClickStore}
              id={`${String(el.location.lat)},${String(el.location.lng)}`}
            >
              <S.StoreCont>
                <S.FoodImg
                  src={el.image !== null ? el.image : "/defaultFood.webp"}
                />
                <div>
                  <S.RatingBox>
                    <S.StoreName>
                      <S.Img src="/store.webp" />
                      <span>{el.restaurantName}</span>
                    </S.StoreName>
                    <S.Rating>{el.rating}</S.Rating>
                  </S.RatingBox>
                  <S.TimeWrapper>
                    <span>
                      {
                        el.openingDays?.filter((el: string) =>
                          el.includes("휴무일")
                        )[0]
                      }
                    </span>
                    <S.TimeInfoBox>
                      {/* <div>Open {}</div>
                      <div> Close{ } </div> */}
                    </S.TimeInfoBox>
                  </S.TimeWrapper>
                </div>
              </S.StoreCont>
              <S.StoreInfoBox>
                <div>
                  <S.Img src="/marker_or.webp" />
                  <span>{el.address}</span>
                </div>
                <div>
                  <S.Img src="/phone.webp" />
                  <span>
                    {el.phoneNumber !== null ? el.phoneNumber : "번호 없음"}
                  </span>
                </div>
              </S.StoreInfoBox>
            </S.StoreBox>
          ))}
        </S.ListWrapper>
        <S.MapBox>
          <div
            id="TMapApp"
            style={{
              height: "100%",
              width: "100%",
            }}
          />
        </S.MapBox>
      </S.Container>
    </>
  );
}
