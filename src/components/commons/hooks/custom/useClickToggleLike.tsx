import { useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationToggleLikeArgs,
} from "../../../../commons/types/generated/types";
import { TOGGLE_LIKE } from "../mutation/useMutationToggleLike";
import { FETCH_MY_LIKE_BOARD } from "../query/useQueryFetchMyLikeBoard";

interface IUseClickToggleLike {
  onClickToggleLike: (boardId: string) => Promise<void>;
}

export const useClickToggleLike = (): IUseClickToggleLike => {
  const [toggleLike] = useMutation<
    Pick<IMutation, "toggleLike">,
    IMutationToggleLikeArgs
  >(TOGGLE_LIKE);
  const onClickToggleLike = async (boardId: string): Promise<void> => {
    try {
      await toggleLike({
        variables: { boardId },
        refetchQueries: [
          {
            query: FETCH_MY_LIKE_BOARD,
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
  return { onClickToggleLike };
};
