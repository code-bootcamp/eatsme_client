import { ICreateUserInput } from "../../../../commons/types/generated/types";
import { useMutationCreateUser } from "../mutation/useMutationCreateUser";
import { useRouterMovePage } from "./useRouterMovePage";

interface IUseClickJoin {
  onClickJoin: (data: ICreateUserInput) => Promise<void>;
}

export const useClickJoin = (): IUseClickJoin => {
  const [createUser] = useMutationCreateUser();
  const { routerMovePage } = useRouterMovePage();

  const onClickJoin = async (data: ICreateUserInput): Promise<void> => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            password: data.password,
            nickname: data.nickname,
          },
        },
      });
      console.log(result);
      routerMovePage("/eatsMe/login");
      alert("가입을 환영합니다!");
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return { onClickJoin };
};
