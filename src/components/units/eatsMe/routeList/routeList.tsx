import { useClickRouteList } from "../../../commons/hooks/custom/useClickRouteList";
import RouteListMiddle from "./middle/routeListMiddle";
import RouteListTop from "./top/routeListTop";

export default function RouteList(): JSX.Element {
  const { data, refetch } = useClickRouteList({
    fetchBoardsByEveryInput: {
      startArea: "서울시",
    },
  });

  return (
    <>
      <RouteListTop data={data} refetch={refetch} />
      <RouteListMiddle data={data} />
    </>
  );
}
