import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/stores";
import { UseMutationLogin } from "../mutation/useMutationLogin";
import { useRouterMovePage } from "./useRouterMovePage";
import { ILoginAuthInput } from "../../../../commons/types/generated/types";

export interface ILoginFormData {
  email: string;
  password: string;
}

interface IUseClickLogin {
  onClickLogin: (data: ILoginAuthInput) => Promise<void>;
}

export const useClickLogin = (): IUseClickLogin => {
  const [loginUser] = UseMutationLogin();
  const [, setAccessToken] = useRecoilState(accessTokenState);
  const { routerMovePage } = useRouterMovePage();

  const onClickLogin = async (data: ILoginAuthInput): Promise<void> => {
    try {
      if (data.email !== "" && data.password !== "") {
        const result = await loginUser({
          variables: {
            loginAuthInput: {
              email: data.email,
              password: data.password,
            },
          },
        });
        if (result.data?.login === undefined) {
          alert("로그인에 실패했습니다.");
          return;
        }
        setAccessToken(result.data?.login);
        routerMovePage("/");
      }
    } catch (error) {
      alert("로그인 정보를 확인해 주세요.");
    }
  };
  return { onClickLogin };
};
