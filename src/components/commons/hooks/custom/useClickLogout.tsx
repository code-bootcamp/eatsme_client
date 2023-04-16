import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/stores";
import { useMutationLogout } from "../mutation/useMutationLogout";
import { useRouterMovePage } from "./useRouterMovePage";
import { IMutation } from "../../../../commons/types/generated/types";

interface IUseClickLogout {
  onClickLogout: (data: IMutation) => Promise<void>;
}

export const useClickLogout = (): IUseClickLogout => {
  const [logoutUser] = useMutationLogout();
  const { routerMovePage } = useRouterMovePage();
  const [, setAccessToken] = useRecoilState(accessTokenState);

  const onClickLogout = async (): Promise<void> => {
    await logoutUser();
    routerMovePage("/");
    setAccessToken("");
  };
  return { onClickLogout };
};
