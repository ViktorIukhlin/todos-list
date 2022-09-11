import { FC } from "react";

import MainPage from "./components/pages/MainPage";

export interface ComponentProps {}

export interface Rout {
    path: string;
    name: string;
    Component: FC<ComponentProps>;
}

const routes: Rout[] = [
    {
        path: "/",
        name: "Main",
        Component: MainPage,
    },
];

export default routes;
