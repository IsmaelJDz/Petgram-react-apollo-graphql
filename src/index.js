import React from "react";
import reactDom from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { App } from "./App";

const client = new ApolloClient({
  uri: "https://petgram-server-isma.ismaelbr7.now.sh/graphql"
});

const root = document.getElementById("app");
reactDom.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  root
);
