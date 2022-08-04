import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Route, Routes, Navigate } from "react-router-dom";
import Users from "./components/Menu/MenuItems/Users/Users";
import Groups from "./components/Menu/MenuItems/Groups/Groups";
import Roles from "./components/Menu/MenuItems/Roles/Roles";
import Environments from "./components/Menu/MenuItems/Environments/Environments";
import roles from "./store/roles";
import UserEnvironments from "./components/Menu/MenuItems/UserEnvironments/UserEnvironments";

function App() {
    const authCtx = useContext(AuthContext);

    return (
        <>
            {authCtx.isLoggedIn ? (
                <Menu>
                    <Routes>
                        <Route path="/" element />
                        {authCtx.role !== roles.USER && (
                            <>
                                <Route path="/groups" element={<Groups />} />
                                <Route path="/users" element={<Users />} />
                                <Route
                                    path="/environments"
                                    element={<Environments />}
                                />
                            </>
                        )}
                        {authCtx.role === roles.SUPER_ADMIN && (
                            <Route path="/roles" element={<Roles />} />
                        )}
                        <Route
                            path="my_environments"
                            element={<UserEnvironments />}
                        />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Menu>
            ) : (
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route
                        path="*"
                        element={<Navigate to="/login" replace />}
                    />
                </Routes>
            )}
        </>
    );
}

export default App;
