import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { fetchBoardsByEveryInputState } from "../../../../commons/stores";
import { useMutationDeleteComment } from "../mutation/useMutationDeleteComment";
import { FETCH_BOARD_BY_EVERY } from "../query/useQueryFetchBoardsByEvery";

interface IUseClickDeleteComment {
  onClickDeleteComment: (event: MouseEvent<HTMLImageElement>) => Promise<void>;
}

export const useClickDeleteComment = (): IUseClickDeleteComment => {
  const [deleteComment] = useMutationDeleteComment();
  const [fetchBoardsByEveryInput] = useRecoilState(
    fetchBoardsByEveryInputState
  );

  const onClickDeleteComment = async (
    event: MouseEvent<HTMLImageElement>
  ): Promise<void> => {
    try {
      await deleteComment({
        variables: { commentId: event.currentTarget.id },
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

  return { onClickDeleteComment };
};
