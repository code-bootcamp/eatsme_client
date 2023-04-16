import { IAlarm, IUser } from "../../../commons/types/generated/types";
import * as S from "./alarmStyles";
export interface IAlarmToggle {
  isToggle: boolean;
  data: IUser;
}

export default function Alarm(props: IAlarmToggle): JSX.Element {
  return (
    <S.Container isToggle={props.isToggle}>
      <h4>알림</h4>
      <button>닫기</button>
      <S.AlarmList>
        {props.data.alarms.map((el: IAlarm, idx) => (
          <li key={idx}>

            <img src={String(el.users.userImg)} />

            <p>{el.alarmMessage}</p>
          </li>
        ))}
      </S.AlarmList>
    </S.Container>
  );
}
