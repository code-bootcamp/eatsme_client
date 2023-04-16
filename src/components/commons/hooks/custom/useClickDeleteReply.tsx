import { MouseEvent } from "react";
import { useRecoilState } from "recoil";
import { fetchBoardsByEveryInputState } from "../../../../commons/stores";
import { useMutationDeleteReply } from "../mutation/useMutationDeleteReply";
import { FETCH_BOARD_BY_EVERY } from "../query/useQueryFetchBoardsByEvery";

interface IUseClickDeleteReply {
  onClickDeleteReply: (event: MouseEvent<HTMLImageElement>) => Promise<void>;
}

export const useClickDeleteReply = (): IUseClickDeleteReply => {
  const [deleteReply] = useMutationDeleteReply();
  const [fetchBoardsByEveryInput] = useRecoilState(
    fetchBoardsByEveryInputState
  );

  const onClickDeleteReply = async (
    event: MouseEvent<HTMLImageElement>
  ): Promise<void> => {
    try {
      await deleteReply({
        variables: { replyId: event.currentTarget.id },
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

  return { onClickDeleteReply };
};
