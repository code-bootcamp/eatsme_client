import { useMutationDeleteAlarm } from "../mutation/useMutationDeleteAlarm";
import { FETCH_LOGIN_USER } from "../query/useQueryFetchLoginUser";

interface IUseClickDeleteAlarm {
  onClickDeleteAlarm: (alarmId: string) => Promise<void>;
}

export const useClickDeleteAlarm = (): IUseClickDeleteAlarm => {
  const [deleteAlarm] = useMutationDeleteAlarm();

  const onClickDeleteAlarm = async (alarmId: string): Promise<void> => {
    try {
      await deleteAlarm({
        variables: { alarmId },
        refetchQueries: [
          {
            query: FETCH_LOGIN_USER,
          },
        ],
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);
    }
  };

  return { onClickDeleteAlarm };
};
