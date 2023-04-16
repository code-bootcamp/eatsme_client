import {
  FormState,
  UseFormGetValues,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { IMutationCheckEmailArgs } from "../../../commons/types/generated/types";
import { useClickCheckEmail } from "../hooks/custom/useClickCheckEmail";
import { useClickMatchAuth } from "../hooks/custom/useClickMatchAuth";
import { useTimer } from "../hooks/custom/useTimer";
import * as S from "./joinEmailStyles";

interface IJoinEmail {
  formState2: FormState<{
    email: string;
    authNumber: string;
  }>;
  register2: UseFormRegister<{
    email: string;
    authNumber: string;
  }>;
  getValues2: UseFormGetValues<{
    email: string;
    authNumber: string;
  }>;
  setValue2: UseFormSetValue<{
    email: string;
    authNumber: string;
  }>;
  handleSubmit2: UseFormHandleSubmit<{
    email: string;
    authNumber: string;
  }>;

  formState3: FormState<{
    email: string;
  }>;
  register3: UseFormRegister<{
    email: string;
  }>;
  handleSubmit3: UseFormHandleSubmit<{
    email: string;
  }>;
  getValues3: UseFormGetValues<{
    email: string;
  }>;
}

export default function JoinEmail(props: IJoinEmail): JSX.Element {
  const { onClickCheckEmail } = useClickCheckEmail();
  const { time, setTime, setIsStarted } = useTimer();
  const { onClickMatchAuth } = useClickMatchAuth(setTime);
  const min = Math.floor(time / 60);
  const sec = String(time % 60).padStart(2, "0");

  const onClickAuth = async (data: IMutationCheckEmailArgs): Promise<void> => {
    setTime(30);
    setIsStarted(true);
    await onClickCheckEmail(data);
    props.setValue2("email", data.email);
  };

  return (
    <>
      <S.EmailBox>
        <S.FormBox id={"1"} onSubmit={props.handleSubmit3(onClickAuth)}>
          <span>이메일</span>
          <input
            type="text"
            placeholder="이메일"
            {...props.register3("email")}
          />
          <p>{props.formState3.errors.email?.message}</p>
          <S.EmailTokenBtn
            isActive={time > 0 && props.formState3.dirtyFields.email}
            disabled={props.formState3.dirtyFields.email === false}
          >
            인증번호 보내기
          </S.EmailTokenBtn>
        </S.FormBox>
        <S.AccreditBox>
          <span>이메일로 전송된 인증번호를 입력해주세요.</span>
          <S.TokenBox>
            <input
              type="text"
              placeholder="인증번호 6자리 입력"
              {...props.register2("authNumber")}
            />

            <span id="timer">
              {min}:{sec}
            </span>

            <form onSubmit={props.handleSubmit2(onClickMatchAuth)}>
              <S.TokenBtn
                isActive={time > 0 && time !== 30}
                disabled={time === 0 || !props.formState2.isValid}
              >
                확인
              </S.TokenBtn>
            </form>
          </S.TokenBox>

          <button form={"1"} type="submit" disabled={time !== 0}>
            인증번호 재전송하기
          </button>
          <p>{props.formState2.errors.authNumber?.message}</p>
        </S.AccreditBox>
      </S.EmailBox>
    </>
  );
}
