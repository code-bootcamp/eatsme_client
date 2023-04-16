import { gql, useMutation } from "@apollo/client";
import { IMutation } from "../../../../commons/types/generated/types";

const UPDATE_USER = gql`
  mutation ($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      id
      userImg
    }
  }
`;
export const useMutationUpdateUser = (): typeof updateUser => {
  const updateUser = useMutation<Pick<IMutation, "updateUser">>(UPDATE_USER);

  return updateUser;
};
