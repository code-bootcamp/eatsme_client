import { Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { fetchBoardsByEveryInputState } from "../../../../commons/stores";
import { IUpdateCommentInput } from "../../../../commons/types/generated/types";
import { useMutationUpdateComment } from "../mutation/useMutationUpdateComment";
import { FETCH_BOARD_BY_EVERY } from "../query/useQueryFetchBoardsByEvery";

interface IUseClickUpdateComment {
  onClickUpdateComment: (
    setIsCommentModify: Dispatch<SetStateAction<string>>
  ) => (updateCommentInput: IUpdateCommentInput) => Promise<void>;
}

export const useClickUpdateComment = (): IUseClickUpdateComment => {
  const [updateComment] = useMutationUpdateComment();
  const [fetchBoardsByEveryInput] = useRecoilState(
    fetchBoardsByEveryInputState
  );

  const onClickUpdateComment =
    (setIsCommentModify: Dispatch<SetStateAction<string>>) =>
    async (updateCommentInput: IUpdateCommentInput): Promise<void> => {
      try {
        if (
          updateCommentInput.comment === undefined ||
          updateCommentInput.comment === ""
        ) {
          setIsCommentModify("");
          return;
        }

        await updateComment({
          variables: {
            updateCommentInput,
          },
          refetchQueries: [
            {
              query: FETCH_BOARD_BY_EVERY,
              variables: { fetchBoardsByEveryInput },
            },
          ],
        });
        setIsCommentModify("");
      } catch (error) {
        if (error instanceof Error) console.log(error.message);
      }
    };
  return { onClickUpdateComment };
};
