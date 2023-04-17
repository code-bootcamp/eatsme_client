import { useWithAuth } from "../../../src/components/commons/hooks/custom/useWithAuth";
import RouteWrite from "../../../src/components/units/eatsMe/routeWrite/routeWrite";

export default function RouteWritePage(): JSX.Element {
  useWithAuth();
  return <RouteWrite isEdit={false} />;
}
