import { ChangeEvent, MouseEvent, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { accessTokenState, fetchLoginUserState } from "../../../commons/stores";
import {
  IBoardReturn,
  ICreateCommentInput,
  IUpdateCommentInput,
} from "../../../commons/types/generated/types";
import { useClickCreateComment } from "../hooks/custom/useClickCreateComment";
import { useClickDeleteComment } from "../hooks/custom/useClickDeleteComment";
import { useClickUpdateComment } from "../hooks/custom/useClickUpdateComment";
import { useSetIsActive } from "../hooks/custom/useSetIsActive";
import { wrapFormAsync } from "../libraries/asyncFunc";
import RouteDetailCommentReply from "../routeDetailCommentReply/routeDetailCommentReply";
import * as S from "./routeDetailCommentStyles";

interface IRouteDetailCommentProps {
  data: IBoardReturn;
}

export default function RouteDetailComment(
  props: IRouteDetailCommentProps
): JSX.Element {
  const { register, handleSubmit } = useForm<ICreateCommentInput>();
  const {
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    register: register2,
  } = useForm<IUpdateCommentInput>();
  const [isReply, changeIsReply, setIsReply] = useSetIsActive();
  const [isCommentModify, changeIsCommentModify, setIsCommentModify] =
    useSetIsActive();
  const [isReplyModify, changeIsReplyModify, setIsReplyModify] =
    useSetIsActive();
  const { onClickCreateComment } = useClickCreateComment();
  const { onClickUpdateComment } = useClickUpdateComment();
  const { onClickDeleteComment } = useClickDeleteComment();
  const [fetchLoginUser] = useRecoilState(fetchLoginUserState);
  const CommentModifyRef = useRef<HTMLTextAreaElement>(null);
  const [accessToken] = useRecoilState(accessTokenState);

  const onChangeCommentModify = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (CommentModifyRef.current !== null) {
      CommentModifyRef.current.style.height = `${
        CommentModifyRef.current?.scrollHeight ?? 0
      }px`;
    }
    setValue2("comment", event.currentTarget.value);
  };

  const onClickCommentModifyIcon =
    (boardId: string) =>
    (event: MouseEvent<HTMLImageElement>): void => {
      event.stopPropagation();
      setIsReply("");
      setValue2("boardId", boardId);
      setValue2("commentId", event.currentTarget.id);
      changeIsCommentModify(event);
      setIsReplyModify("");
    };

  const onClickComment = (event: MouseEvent<HTMLDivElement>): void => {
    if (isCommentModify === "" && fetchLoginUser.id !== undefined) {
      changeIsReply(event);
      setIsReplyModify("");
    }
  };

  const onClickCommentSubmit = (data: { comment: string }): void => {
    if (accessToken === "") {
      return;
    }

    if (data.comment === undefined || data.comment === "") {
      return;
    }
    void onClickCreateComment({
      comment: data.comment,
      boardId: props.data.id ?? "",
    });
  };

  return (
    <S.Container>
      <S.WriteWrapper
        onSubmit={wrapFormAsync(handleSubmit(onClickCommentSubmit))}
      >
        <input
          type="text"
          placeholder="댓글을 입력해 주세요."
          {...register("comment")}
        />
        <button>등록</button>
      </S.WriteWrapper>
      <S.DivideLine></S.DivideLine>
      {props.data?.comments?.map((el) => (
        <S.CommentContainer key={el.id}>
          <S.CommentsWrapper id={el.id} onClick={onClickComment}>
            {fetchLoginUser.id === el.user?.id ? (
              <S.ImgBox>
                <img
                  src="/modify.webp"
                  id={el.id ?? ""}
                  onClick={onClickCommentModifyIcon(props.data.id ?? "")}
                />
                <img
                  src="/delete.webp"
                  id={el.id}
                  onClick={onClickDeleteComment}
                />
              </S.ImgBox>
            ) : (
              <></>
            )}
            <S.UserInfoBox>
              <img
                src={
                  el.user?.userImg !== null
                    ? `https://storage.googleapis.com/${String(
                        el.user?.userImg
                      )}`
                    : "/userImg_small.webp"
                }
              />
              <div>{el.user?.nickname}</div>
            </S.UserInfoBox>
            {isCommentModify === el.id ? (
              <S.CommentsModifyBox
                onSubmit={wrapFormAsync(
                  handleSubmit2(onClickUpdateComment(setIsCommentModify))
                )}
              >
                <S.CommentsModifyTextarea
                  defaultValue={el.comment}
                  {...register2("comment")}
                  onChange={onChangeCommentModify}
                  ref={CommentModifyRef}
                />
                <S.CommentsModifySubmit>수정</S.CommentsModifySubmit>
              </S.CommentsModifyBox>
            ) : (
              <S.Comments>{el.comment}</S.Comments>
            )}
          </S.CommentsWrapper>
          <RouteDetailCommentReply
            data={el.replies}
            id={el.id}
            isReply={isReply}
            setIsReply={setIsReply}
            isReplyModify={isReplyModify}
            changeIsReplyModify={changeIsReplyModify}
            setIsReplyModify={setIsReplyModify}
            setIsCommentModify={setIsCommentModify}
          />
        </S.CommentContainer>
      ))}
    </S.Container>
  );
}
