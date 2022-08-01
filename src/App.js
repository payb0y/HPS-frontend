import Login from "./components/Login/Login";
import Menue from "./components/Menu/Menu";
import { useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
    const authCtx = useContext(AuthContext);

    return <>{!authCtx.isLoggedIn ? <Login /> : <Menue />}</>;
}

export default App;
