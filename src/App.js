import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import { useContext } from "react";
import AuthContext from "./store/auth-context";
import { Route, Routes, Navigate } from "react-router-dom";
import Users from "./components/Menu/MenuItems/Users/Users";
import Groups from "./components/Menu/MenuItems/Groups/Groups";
import Roles from "./components/Menu/MenuItems/Roles/Roles";
import roles from "./store/roles";

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
                            </>
                        )}
                        {authCtx.role === roles.SUPER_ADMIN && (
                            <Route path="/roles" element={<Roles />} />
                        )}
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
