import { IMatchAuthNumberInput } from "../../../../commons/types/generated/types";
import { useMutationMatchAuthNumber } from "../mutation/useMutationMatchAuthNumber";

interface IUseClickMatchAuth {
  onClickMatchAuth: (data: IMatchAuthNumberInput) => Promise<void>;
}

export const useClickMatchAuth = (
  setTime: React.Dispatch<React.SetStateAction<number>>
): IUseClickMatchAuth => {
  const [matchAuth] = useMutationMatchAuthNumber();

  const onClickMatchAuth = async (
    data: IMatchAuthNumberInput
  ): Promise<void> => {
    try {
      await matchAuth({
        variables: {
          matchAuthNumberInput: {
            email: data.email,
            authNumber: data.authNumber,
          },
        },
      });
      alert("인증에 성공하셨습니다");
      setTime(0);
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
  return { onClickMatchAuth };
};
