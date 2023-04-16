import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateReservationArgs,
} from "../../../../commons/types/generated/types";

const CREATE_RESERVATION = gql`
  mutation ($createReservationInput: CreateReservationInput!) {
    createReservation(createReservationInput: $createReservationInput) {
      id
    }
  }
`;

export const useMutationCreateReservation = (): typeof createReservation => {
  const createReservation = useMutation<
    Pick<IMutation, "createReservation">,
    IMutationCreateReservationArgs
  >(CREATE_RESERVATION);

  return createReservation;
};
