import { Dispatch, SetStateAction } from "react";
import * as S from "./locationSelectorStyles";

interface ILocationSelectorProps {
  setLocation: Dispatch<SetStateAction<string>>;
  changeIsToggle: () => void;
}

export default function LocationSelector(
  props: ILocationSelectorProps
): JSX.Element {
  const location = [
    "서울시",
    "부산시",
    "대구시",
    "인천시",
    "광주시",
    "대전시",
    "울산시",
    "경기도",
    "강원도",
    "충청북도",
    "충청남도",
    "전라북도",
    "전라남도",
    "경상북도",
    "경상남도",
    "제주도",
  ];
  const onClickLocation = (location: string) => () => {
    props.setLocation(location);
    props.changeIsToggle();
  };

  return (
    <S.SelectList>
      {location.map((el) => (
        <S.Location key={el} onClick={onClickLocation(el)}>
          {el}
        </S.Location>
      ))}
    </S.SelectList>
  );
}
