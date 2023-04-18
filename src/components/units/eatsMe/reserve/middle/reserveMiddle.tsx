import * as S from "./reserveMiddleStyles";
import type { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import ReserveSelect from "../../../../commons/reserveSelect/reserveSelect";
import { useForm } from "react-hook-form";
import { useClickReserve } from "../../../../commons/hooks/custom/useClickReserve";

import { wrapAsync } from "../../../../commons/libraries/asyncFunc";
import Head from "next/head";
import { useEffectTMapLoad } from "../../../../commons/hooks/custom/useEffectTMapLoad";

export interface IReserveFormData {
  table: number;
  time: string;
  restaurantId: string;
  reservation_time: number;
}
declare const window: typeof globalThis & {
  Tmapv2: any;
};

export default function ReserveMiddle(): JSX.Element {
  const today = new Date();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>("");
  const { onClickReserve } = useClickReserve();
  const { handleSubmit, setValue } = useForm<IReserveFormData>();
  const [inputData, setInputData] = useState<any>({});
  const [map, setMap] = useState<any>({});

  useEffectTMapLoad(setMap);

  useEffect(() => {
    setInputData(JSON.parse(String(localStorage.getItem("reserve"))));
  }, []);

  useEffect(() => {
    if (map !== undefined && inputData !== undefined) {
      const position = new window.Tmapv2.LatLng(
        inputData.locationLat,
        inputData.locationLng
      );
      if (position._lat !== 0) {
        const PTbounds = new window.Tmapv2.LatLngBounds();
        PTbounds.extend(position);
        void new window.Tmapv2.Marker({
          position,
          icon: "/marker_or.webp",
          iconSize: new window.Tmapv2.Size(40, 40),
          map,
        });
        if (map !== undefined) {
          map.setCenter(position);
        }
      }
    }
  }, [map, inputData]);

  const onSelect = (value: Dayjs): void => {
    if (value.toDate() > today) {
      setSelectedDate(value);
      setIsModalOpen(true);
      setValue("time", value.format("YYYY.MM.DD"));
    }
  };
  return (
    <>
      <Head>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=fwJ1lVM3a0680zMo4QJLR1sByJarNOZ66mlgdoPf"></script>
      </Head>
      <form onSubmit={wrapAsync(handleSubmit(onClickReserve))}>
        <S.Container>
          <S.Wrapper>
            <div className="storeWrap">
              <S.StoreBox>
                <S.StoreCont>
                  <S.FoodImg src="/defaultFood.webp" />
                  <div>
                    <S.InfoWrap>
                      <img src="/store.webp" />
                      <span>{inputData.restaurantName ?? ""}</span>
                    </S.InfoWrap>
                    <S.InfoWrap>
                      <img src="/marker_or.webp" />
                      <span>등록된 주소가 없습니다</span>
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

            <S.MapBox>
              <div
                id="TMapApp"
                style={{
                  height: "100%",
                  width: "100%",
                }}
              />
            </S.MapBox>
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
    </>
  );
}
