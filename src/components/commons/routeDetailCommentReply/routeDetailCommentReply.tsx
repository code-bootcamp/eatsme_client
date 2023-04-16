import {
  ChangeEvent,
  Dispatch,
  MouseEvent,
  SetStateAction,
  useRef,
} from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { fetchLoginUserState } from "../../../commons/stores";
import {
  ICreateReplyInput,
  IUpdateReplyInput,
} from "../../../commons/types/generated/types";
import { useClickCreateReply } from "../hooks/custom/useClickCreateReply";
import { useClickDeleteReply } from "../hooks/custom/useClickDeleteReply";
import { useClickUpdateReply } from "../hooks/custom/useClickUpdateReply";
import { wrapFormAsync } from "../libraries/asyncFunc";
import * as S from "./routeDetailCommentReplyStyles";

interface IRouteDetailCommentReplyProps {
  data: any;
  id: string;
  isReply: string;
  setIsReply: Dispatch<SetStateAction<string>>;
  isReplyModify: string;
  changeIsReplyModify: (event: MouseEvent) => void;
  setIsReplyModify: Dispatch<SetStateAction<string>>;
  setIsCommentModify: Dispatch<SetStateAction<string>>;
}

export default function RouteDetailCommentReply(
  props: IRouteDetailCommentReplyProps
): JSX.Element {
  const [fetchLoginUser] = useRecoilState(fetchLoginUserState);
  const replyCreateRef = useRef<HTMLTextAreaElement>(null);
  const replyModify = useRef<HTMLTextAreaElement>(null);
  const { handleSubmit, setValue } = useForm<ICreateReplyInput>();
  const {
    handleSubmit: handleSubmit2,
    setValue: setValue2,
    register: register2,
  } = useForm<IUpdateReplyInput>();
  const { onClickCreateReply } = useClickCreateReply();
  const { onClickUpdateReply } = useClickUpdateReply();
  const { onClickDeleteReply } = useClickDeleteReply();

  const onChangeReplyCreate = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (replyCreateRef.current !== null) {
      replyCreateRef.current.style.height = `${
        replyCreateRef.current?.scrollHeight ?? 0
      }px`;
    }
    setValue("commentId", props.id);
    setValue("reply", event.currentTarget.value);
  };

  const onChangeReplyModify = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    if (replyModify.current !== null) {
      replyModify.current.style.height = `${
        replyModify.current?.scrollHeight ?? 0
      }px`;
    }
    setValue2("reply", event.currentTarget.value);
  };

  const onClickReplyModifyIcon =
    (commentId: string) =>
    (event: MouseEvent<HTMLImageElement>): void => {
      event.stopPropagation();
      props.setIsReply("");
      setValue2("commentId", commentId);
      setValue2("replyId", event.currentTarget.id);

      props.changeIsReplyModify(event);
      props.setIsCommentModify("");
    };

  return (
    <>
      {props.isReply === props.id && (
        <S.Container>
          <S.ImgWrapper>
            <img src="/commentArrow.webp" />
          </S.ImgWrapper>

          <S.ReplyWriteWrapper
            onSubmit={wrapFormAsync(
              handleSubmit(onClickCreateReply(props.setIsReply))
            )}
          >
            <S.ReplyUserInfoBox>
              <img
                src={
                  fetchLoginUser.userImg !== null
                    ? `https://storage.googleapis.com/${String(
                        props.data.user?.userImg
                      )}`
                    : "/userImg_small.webp"
                }
              />
              <div>{fetchLoginUser.nickname}</div>
            </S.ReplyUserInfoBox>
            <S.ReplySubmit>등록</S.ReplySubmit>
            <S.ReplyTextarea
              onChange={onChangeReplyCreate}
              ref={replyCreateRef}
            />
          </S.ReplyWriteWrapper>
        </S.Container>
      )}

      {props.data.map((el: any) => (
        <S.Container key={el.id}>
          <S.ImgWrapper>
            <img src="/commentArrow.webp" />
          </S.ImgWrapper>
          <S.ReplyWrapper>
            {fetchLoginUser.id === el.user?.id ? (
              <S.ImgBox>
                <img
                  src="/modify.webp"
                  id={el.id}
                  onClick={onClickReplyModifyIcon(props.id)}
                />
                <img
                  src="/delete.webp"
                  id={el.id}
                  onClick={onClickDeleteReply}
                />
              </S.ImgBox>
            ) : (
              <></>
            )}
            <S.ReplyUserInfoBox>
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
            </S.ReplyUserInfoBox>
            {props.isReplyModify === el.id ? (
              <S.ReplyModifyBox
                onSubmit={wrapFormAsync(
                  handleSubmit2(onClickUpdateReply(props.setIsReplyModify))
                )}
              >
                <S.ReplyMModifyTextarea
                  defaultValue={el?.reply}
                  {...register2("reply")}
                  onChange={onChangeReplyModify}
                  ref={replyModify}
                />
                <S.ReplyModifySubmit>수정</S.ReplyModifySubmit>
              </S.ReplyModifyBox>
            ) : (
              <S.Reply>{el.reply}</S.Reply>
            )}
          </S.ReplyWrapper>
        </S.Container>
      ))}
    </>
  );
}
