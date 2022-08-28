import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { HashRouter, Route, Routes } from "react-router-dom";
import { GET_TODOS, TodoData, TodoVars } from "./lib/api";
import routes, { rout } from "./routes";
import "./styles/index.scss";

const options = {
    paginate: {
        page: 1,
        limit: 30,
    },
};

function App() {
    const { loading, error, data, refetch } = useQuery<TodoData, TodoVars>(
        GET_TODOS,
        {
            variables: {
                options,
            },
        }
    );

    console.log("data", data);

    return (
        <HashRouter>
            <Routes>
                {routes.map((rout: rout) => (
                    <Route
                        key={rout.name}
                        path={rout.path}
                        element={
                            <rout.Component
                                loading={loading}
                                error={error}
                                data={data}
                                refetch={refetch}
                            />
                        }
                    />
                ))}
            </Routes>
        </HashRouter>
    );
}

export default App;
