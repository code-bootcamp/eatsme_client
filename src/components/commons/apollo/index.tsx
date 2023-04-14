import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import {
  accessTokenState,
  restoreAccessTokenLoadable,
} from "../../../commons/stores";
import { onError } from "@apollo/client/link/error";
import { getNewAccessToken } from "../../../commons/libraries/getNewAccessToken";

interface IApolloSettingProps {
  children: JSX.Element;
}

const GLOBAL_STATE = new InMemoryCache();

export default function ApolloSetting(props: IApolloSettingProps): JSX.Element {
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const accessTokenLoadable = useRecoilValueLoadable(
    restoreAccessTokenLoadable
  );

  useEffect(() => {
    void accessTokenLoadable.toPromise().then((newAccessToken) => {
      setAccessToken(newAccessToken !== undefined ? newAccessToken : "");
    });
  }, []);

  const errorLink = onError(({ graphQLErrors, operation, forward }) => {
    if (typeof graphQLErrors !== "undefined") {
      for (const err of graphQLErrors) {
        if (err.extensions.code === "UNAUTHENTICATED") {
          return fromPromise(
            getNewAccessToken().then((newAccessToken) => {
              setAccessToken(
                newAccessToken !== undefined ? newAccessToken : ""
              );
              operation.setContext({
                headers: {
                  ...operation.getContext().headers,
                  Authorization: `Bearer ${
                    newAccessToken !== undefined ? newAccessToken : ""
                  }`,
                },
              });
            })
          ).flatMap(() => forward(operation));
        }
      }
    }
  });

  const uploadLink = createUploadLink({
    uri: "https://sit-woo.store/graphql",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    credentials: "include",
  });

  const client = new ApolloClient({
    link: ApolloLink.from([errorLink, uploadLink]),
    cache: GLOBAL_STATE,
  });

  // prettier-ignore

  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  )
}
