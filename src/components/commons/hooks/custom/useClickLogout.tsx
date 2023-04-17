import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/stores";
import { useMutationLogout } from "../mutation/useMutationLogout";
import { useRouterMovePage } from "./useRouterMovePage";

interface IUseClickLogout {
  onClickLogout: () => Promise<void>;
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
