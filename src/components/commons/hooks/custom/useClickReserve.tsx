import { Modal } from "antd";
import { IReserveFormData } from "../../../units/eatsMe/reserve/middle/reserveMiddle";
import { useMutationCreateReservation } from "../mutation/useMutationCreateReservation";
import { useRouterMovePage } from "./useRouterMovePage";

interface IUseClickReserve {
  onClickReserve: (data: IReserveFormData) => Promise<void>;
}

export const useClickReserve = (): IUseClickReserve => {
  const [createReservation] = useMutationCreateReservation();
  const { routerMovePage } = useRouterMovePage();

  const onClickReserve = async (data: IReserveFormData): Promise<void> => {
    try {
      const localData = JSON.parse(String(localStorage.getItem("reserve")));
      await createReservation({
        variables: {
          createReservationInput: {
            table: 1,
            time: data.time,
            restaurantId: localData.restaurantId ?? "",
            reservation_time: data.reservation_time,
          },
        },
      });
      routerMovePage("/eatsMe/popularList");
      Modal.success({
        title: "예약이 완료되엇습니다",
        okText: "확인",
        icon: null,
        onOk() {
          routerMovePage("/eatsMe/popularList");
        },
        onCancel() {
          routerMovePage("/eatsMe/popularList");
        },
        okButtonProps: {
          style: { backgroundColor: "#fbb240", color: "white" },
        },
      });
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };
  return { onClickReserve };
};
