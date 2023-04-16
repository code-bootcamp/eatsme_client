import { useQuery } from "@apollo/client";
import { IQuery } from "../../../../../../commons/types/generated/types";
import { FETCH_LOGIN_USER } from "../../../../../commons/hooks/query/useQueryFetchLoginUser";
import * as S from "./reserveListMiddleStyles";

export default function ReserveListMiddle(): JSX.Element {
  const { data } = useQuery<Pick<IQuery, "fetchLoginUser">>(FETCH_LOGIN_USER);

  return (
    <>
      <S.Container>
        <S.Title>예약</S.Title>
        <S.ListWrapper>
          {data?.fetchLoginUser.reservations.map((el, idx) => (
            <S.Wrapper key={idx}>
              <S.FoodImg src="/defaultFood.webp" />
              <S.ReserveBox>
                <S.Align>
                  <S.Img src="/marker_or.webp" />
                  <span>
                    {data.fetchLoginUser.restaurant?.[idx].address !== null
                      ? data.fetchLoginUser.restaurant?.[idx].address
                      : "등록된 주소가 없습니다."}
                  </span>
                </S.Align>
                <S.Align>
                  <S.Img src="/store.webp" />
                  <span>
                    {data.fetchLoginUser.restaurant?.[idx].restaurantName}
                  </span>
                </S.Align>
                <S.ScheduleBox>
                  <S.ScheduleCont>
                    <S.Date>일정 : {el.time}</S.Date>
                    <S.Time>{el.reservation_time}:00</S.Time>
                  </S.ScheduleCont>
                  {/* <S.BtnWrap>
                    <S.EditBtn>수정</S.EditBtn>
                    <S.EditBtn>취소</S.EditBtn>
                  </S.BtnWrap> */}
                </S.ScheduleBox>
              </S.ReserveBox>
            </S.Wrapper>
          ))}
        </S.ListWrapper>
      </S.Container>
    </>
  );
}
