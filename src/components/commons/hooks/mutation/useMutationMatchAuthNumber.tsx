import { gql, useMutation } from "@apollo/client";
import {
  IMutation,
  IMutationMatchAuthNumberArgs,
} from "../../../../commons/types/generated/types";

const MATCH_AUTH = gql`
  mutation matchAuthNumber($matchAuthNumberInput: MatchAuthNumberInput!) {
    matchAuthNumber(matchAuthNumberInput: $matchAuthNumberInput)
  }
`;

export const useMutationMatchAuthNumber = (): typeof matchAuth => {
  const matchAuth = useMutation<
    Pick<IMutation, "matchAuthNumber">,
    IMutationMatchAuthNumberArgs
  >(MATCH_AUTH);

  return matchAuth;
};
