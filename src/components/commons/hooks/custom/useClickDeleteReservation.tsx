import { useMutationDeleteReservation } from "../mutation/useMutationDeleteReservation";
import { FETCH_LOGIN_USER } from "../query/useQueryFetchLoginUser";

interface IUseClickDeleteReservation {
  onClickDeleteReservation: (restaurant_id: string) => Promise<void>;
}

export const useClickDeleteReservation = (): IUseClickDeleteReservation => {
  const [deleteReservation] = useMutationDeleteReservation();

  const onClickDeleteReservation = async (
    restaurant_id: string
  ): Promise<void> => {
    await deleteReservation({
      variables: { restaurant_id },
      refetchQueries: [
        {
          query: FETCH_LOGIN_USER,
        },
      ],
    });
  };
  return { onClickDeleteReservation };
};
