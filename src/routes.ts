import { ApolloQueryResult } from "@apollo/client/core/types";
import { ApolloError } from "@apollo/client/errors";
import { FC } from "react";

import MainPage from "./components/pages/MainPage";
import TodoPage from "./components/pages/TodoPage";
import { TodoData, TodoVars } from "./lib/api";

export interface Props {
    loading: boolean;
    error: ApolloError | undefined;
    data: TodoData | undefined;
    refetch: (
        variables?: Partial<TodoVars> | undefined
    ) => Promise<ApolloQueryResult<TodoData>>;
}

export interface rout {
    path: string;
    name: string;
    Component: FC<Props>;
}

const routes: rout[] = [
    {
        path: "/",
        name: "Main",
        Component: MainPage,
    },
    {
        path: "/todo",
        name: "Main",
        Component: TodoPage,
    },
];

export default routes;
