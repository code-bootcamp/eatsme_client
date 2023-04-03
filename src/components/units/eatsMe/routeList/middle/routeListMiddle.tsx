import Head from "next/head";
import { MouseEvent, useEffect, useState } from "react";
import { useClickRouteList } from "../../../../commons/hooks/custom/useClickRouteList";
import { useEffectTMapLoad } from "../../../../commons/hooks/custom/useEffectTMapLoad";
import { useSetIsActive } from "../../../../commons/hooks/custom/useSetIsActive";
import { useSetIsToggle } from "../../../../commons/hooks/custom/useSetIsToggle";
import { mapFindRoad } from "../../../../commons/libraries/mapFindRoad";
import { mapMarker } from "../../../../commons/libraries/mapMarker";
import RouteDetail from "../../../../commons/routeDetail/routeDetail";
import LocationSelector from "../../../../locationSelector/locationSelector";
import SubLocationSelector from "../../../../subLocationSelector/subLocationSelector";
import * as S from "./routeListMiddleStyles";

export default function RouteListMiddle(): JSX.Element {
  const [map, setMap] = useState<any>();
  const [marker, setMarker] = useState<any[]>([]);
  const [findLine, setFindLine] = useState<any[]>([]);
  const [infoWindow, setInfoWindow] = useState<any[]>([]);

  const [isActive, onClickIsActive] = useSetIsActive();
  const [isStart, changeIsStart] = useSetIsToggle();
  const [isEnd, changeIsEnd] = useSetIsToggle();
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startArea, setStartArea] = useState("서울시");
  const [endArea, setEndArea] = useState("");
  const [isStartToggle, changeIsStartToggle] = useSetIsToggle();
  const [isEndToggle, changeIsEndToggle] = useSetIsToggle();


  const {
    // data,
    refetch,
  } = useClickRouteList({
    fetchBoardsByEveryInput: {
      startArea,
    },
  });

  useEffect(() => {
    const obj = { startPoint, endPoint, startArea, endArea };
    const fetchBoardsByEveryInput = Object.fromEntries(
      Object.entries(obj).filter(([_, value]) => value !== "")
    );

    void refetch({ fetchBoardsByEveryInput });
  }, [startPoint, endPoint, startArea, endArea]);

  useEffect(() => {
    if (infoWindow.length > 1) {
      infoWindow[0].setMap(null);
      setInfoWindow([infoWindow[1]]);
    }
  }, [infoWindow]);

  const test = [
    {
      userName: "나는문어나는문어",
      userIcon: "",
      title: "강남 주변 맛집 코스 추천!!",
      createAt: "2023-03-23T05:14:56.611Z",
      start: "강남",
      end: "구로",
      route: ["싱싱해요포차", "빽다방", "마피아피자앤펍", "이디야", "혼술청춘"],
      routeMenu: ["모듬 조개찜", "", "페퍼로니", "", "애플 마티니"],
      info: [
        {
          location: {
            lat: 37.491712,
            lng: 127.024212,
          },
        },
        {
          location: {
            lat: 37.491712,
            lng: 127.037212,
          },
        },

        {
          location: {
            lat: 37.504912,
            lng: 127.034121,
          },
        },
        {
          location: {
            lat: 37.510712,
            lng: 127.044921,
          },
        },
        {
          location: {
            lat: 37.506512,
            lng: 127.059212,
          },
        },
      ],
    },
    {
      userName: "나는문어나는문어",
      userIcon: "",
      title: "강남 주변 맛집 코스 추천!!",
      createAt: "2023-03-23T05:14:56.611Z",
      start: "강남",
      end: "구로",
      route: ["싱싱해요포차", "빽다방", "마피아피자앤펍", "이디야", "혼술청춘"],
      routeMenu: ["모듬 조개찜", "", "페퍼로니", "", "애플 마티니"],
      info: [
        {
          location: {
            lat: 37.490912,
            lng: 127.111121,
          },
        },
        {
          location: {
            lat: 37.500712,
            lng: 127.112212,
          },
        },
        {
          location: {
            lat: 37.501921,
            lng: 127.138212,
          },
        },
      ],
    },
    {
      userName: "나는문어나는문어",
      userIcon: "",
      title: "강남 주변 맛집 코스 추천!!",
      createAt: "2023-03-23T05:14:56.611Z",
      start: "강남",
      end: "구로",
      route: ["싱싱해요포차", "빽다방", "마피아피자앤펍", "이디야", "혼술청춘"],
      routeMenu: ["모듬 조개찜", "", "페퍼로니", "", "애플 마티니"],
      info: [
        {
          location: {
            lat: 37.550912,
            lng: 126.967112,
          },
        },
        {
          location: {
            lat: 37.547912,
            lng: 126.966122,
          },
        },

        {
          location: {
            lat: 37.549712,
            lng: 126.976212,
          },
        },
        {
          location: {
            lat: 37.545612,
            lng: 126.983312,
          },
        },
        {
          location: {
            lat: 37.539121,
            lng: 126.992412,
          },
        },
      ],
    },
  ];
  useEffectTMapLoad({
    data: test[0],
    setMap,
    marker,
    setMarker,
    findLine,
    setFindLine,
    setInfoWindow,
    isSearch: false,
  });

  const onClickRoute = (event: MouseEvent<HTMLDivElement>): void => {
    // 데이터 생겼을때 데이터 아이디랑 이벤트 타겟 id(여기에 데이터 아이디 바인딩)을 비교해서 같지 않을때만 onClickIsActive제외 전부 실행 되게 onClickIsActive제외은 언제나 실행
    // 어차피 state라서 이전 데이터랑 같은면 변경 안됨
    if (infoWindow[0] !== undefined) {
      infoWindow[0].setVisible(false);
    }
    mapMarker({
      data: test[Number(event.currentTarget.id)],
      map,
      marker,
      setMarker,
      setInfoWindow,
      isSearch: false,
    });
    mapFindRoad({
      data: test[Number(event.currentTarget.id)],
      map,
      findLine,
      setFindLine,
    });
    onClickIsActive(event);
  };
  return (
    <>
      <Head>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=kzTmdjGzc91aQiicRAWjBCpCySY90Cs3AZJ7iVbd"></script>
      </Head>
      <S.Container>
        <S.SelectWrapper>
          <S.BoxWrapper className="start">
            <S.CityWrapper>
              <S.City
                onClick={() => {
                  changeIsStartToggle();
                }}
              >
                <div>{startArea === "" ? "출발지역" : startArea}</div>
                <S.Arrow isStartToggle={isStartToggle} />
              </S.City>
              <S.SelectorWrapper isToggle={isStartToggle}>
                <LocationSelector
                  setLocation={setStartArea}
                  changeIsToggle={changeIsStartToggle}
                />
              </S.SelectorWrapper>
            </S.CityWrapper>

            <S.DistrictWrapper>
              <S.District
                onClick={() => {
                  changeIsStart();
                }}
              >
                <div>{startPoint === "" ? "출발지" : startPoint}</div>
                <S.Arrow isStart={isStart} />
              </S.District>
              <S.SelectorWrapper isToggle={isStart}>
                <SubLocationSelector
                  changeIsToggle={changeIsStart}
                  setSubLocation={setStartPoint}
                />
              </S.SelectorWrapper>
            </S.DistrictWrapper>
          </S.BoxWrapper>

          <S.ArrowImg src="/arrow_or.webp" />

          <S.BoxWrapper className="end">
            <S.CityWrapper>
              <S.City
                onClick={() => {
                  changeIsEndToggle();
                }}
              >
                <div>{endArea === "" ? "도착지역" : endArea}</div>
                <S.Arrow isEndToggle={isEndToggle} />
              </S.City>
              <S.SelectorWrapper isToggle={isEndToggle}>
                <LocationSelector
                  setLocation={setEndArea}
                  changeIsToggle={changeIsEndToggle}
                />
              </S.SelectorWrapper>
            </S.CityWrapper>

            <S.DistrictWrapper>
              <S.District
                onClick={() => {
                  changeIsEnd();
                }}
              >
                <div>{endPoint === "" ? "도착지" : endPoint}</div>
                <S.Arrow isEnd={isEnd} />
              </S.District>
              <S.SelectorWrapper isToggle={isEnd}>
                <SubLocationSelector
                  changeIsToggle={changeIsEnd}
                  setSubLocation={setEndPoint}
                />
              </S.SelectorWrapper>
            </S.DistrictWrapper>
          </S.BoxWrapper>
        </S.SelectWrapper>
        <S.Contents>
          <S.ListWrapper>
            <S.ItemWrapper>
              {test.map((_, idx) => (
                <RouteDetail
                  key={idx}
                  idx={idx}
                  isActive={isActive}
                  onClickRoute={onClickRoute}
                  onClickIsActive={onClickIsActive}
                />
              ))}
              {test.map((_, idx) => (
                <RouteDetail
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
