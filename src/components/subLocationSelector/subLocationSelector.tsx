import { Dispatch, SetStateAction } from "react";
import * as S from "./subLocationSelectorStyles";

interface IProps {
  setSubLocation: Dispatch<SetStateAction<string>>;
  changeIsToggle: () => void;
  location: string;
}

type ISubLocation = Record<string, string[]>;

export default function SubLocationSelector(props: IProps): JSX.Element {
  const subLocation: ISubLocation = {
    서울시: [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    부산시: [
      "중구",
      "서구",
      "동구",
      "영도구",
      "부산진구",
      "동래구",
      "남구",
      "북구",
      "해운대구",
      "사하구",
      "금정구",
      "강서구",
      "연제구",
      "수영구",
      "사상구",
      "사상구",
    ],
    대구시: [
      "중구",
      "동구",
      "서구",
      "남구",
      "북구",
      "수성구",
      "달서구",
      "달성군",
    ],
    인천시: [
      "강화군",
      "옹진군",
      "중구",
      "동구",
      "미추홀구",
      "연수구",
      "남동구",
      "부평구",
      "계양구",
      "서구",
    ],
    광주시: ["동구", "서구", "남구", "북구", "광산구"],
    대전시: ["동구", "중구", "서구", "유성구", "대덕구"],
    울산시: ["중구", "남구", "동구", "북구", "울주군"],
    경기도: [
      "수원시",
      "성남시",
      "안양시",
      "부천시",
      "광명시",
      "평택시",
      "안산시",
      "과천시",
      "오산시",
      "시흥시",
      "군포시",
      "의왕시",
      "하남시",
      "용인시",
      "이천시",
      "안성시",
      "김포시",
      "화성시",
      "광주시",
      "여주시",
      "양평군",
      "의정부시",
      "동두천시",
      "고양시",
      "구리시",
      "남양주시",
      "파주시",
      "양주시",
      "포천시",
      "연천군",
      "가평군",
    ],
    강원도: [
      "춘천시",
      "원주시",
      "강릉시",
      "동해시",
      "태백시",
      "속초시",
      "삼척시",
      "홍천군",
      "횡성군",
      "영월군",
      "평창군",
      "정선군",
      "철원군",
      "화천군",
      "양구군",
      "인제군",
      "고성군",
      "양양군",
    ],
    충청북도: [
      "청주시",
      "충주시",
      "제천시",
      "보은군",
      "옥천군",
      "영동군",
      "증평군",
      "진천군",
      "괴산군",
      "음성군",
      "단양군",
    ],
    충청남도: [
      "천안시",
      "공주시",
      "보령시",
      "아산시",
      "서산시",
      "논산시",
      "계룡시",
      "당진시",
      "금산군",
      "부여군",
      "서천군",
      "청양군",
      "홍성군",
      "예산군",
      "태안군",
    ],
    전라북도: [
      "전주시",
      "군산시",
      "익산시",
      "정읍시",
      "남원시",
      "김제시",
      "완주군",
      "진안군",
      "무주군",
      "장수군",
      "임실군",
      "순창군",
      "고창군",
      "부안군",
    ],
    전라남도: [
      "목포시",
      "여수시",
      "순천시",
      "나주시",
      "광양시",
      "담양군",
      "곡성군",
      "구례군",
      "고흥군",
      "보성군",
      "화순군",
      "장흥군",
      "강진군",
      "해남군",
      "영암군",
      "무안군",
      "함평군",
      "영광군",
      "장성군",
      "완도군",
      "진도군",
    ],
    경상북도: [
      "포항시",
      "경주시",
      "안동시",
      "김천시",
      "구미시",
      "영주시",
      "영천시",
      "상주시",
      "문경시",
      "경산시",
      "군위군",
      "의성군",
      "청송군",
      "영양군",
      "영덕군",
      "청도군",
      "고령군",
      "성주군",
      "칠곡군",
      "예천군",
      "봉화군",
      "울진군",
      "울릉군",
    ],
    경상남도: [
      "창원시",
      "진주시",
      "김해시",
      "양산시",
      "거제시",
      "통영시",
      "사천시",
      "밀양시",
      "의령군",
      "함안군",
      "창녕군",
      "고성군",
      "남해군",
      "하동군",
      "산청군",
      "함양군",
      "거창군",
      "합천군",
    ],
    제주도: [
      "제주시",
      "서귀포시",
      "애월",
      "한림",
      "환경",
      "대정",
      "안덕",
      "중문",
      "남원",
      "표선",
      "성산",
      "구좌",
      "조천",
      "추자도",
      "우도",
    ],
  };

  const onClickLocation = (location: string) => () => {
    props.setSubLocation(location);
    props.changeIsToggle();
  };

  return (
    <S.SelectList>
      {subLocation[props.location === "" ? "서울시" : props.location].map(
        (el: string) => (
          <S.Location key={el} onClick={onClickLocation(el)}>
            {el}
          </S.Location>
        )
      )}
    </S.SelectList>
  );
}
