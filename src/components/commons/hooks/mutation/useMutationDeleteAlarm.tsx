import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteAlarmArgs,
} from "../../../../commons/types/generated/types";

const DELETE_ALARM = gql`
  mutation ($alarmId: String!) {
    deleteAlarm(alarmId: $alarmId)
  }
`;

export const useMutationDeleteAlarm = (): typeof deleteAlarm => {
  const deleteAlarm = useMutation<
    Pick<IMutation, "deleteAlarm">,
    IMutationDeleteAlarmArgs
  >(DELETE_ALARM);

  return deleteAlarm;
};
