import { useQuery } from "@apollo/client";
import { MouseEvent } from "react";
import { IQuery } from "../../../../../../commons/types/generated/types";
import { useSetIsActive } from "../../../../../commons/hooks/custom/useSetIsActive";
import { FETCH_MY_BOARD } from "../../../../../commons/hooks/query/useQueryFetchMyBoard";
import RouteDetail from "../../../../../commons/routeDetail/routeDetail";
import * as S from "./userWriteListMiddleStyles";

export default function UserWriteListMiddle(): JSX.Element {
  const [isActive, onClickIsActive] = useSetIsActive();
  const { data } = useQuery<Pick<IQuery, "fetchMyBoard">>(FETCH_MY_BOARD);
  const onClickRoute =
    (idx: string) =>
    (e: MouseEvent<HTMLDivElement>): void => {
      onClickIsActive(e);
    };

  return (
    <S.Container>
      <S.Title>내가 쓴 글</S.Title>
      <S.ListWrapper>
        {data?.fetchMyBoard.map((el, idx) => (
          <RouteDetail
            myBoard={true}
            data={el}
            key={idx}
            idx={idx}
            isActive={isActive}
            onClickRoute={onClickRoute}
            onClickIsActive={onClickIsActive}
          />
        ))}
      </S.ListWrapper>
    </S.Container>
  );
}
