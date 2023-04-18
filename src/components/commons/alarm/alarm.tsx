import { useRecoilState } from "recoil";
import { fetchLoginUserState } from "../../../commons/stores";
import { IAlarm, IUser } from "../../../commons/types/generated/types";
import { useClickDeleteAlarm } from "../hooks/custom/useClickDeleteAlarm";
import * as S from "./alarmStyles";
export interface IAlarmToggle {
  isToggle: boolean;
  changeIsToggle: () => void;
  data?: IUser;
}

export default function Alarm(props: IAlarmToggle): JSX.Element {
  const [fetchLoginUser] = useRecoilState(fetchLoginUserState);
  const { onClickDeleteAlarm } = useClickDeleteAlarm();
  return (
    <S.Container isToggle={props.isToggle}>
      <h4>알림</h4>
      <button onClick={props.changeIsToggle}>닫기</button>
      <S.AlarmList>
        {fetchLoginUser?.alarms?.map((el: IAlarm, idx) => (
          <li key={idx}>
            <p>{el.alarmMessage}</p>
            <img
              src="/delete.webp"
              onClick={() => {
                void onClickDeleteAlarm(el.id);
              }}
            />
          </li>
        ))}
      </S.AlarmList>
    </S.Container>
  );
}
