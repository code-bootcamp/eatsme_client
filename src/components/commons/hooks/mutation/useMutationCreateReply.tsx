import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationCreateReplyArgs,
} from "../../../../commons/types/generated/types";

const CREATE_REPLY = gql`
  mutation ($createReplyInput: CreateReplyInput!) {
    createReply(createReplyInput: $createReplyInput) {
      id
      reply
    }
  }
`;

export const useMutationCreateReply = (): typeof createReply => {
  const createReply = useMutation<
    Pick<IMutation, "createReply">,
    IMutationCreateReplyArgs
  >(CREATE_REPLY);

  return createReply;
};
