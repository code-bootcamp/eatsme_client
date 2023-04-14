import { IQuery } from "../../../../commons/types/generated/types";
import RouteWriteMiddle from "./middle/routeWriteMiddle";
import RouteWriteTop from "./top/routeWriteTop";

interface IRouteWriteProps {
  isEdit: boolean;
  data?: Pick<IQuery, "fetchBoard"> | undefined;
}

export default function RouteWrite(props: IRouteWriteProps): JSX.Element {
  return (
    <>
      <RouteWriteTop isEdit={props.isEdit} />
      <RouteWriteMiddle />
    </>
  );
}
