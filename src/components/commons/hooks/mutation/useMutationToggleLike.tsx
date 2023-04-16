import { gql } from "@apollo/client";

export const TOGGLE_LIKE = gql`
  mutation ($boardId: String!) {
    toggleLike(boardId: $boardId)
  }
`;
