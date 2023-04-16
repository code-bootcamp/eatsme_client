import { useQuery } from "@apollo/client";
import { MouseEvent } from "react";
import { IQuery } from "../../../../../../commons/types/generated/types";
import { useSetIsActive } from "../../../../../commons/hooks/custom/useSetIsActive";
import { FETCH_MY_LIKE_BOARD } from "../../../../../commons/hooks/query/useQueryFetchMyLikeBoard";
import RouteDetail from "../../../../../commons/routeDetail/routeDetail";
import * as S from "./pickedListMiddleStyles";

export default function PickedListMiddle(): JSX.Element {
  const [isActive, onClickIsActive] = useSetIsActive();

  const { data } =
    useQuery<Pick<IQuery, "fetchMyLikeBoard">>(FETCH_MY_LIKE_BOARD);

  const onClickRoute =
    (idx: string) =>
    (e: MouseEvent<HTMLDivElement>): void => {
      onClickIsActive(e);
    };

  return (
    <S.Container>
      <S.Title>목록</S.Title>
      <S.ListWrapper>
        {data?.fetchMyLikeBoard.map((el, idx) => (
          <RouteDetail
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
