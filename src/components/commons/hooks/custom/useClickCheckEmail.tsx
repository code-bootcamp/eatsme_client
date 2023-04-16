import { IMutationCheckEmailArgs } from "../../../../commons/types/generated/types";
import { useMutationCheckEmail } from "../mutation/useMutationCheckEmail";

interface IUseClickCheckEmail {
  onClickCheckEmail: (data: IMutationCheckEmailArgs) => Promise<void>;
}

export const useClickCheckEmail = (): IUseClickCheckEmail => {
  const [checkEmail] = useMutationCheckEmail();

  const onClickCheckEmail = async (
    data: IMutationCheckEmailArgs
  ): Promise<void> => {
    try {
      await checkEmail({
        variables: {
          email: data.email,
        },
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return { onClickCheckEmail };
};
