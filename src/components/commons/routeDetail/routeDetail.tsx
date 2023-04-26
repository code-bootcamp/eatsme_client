import { useQuery } from "@apollo/client";
import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../commons/stores";

import { IBoardReturn, IQuery } from "../../../commons/types/generated/types";
import { useClickToggleLike } from "../hooks/custom/useClickToggleLike";
import { useCreateAtTime } from "../hooks/custom/useCreateAtTime";
import { FETCH_MY_LIKE_BOARD } from "../hooks/query/useQueryFetchMyLikeBoard";
import RouteDetailComment from "../routeDetailComment/routeDetailComment";
import * as S from "./routeDetailStyles";

interface IRouteDetailProps {
  myBoard?: boolean;
  data: IBoardReturn;
  idx: number;
  isActive: string;
  onClickRoute?: any;
  onClickIsActive: (event: MouseEvent<Element, globalThis.MouseEvent>) => void;
}

export default function RouteDetail(props: IRouteDetailProps): JSX.Element {
  const { lastCreateTime } = useCreateAtTime();
  const { onClickToggleLike } = useClickToggleLike();
  const { data: likeData } =
    useQuery<Pick<IQuery, "fetchMyLikeBoard">>(FETCH_MY_LIKE_BOARD);
  const [accessToken] = useRecoilState(accessTokenState);

  const onClickLike = (event: MouseEvent<HTMLImageElement>): void => {
    if (accessToken === "") {
      return;
    }
    event.stopPropagation();
    if (props.data.id !== undefined && props.data.id !== null) {
      void onClickToggleLike(props.data?.id);
    }
  };

  const onClickEdit = (event: MouseEvent<HTMLImageElement>): void => {
    window.location.href = `/eatsMe/routeWrite/${event.currentTarget.id}`;
  };
  return (
    <S.Container>
      <S.TopWrapper
        id={String(props.idx)}
        onClick={props.onClickRoute?.(String(props.idx))}
      >
        {props.myBoard === true && (
          <S.ModifyImg
            src={"/modify.webp"}
            id={String(props.data.id)}
            onClick={onClickEdit}
          />
        )}
        <S.HeartImg
          src={
            likeData?.fetchMyLikeBoard.some((el) => el.id === props.data.id) ??
            false
              ? "/heart_fill.webp"
              : "/heart_empty.webp"
          }
          onClick={onClickLike}
        />
        <S.UserInfoWBox>
          <S.UserImg>
            <img
              src={
                props.data?.user?.userImg !== null
                  ? `https://storage.googleapis.com/${String(
                      props.data?.user?.userImg
                    )}`
                  : "/userImg_small.webp"
              }
            />
          </S.UserImg>
          <div>{props.data.user?.nickname}</div>
        </S.UserInfoWBox>
        <S.TitleBox>
          <S.RouteTitle>{props.data.title}</S.RouteTitle>
          <S.CreateAt>{lastCreateTime(props.data.createdAt)}</S.CreateAt>
        </S.TitleBox>
        <S.LocationBox>
          <S.StartEndLocation>
            <div>출발</div>
            <div>{props.data.startArea}</div>
          </S.StartEndLocation>
          <S.ListArrowImg>
            <img src="/arrow_or.webp" />
          </S.ListArrowImg>
          <S.StartEndLocation>
            <div>도착</div>
            <div>{props.data.endArea}</div>
          </S.StartEndLocation>
        </S.LocationBox>
      </S.TopWrapper>
      <S.ArrowDownImg
        src={
          props.isActive === String(props.idx)
            ? "/arrow_up.webp"
            : "/arrow_down.webp"
        }
        onClick={props.onClickIsActive}
      />
      {props.isActive === String(props.idx) ? (
        <>
          <S.DivideLine></S.DivideLine>
          <S.BottomWrapper>
            <S.RestaurantBox>
              {props.data?.personalMapData?.map((el, idx) => {
                if (idx === 1) {
                  return null;
                }
                return (
                  <S.RestaurantName key={idx}>
                    <S.ImgCircle src="/routeCircle_first.webp" />
                    <div>
                      {`${el.restaurantName ?? ""} ${
                        el.recommend !== "" ? "|" : ""
                      } ${el.recommend ?? ""}`}
                    </div>
                  </S.RestaurantName>
                );
              })}
              <S.RestaurantName>
                <S.ImgCircle src="/routeCircle_first.webp" />
                <div>
                  {`${props.data?.personalMapData?.[1]?.restaurantName ?? ""} ${
                    props.data?.personalMapData?.[1]?.recommend !== ""
                      ? "|"
                      : ""
                  } ${props.data?.personalMapData?.[1]?.recommend ?? ""}`}
                </div>
              </S.RestaurantName>
            </S.RestaurantBox>
            <RouteDetailComment data={props.data} />
          </S.BottomWrapper>
        </>
      ) : (
        <></>
      )}
    </S.Container>
  );
}
