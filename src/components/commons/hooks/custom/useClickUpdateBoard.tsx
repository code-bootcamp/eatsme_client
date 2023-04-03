import { IUpdateBoardInput } from "../../../../commons/types/generated/types";
import { useMutationUpdateBoard } from "../mutation/useMutationUpdateBoard";
import { useRouterMovePage } from "./useRouterMovePage";

interface IUseClickUpdateBoard {
  onClickUpdateBoard: (updateBoardInput: IUpdateBoardInput) => Promise<void>;
}

export const useClickUpdateBoard = (): IUseClickUpdateBoard => {
  const [updateBoard] = useMutationUpdateBoard();
  const { routerMovePage } = useRouterMovePage();
  const onClickUpdateBoard = async (data: any): Promise<void> => {
    try {
      if (Array.isArray(data.info)) {
        const updateBoardInput = {
          ...data,
          info: [
            ...data.info
              ?.filter((el: any) => el.restaurantName !== "상호명")
              .map(
                ({

                  // eslint-disable-next-line @typescript-eslint/naming-convention

                  __typename,
                  ...rest
                }: {
                  __typename: string | undefined;
                  [key: string]: any;
                }) => {
                  const cleanRest = { ...rest };
                  if (cleanRest.location.__typename !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    const { __typename, ...cleanLoc } = cleanRest.location;
                    cleanRest.location = cleanLoc;
                  }
                  return cleanRest;
                }
              ),
          ],
        };
        await updateBoard({ variables: { updateBoardInput } });
        routerMovePage("/eatsMe/userInfo");
      }
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };
  return { onClickUpdateBoard };
};
