import { gql } from "@apollo/client";

export const FETCH_LOGIN_USER = gql`
  query fetchLoginUser {
    fetchLoginUser {
      id
      nickname
      userImg
      restaurant {
        _id
        restaurantName
        address
      }
      reservations {
        id
        table
        time
        reservation_time
        restaurant_id
      }
    }
  }
`;
// alarms {
//   alarmMessage
//   user {
//     userImg
//   }
// }
