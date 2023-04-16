import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import {
  infoWindowClickState,
  pathState,
} from "../../../../src/commons/stores";
import {
  IQuery,
  IQueryFetchBoardArgs,
} from "../../../../src/commons/types/generated/types";
import { useFetchDataSet } from "../../../../src/components/commons/hooks/custom/useFetchDataSet";
import { useRouterIdCheck } from "../../../../src/components/commons/hooks/custom/useRouterIdCheck";
import { useWithAuth } from "../../../../src/components/commons/hooks/custom/useWithAuth";
import { FETCH_BOARD } from "../../../../src/components/commons/hooks/query/useQueryFetchBoard";
import RouteWrite from "../../../../src/components/units/eatsMe/routeWrite/routeWrite";

export default function RouteUpdatePage(): JSX.Element {
  useWithAuth();
  const [, setPath] = useRecoilState(pathState);
  const [, setInfoWindowClick] = useRecoilState(infoWindowClickState);
  const { fetchDataSet } = useFetchDataSet();
  const { id } = useRouterIdCheck("boardId");
  const { data } = useQuery<Pick<IQuery, "fetchBoard">, IQueryFetchBoardArgs>(
    FETCH_BOARD,
    { variables: { boardId: id } }
  );

  useEffect(() => {
    if (data !== undefined) {
      fetchDataSet({ setPath, setInfoWindowClick, data: data.fetchBoard });
    }
  }, [data]);

  return (
    <>
      <RouteWrite isEdit={true} data={data} />
    </>
  );
}
