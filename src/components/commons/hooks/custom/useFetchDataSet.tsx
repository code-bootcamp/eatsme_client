import { SetterOrUpdater } from "recoil";

interface IFetchDataSet {
  setPath: SetterOrUpdater<any>;
  setInfoWindowClick: SetterOrUpdater<number>;
  data: any;
}

interface IUseFetchDataSet {
  fetchDataSet: (args: IFetchDataSet) => void;
}

export const useFetchDataSet = (): IUseFetchDataSet => {
  const fetchDataSet = (args: IFetchDataSet): void => {
    const { personalMapData, id, __typename, ...data } = args.data;
    if (personalMapData !== undefined && personalMapData !== null) {
      const settingPersonalMapData = [...personalMapData];
      const lastObj = settingPersonalMapData.pop();
      settingPersonalMapData.splice(1, 0, lastObj);

      const newPersonalMapData = settingPersonalMapData.map(
        (obj: any, idx: number) => {
          const { image, ...rest } = obj;
          return {
            ...rest,
            imgUrl: image ?? "",
          };
        }
      );
      args.setPath((prev: any) => ({
        ...prev,
        ...data,
        boardId: id,
        info: prev.info?.map((el: any, idx: any) => {
          if (idx < newPersonalMapData.length)
            return {
              ...newPersonalMapData[idx],
            };
          return { ...el };
        }),
      }));
    }
    args.setInfoWindowClick((prev) => prev + 1);
  };

  return { fetchDataSet };
};
