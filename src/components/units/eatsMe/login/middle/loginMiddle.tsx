import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import {
  ILoginFormData,
  useClickLogin,
} from "../../../../commons/hooks/custom/useClickLogin";
import { useRouterMovePage } from "../../../../commons/hooks/custom/useRouterMovePage";
import { wrapAsync } from "../../../../commons/libraries/asyncFunc";
import * as S from "./loginMiddleStyles";
import { schema } from "./loginMiddleValidation";

export default function LoginMiddle(): JSX.Element {
  const router = useRouter();
  const { onClickMovePage } = useRouterMovePage();
  const { onClickLogin } = useClickLogin();
  const { register, handleSubmit, formState } = useForm<ILoginFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickKakao = (): any => {
    void router.push("https://eatsme.site");
  };

  const onClickGoogle = (): any => {
    void router.push("");
  };

  return (
    <S.Container>
      <S.Wrapper
        <form onSubmit={wrapAsync(handleSubmit(onClickLogin))}>
          <S.Title>
            <h1>로그인</h1>
            <span>Log-in</span>
          </S.Title>
          <S.DivideLine></S.DivideLine>
          <S.EmailBox>
            <input type="text" placeholder="이메일" {...register("email")} />
            <p>{formState.errors.email?.message}</p>
          </S.EmailBox>
          <S.PasswordBox>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password")}
            />
            <p>{formState.errors.password?.message}</p>
          </S.PasswordBox>
          <S.LoginBox>
            <button>로그인</button>
            <S.SuggestBox>
              <div>
                <span>아직 회원이 아니신가요?</span>
                <button type="button" onClick={onClickMovePage("/eatsMe/join")}>
                  회원가입
                </button>
              </div>
              <div>
                <span>비밀번호를 잊어버리셨나요?</span>
                <button
                  type="button"
                  onClick={onClickMovePage("/eatsMe/passwordSearch")}
                >
                  비밀번호 찾기
                </button>
              </div>
            </S.SuggestBox>
          </S.LoginBox>
        </form>
        <S.SNSBox>
          <span>SNS 로그인하기</span>
          <div>
            <img onClick={onClickKakao} src="/kakao.webp" />

            <img onClick={onClickGoogle} src="/google.webp" />
          </div>
        </S.SNSBox>
      </S.Wrapper>
    </S.Container>
  );
}
