import { HashRouter, Route, Routes } from "react-router-dom";
import routes, { Rout } from "./routes";

function App() {
    return (
        <HashRouter>
            <Routes>
                {routes.map((rout: Rout) => (
                    <Route
                        key={rout.name}
                        path={rout.path}
                        element={<rout.Component />}
                    />
                ))}
            </Routes>
        </HashRouter>
    );
}

export default App;
