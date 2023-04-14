import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./joinMiddleStyles";
import { useClickJoin } from "../../../../commons/hooks/custom/useClickJoin";
import JoinEmail from "../../../../commons/joinEmail/joinEmail";
import { wrapAsync } from "../../../../commons/libraries/asyncFunc";
import { schema1 } from "./joinMidleValidation";
import { schema2 } from "../../../../commons/joinEmail/joinEmailValidation2";
import { schema3 } from "../../../../commons/joinEmail/joinEmailValidation3";

export interface IJoinFormData {
  email: string;
  authNumber: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

export default function JoinMiddle(): JSX.Element {
  const { onClickJoin } = useClickJoin();
  const {
    formState: formState1,
    register: register1,
    handleSubmit: handleSubmit1,
    getValues: getValues1,
  } = useForm<IJoinFormData>({
    resolver: yupResolver(schema1),
    mode: "onChange",
  });

  const {
    formState: formState2,
    register: register2,
    handleSubmit: handleSubmit2,
    getValues: getValues2,
    setValue: setValue2,
  } = useForm<{ email: string; authNumber: string }>({
    resolver: yupResolver(schema2),
    mode: "onChange",
  });
  const {
    formState: formState3,
    register: register3,
    handleSubmit: handleSubmit3,
    getValues: getValues3,
  } = useForm<{ email: string }>({
    resolver: yupResolver(schema3),
    mode: "onChange",
  });

  const onClickSubmit = (): void => {
    const data1 = getValues1();
    const data2 = getValues2();
    const data3 = getValues3();

    const isValid1 = schema1.isValidSync(data1);
    const isValid2 = schema2.isValidSync(data2);
    const isValid3 = schema2.isValidSync(data3);
    console.log(isValid3);

    if (isValid1 && isValid2) {
      const data = { ...data1, ...data2 };

      void onClickJoin(data);
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Title>
          <h1>회원가입</h1>
          <span>join us</span>
        </S.Title>

        <S.DivideLine></S.DivideLine>
        <JoinEmail
          formState2={formState2}
          register2={register2}
          getValues2={getValues2}
          setValue2={setValue2}
          handleSubmit2={handleSubmit2}
          formState3={formState3}
          register3={register3}
          handleSubmit3={handleSubmit3}
          getValues3={getValues3}
        />
        <S.PwdForm onSubmit={wrapAsync(handleSubmit1(onClickSubmit))}>
          <S.PasswordBox>
            <span>비밀번호</span>
            <input
              type="password"
              placeholder="비밀번호"
              {...register1("password")}
            />
            <p>{formState1.errors.password?.message}</p>
            <span>비밀번호 확인</span>
            <input
              type="password"
              placeholder="비밀번호 확인"
              {...register1("passwordCheck")}
            />
            <p>{formState1.errors.passwordCheck?.message}</p>
          </S.PasswordBox>
          <S.NicknameBox>
            <span>닉네임</span>
            <div>
              <input
                type="text"
                placeholder="닉네임"
                {...register1("nickname")}
              />
            </div>
            <p>{formState1.errors.nickname?.message}</p>
          </S.NicknameBox>
          <S.BtnBox>
            <S.JoinBtn
              isActive={formState1.isValid && formState2.isValid}
              disabled={!formState1.isValid && !formState2.isValid}
            >
              회원가입
            </S.JoinBtn>
            <div>
              이미 아이디가 있으신가요?
              <button type="button">로그인</button>
            </div>
          </S.BtnBox>
        </S.PwdForm>
      </S.Wrapper>
    </S.Container>
  );
}
