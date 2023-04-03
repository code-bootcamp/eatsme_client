import * as S from "./reserveMiddleStyles";
import type { Dayjs } from "dayjs";
import { useState } from "react";
import ReserveSelect from "../../../../commons/reserveSelect/reserveSelect";
import { useForm } from "react-hook-form";
import { useClickReserve } from "../../../../commons/hooks/custom/useClickReserve";

import { wrapAsync } from "../../../../commons/libraries/asyncFunc";

export interface IReserveFormData {
  table: number;
  time: string;
  division: string;
  restaurantId: string;
  reservation_time: number;
}

export default function ReserveMiddle(): JSX.Element {
  const today = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { onClickReserve } = useClickReserve();
  const { handleSubmit, setValue } = useForm<IReserveFormData>();

  const onSelect = (value: Dayjs): void => {
    console.log(value.toDate() > today);
    if (value.toDate() > today) {
      setSelectedDate(value);
      setIsModalOpen(true);
      setValue(
        "time",
        selectedDate !== null ? selectedDate.format("YYYY.MM.DD") : "날짜"
      );
    }
  };
  return (

    <form onSubmit={wrapAsync(handleSubmit(onClickReserve))}>
      <S.Container>
        <S.Wrapper>
          <div className="storeWrap">
            <S.StoreBox>
              <S.StoreCont>
                <S.FoodImg src="/defaultFood.webp" />
                <div>
                  <S.InfoWrap>
                    <img src="/marker_or.webp" />
                    <span>주소</span>
                  </S.InfoWrap>
                  <S.InfoWrap>
                    <img src="/store.webp" />
                    <span>상호명</span>
                  </S.InfoWrap>
                </div>
              </S.StoreCont>

              <S.Rating>5.0</S.Rating>
            </S.StoreBox>
            <S.ReserveBox>
              <div>
                {selectedDate !== null
                  ? selectedDate.format("YYYY.MM.DD")
                  : "날짜"}
              </div>
              <div>{selectedDate !== null ? selectedTime : "시간"}</div>
              <S.ReserveBtn
                isActive={selectedDate !== null && selectedTime !== ""}
                disabled={selectedDate === null || selectedTime === ""}
              >
                예약
              </S.ReserveBtn>
            </S.ReserveBox>
          </div>

          <S.MapBox>지도</S.MapBox>
        </S.Wrapper>
        <S.CalendarBox>
          <S.CalendarStyle fullscreen={false} onSelect={onSelect} />
        </S.CalendarBox>
        <ReserveSelect
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          selectedDate={selectedDate}
          setValue={setValue}
        />
      </S.Container>
    </form>
  );
}
