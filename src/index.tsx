import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/index.scss";

const client = new ApolloClient({
    uri: "https://graphqlzero.almansi.me/api",
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    todos: {
                        merge(existing, incoming) {
                            if (existing) {
                                return {
                                    data: existing,
                                    meta: incoming.meta,
                                };
                            }
                            return incoming;
                        },
                    },
                },
            },
        },
    }),
});

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </React.StrictMode>
);
