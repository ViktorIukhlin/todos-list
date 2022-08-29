import { useQuery } from "@apollo/client/react/hooks/useQuery";
import { HashRouter, Route, Routes } from "react-router-dom";
import { GET_TODOS } from "./lib/api";
import { TodoData, TodoVars } from "./lib/interfaces";
import routes, { rout } from "./routes";

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
