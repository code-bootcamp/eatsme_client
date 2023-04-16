import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { fetchBoardsByEveryInputState } from "../../../../commons/stores";
import { ICreateReplyInput } from "../../../../commons/types/generated/types";
import { useMutationCreateReply } from "../mutation/useMutationCreateReply";
import { FETCH_BOARD_BY_EVERY } from "../query/useQueryFetchBoardsByEvery";

interface IUseClickCreateReply {
  onClickCreateReply: (
    setIsReply: Dispatch<SetStateAction<string>>
  ) => (createReplyInput: ICreateReplyInput) => Promise<void>;
}

export const useClickCreateReply = (): IUseClickCreateReply => {
  const [createReply] = useMutationCreateReply();
  const [fetchBoardsByEveryInput] = useRecoilState(
    fetchBoardsByEveryInputState
  );

  const onClickCreateReply =
    (setIsReply: Dispatch<SetStateAction<string>>) =>
    async (createReplyInput: ICreateReplyInput): Promise<void> => {
      try {
        if (
          createReplyInput.reply === undefined ||
          createReplyInput.reply === ""
        ) {
          setIsReply("");
          return;
        }
        await createReply({
          variables: { createReplyInput },
          refetchQueries: [
            {
              query: FETCH_BOARD_BY_EVERY,
              variables: { fetchBoardsByEveryInput },
            },
          ],
        });
        setIsReply("");
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };

  return { onClickCreateReply };
};
