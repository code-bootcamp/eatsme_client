import { atom, RecoilState, selector } from "recoil";
import { getNewAccessToken } from "../libraries/getNewAccessToken";
import { IFetchBoardsByEveryInput, IUser } from "../types/generated/types";

export const isEditState = atom({
  key: "isEditState",
  default: true,
});

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getNewAccessToken();
    return newAccessToken;
  },
});

export const fetchLoginUserState: RecoilState<IUser> = atom({
  key: "fetchLoginUserState",
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  default: {} as IUser,
});

export const fetchBoardsByEveryInputState: RecoilState<IFetchBoardsByEveryInput> =
  atom({
    key: "fetchBoardsByEveryInputState",
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    default: { startArea: "서울시" } as IFetchBoardsByEveryInput,
  });

export const boardIdState = atom({
  key: "boardIdState",
  default: "",
});

export const infoWindowClickState = atom({
  key: "infoWindowClickState",
  default: 0,
  dangerouslyAllowMutability: true,
});

export const mapState = atom({
  key: "mapState",
  default: {} as any,
  dangerouslyAllowMutability: true,
});

export const markerState = atom({
  key: "markerState",
  default: [] as any,
  dangerouslyAllowMutability: true,
});

export const pickMarkerState = atom({
  key: "pickMarkerState",
  default: [] as any,
  dangerouslyAllowMutability: true,
});

export const infoWindowState = atom({
  key: "infoWindowState",
  default: [] as any,
  dangerouslyAllowMutability: true,
});

export const findLineState = atom({
  key: "findLineState",
  default: [] as any,
  dangerouslyAllowMutability: true,
});

export const slideSettingState = atom({
  key: "slideSettingState",
  dangerouslyAllowMutability: true,
  default: {
    keyword: ["", "", "", "", "", ""],
    nowPage: 0,
    isActive: true,
    disabled_next: true,
    disabled_prev: true,
  },
});

export const pathState = atom({
  key: "pathState",
  dangerouslyAllowMutability: true,
  default: {
    title: "",
    boardImg: "",
    startArea: "",
    endArea: "",
    startPoint: "",
    endPoint: "",
    like: 0,
    info: [
      {
        restaurantName: "상호명",
        recommend: "",
        imgUrl: "",
        section: "",
        area: "",
        location: {
          lat: 0,
          lng: 0,
        },
      },
      {
        restaurantName: "상호명",
        recommend: "",
        imgUrl: "",
        section: "",
        area: "",
        location: {
          lat: 0,
          lng: 0,
        },
      },
      {
        restaurantName: "상호명",
        recommend: "",
        imgUrl: "",
        section: "",
        area: "",
        location: {
          lat: 0,
          lng: 0,
        },
      },
      {
        restaurantName: "상호명",
        recommend: "",
        imgUrl: "",
        section: "",
        area: "",
        location: {
          lat: 0,
          lng: 0,
        },
      },
      {
        restaurantName: "상호명",
        recommend: "",
        imgUrl: "",
        section: "",
        area: "",
        location: {
          lat: 0,
          lng: 0,
        },
      },
    ],
  } as any,
});
