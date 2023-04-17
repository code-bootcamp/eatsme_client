import { useEffect, useState } from "react";
import axios from "axios";
import { useSetIsToggle } from "../../../../commons/hooks/custom/useSetIsToggle";
import SubLocationSelector from "../../../../commons/subLocationSelector/subLocationSelector";
import * as S from "./popularListTopStyles";
import LocationSelector from "../../../../commons/locationSelector/locationSelector";

export default function PopularListTop(props: any): JSX.Element {
  const [startArea, setStartArea] = useState("");
  const [startPoint, setStartPoint] = useState("");
  const [isStartToggle, changeIsStartToggle] = useSetIsToggle();
  const [isStart, changeIsStart] = useSetIsToggle();

  useEffect(() => {
    const location = localStorage.getItem("startArea");
    setStartArea(location !== null ? location : "서울시");
  }, []);

  useEffect(() => {
    if (startArea !== "" && startPoint !== "") {
      const showList = async (): Promise<void> => {
        const result = await axios.get(
          `https://sit-woo.store/info/road/restaurant?area=${startArea}&section=${startPoint}`
        );
        props.setLocation(result);
      };
      void showList();
    }
  }, [startArea, startPoint]);

  return (
    <S.Container>
      <S.Wrapper>
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
              isList={false}
              subLocation={startPoint}
              location={startArea}
              changeIsToggle={changeIsStart}
              setSubLocation={setStartPoint}
            />
          </S.SelectorWrapper>
        </S.DistrictWrapper>
      </S.Wrapper>
    </S.Container>
  );
}
