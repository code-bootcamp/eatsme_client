import { gql, useMutation } from "@apollo/client";

const CHECK_EMAIL = gql`
  mutation checkEmail($email: String!) {
    checkEmail(email: $email)
  }
`;

export const useMutationCheckEmail = () => {
  const checkEmail = useMutation(CHECK_EMAIL);

  return checkEmail;
};
