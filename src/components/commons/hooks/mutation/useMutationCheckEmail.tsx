import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCheckEmailArgs,
} from "../../../../commons/types/generated/types";

const CHECK_EMAIL = gql`
  mutation checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

export const useMutationCheckEmail = (): typeof checkEmail => {
  const checkEmail = useMutation<
    Pick<IMutation, "checkEmail">,
    IMutationCheckEmailArgs
  >(CHECK_EMAIL);

  return checkEmail;
};
