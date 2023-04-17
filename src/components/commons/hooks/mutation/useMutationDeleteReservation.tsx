import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationDeleteReservationArgs,
} from "../../../../commons/types/generated/types";

const DELETE_RESERVATION = gql`
  mutation ($restaurant_id: String!) {
    deleteReservation(restaurant_id: $restaurant_id)
  }
`;

export const useMutationDeleteReservation = (): typeof deleteReservation => {
  const deleteReservation = useMutation<
    Pick<IMutation, "deleteReservation">,
    IMutationDeleteReservationArgs
  >(DELETE_RESERVATION);

  return deleteReservation;
};
