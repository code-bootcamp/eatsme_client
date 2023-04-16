import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationLoginArgs,
} from "../../../../commons/types/generated/types";

const LOGIN = gql`
  mutation login($loginAuthInput: LoginAuthInput!) {
    login(loginAuthInput: $loginAuthInput)
  }
`;

export const UseMutationLogin = (): typeof loginUser => {
  const loginUser = useMutation<Pick<IMutation, "login">, IMutationLoginArgs>(
    LOGIN
  );

  return loginUser;
};
