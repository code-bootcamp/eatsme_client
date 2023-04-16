import { useRecoilState } from "recoil";
import { fetchBoardsByEveryInputState } from "../../../../commons/stores";
import { ICreateCommentInput } from "../../../../commons/types/generated/types";
import { useMutationCreateComment } from "../mutation/useMutationCreateComment";
import { FETCH_BOARD_BY_EVERY } from "../query/useQueryFetchBoardsByEvery";

interface IUseClickCreateComment {
  onClickCreateComment: (
    createCommentInput: ICreateCommentInput
  ) => Promise<void>;
}

export const useClickCreateComment = (): IUseClickCreateComment => {
  const [createComment] = useMutationCreateComment();
  const [fetchBoardsByEveryInput] = useRecoilState(
    fetchBoardsByEveryInputState
  );

  const onClickCreateComment = async (
    createCommentInput: ICreateCommentInput
  ): Promise<void> => {
    try {
      await createComment({
        variables: {
          createCommentInput,
        },
        refetchQueries: [
          {
            query: FETCH_BOARD_BY_EVERY,
            variables: { fetchBoardsByEveryInput },
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
  return { onClickCreateComment };
};
