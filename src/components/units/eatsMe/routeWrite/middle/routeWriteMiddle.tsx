import Head from "next/head";
import * as S from "./routeWriteMiddleStyles";

export default function RouteWriteMiddle(): JSX.Element {
  return (
    <>
      <Head>
        <script src="//code.jquery.com/jquery-3.3.1.min.js"></script>
        <script src="https://apis.openapi.sk.com/tmap/jsv2?version=1&appKey=fwJ1lVM3a0680zMo4QJLR1sByJarNOZ66mlgdoPf"></script>
      </Head>
      <S.Container>
        <div id="TMapApp" />
      </S.Container>
    </>
  );
}
