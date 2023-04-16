import { ApolloQueryResult } from "@apollo/client";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  fetchBoardsByEveryInputState,
  mapState,
} from "../../../../../commons/stores";
import {
  IQuery,
  IQueryFetchBoardsByEveryArgs,
} from "../../../../../commons/types/generated/types";
import { useSetIsToggle } from "../../../../commons/hooks/custom/useSetIsToggle";
import LocationSelector from "../../../../commons/locationSelector/locationSelector";
import SubLocationSelector from "../../../../commons/subLocationSelector/subLocationSelector";
import * as S from "./routeListTopStyles";

interface IRouteListTopProps {
  data: Pick<IQuery, "fetchBoardsByEvery"> | undefined;
  refetch: (
    variables?: Partial<IQueryFetchBoardsByEveryArgs> | undefined
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoardsByEvery">>>;
}

export default function RouteListTop(props: IRouteListTopProps): JSX.Element {
  const [isStart, changeIsStart] = useSetIsToggle();
  const [isEnd, changeIsEnd] = useSetIsToggle();
  const [startPoint, setStartPoint] = useState("");
  const [endPoint, setEndPoint] = useState("");
  const [startArea, setStartArea] = useState("서울시");
  const [endArea, setEndArea] = useState("");
  const [isStartToggle, changeIsStartToggle] = useSetIsToggle();
  const [isEndToggle, changeIsEndToggle] = useSetIsToggle();
  const [reserve] = useState("");
  const [isLoad, setIsLoad] = useState(false);
  const [map] = useRecoilState(mapState);
  const [, setFetchBoardsByEveryInput] = useRecoilState(
    fetchBoardsByEveryInputState
  );

  useEffect(() => {
    if (Object.keys(map).length !== 0) {
      const obj = { startPoint, endPoint, startArea, endArea };
      const fetchBoardsByEveryInput = Object.fromEntries(
        Object.entries(obj).filter(([_, value]) => value !== "")
      );
      setFetchBoardsByEveryInput(fetchBoardsByEveryInput);
      void props.refetch({ fetchBoardsByEveryInput });
    }
  }, [startPoint, endPoint, startArea, endArea]);

  useEffect(() => {
    if (reserve !== "") {
      localStorage.setItem("reserve", JSON.stringify(reserve));
      window.location.href = "/eatsMe/reserve";
    }
  }, [reserve]);

  return (
    <S.Container>
      <S.routeWriteBtn href="/eatsMe/routeWrite">코스 작성</S.routeWriteBtn>
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
                isLoad={isLoad}
                isList={true}
                setIsLoad={setIsLoad}
                location={startArea}
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
                location={endArea}
                changeIsToggle={changeIsEnd}
                setSubLocation={setEndPoint}
              />
            </S.SelectorWrapper>
          </S.DistrictWrapper>
        </S.BoxWrapper>
      </S.SelectWrapper>
    </S.Container>
  );
}
