import { gql } from "@apollo/client";

export const FETCH_BOARD_BY_EVERY = gql`
  query ($fetchBoardsByEveryInput: FetchBoardsByEveryInput!) {
    fetchBoardsByEvery(fetchBoardsByEveryInput: $fetchBoardsByEveryInput) {
      id
      title
      createdAt
      startArea
      endArea
      startPoint
      endPoint
      personalMapData {
        restaurantId
        restaurantName
        address
        image
        recommend
        rating
        location {
          lat
          lng
        }
      }
      comments {
        id
        comment
        replies {
          id
          reply
          user {
            nickname
            id
            userImg
          }
        }
        user {
          id
          nickname
          userImg
        }
      }
      user {
        nickname
        id
        userImg
      }
    }
  }
`;
