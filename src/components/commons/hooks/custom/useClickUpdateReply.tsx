import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { fetchBoardsByEveryInputState } from "../../../../commons/stores";
import { IUpdateReplyInput } from "../../../../commons/types/generated/types";
import { useMutationUpdateReply } from "../mutation/useMutationUpdateReply";
import { FETCH_BOARD_BY_EVERY } from "../query/useQueryFetchBoardsByEvery";

interface IUseClickUpdateReply {
  onClickUpdateReply: (
    setIsReplyModify: Dispatch<SetStateAction<string>>
  ) => (updateReplyInput: IUpdateReplyInput) => Promise<void>;
}

export const useClickUpdateReply = (): IUseClickUpdateReply => {
  const [updateReply] = useMutationUpdateReply();
  const [fetchBoardsByEveryInput] = useRecoilState(
    fetchBoardsByEveryInputState
  );

  const onClickUpdateReply =
    (setIsReplyModify: Dispatch<SetStateAction<string>>) =>
    async (updateReplyInput: IUpdateReplyInput): Promise<void> => {
      try {
        if (
          updateReplyInput.reply === undefined ||
          updateReplyInput.reply === ""
        ) {
          setIsReplyModify("");
          return;
        }
        await updateReply({
          variables: { updateReplyInput },
          refetchQueries: [
            {
              query: FETCH_BOARD_BY_EVERY,
              variables: { fetchBoardsByEveryInput },
            },
          ],
        });
        setIsReplyModify("");
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };

  return { onClickUpdateReply };
};
