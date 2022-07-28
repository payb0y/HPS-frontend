import Login from "./components/Login/Login";
import Menue from "./components/Menu/Menu";
import PopUp from "./components/UI/PopUp";
import { useState, useContext } from "react";
import AuthContext from "./store/auth-context";

function App() {
    const [msgVisibility, setMsgVisibility] = useState(false);
    const [message, setMessage] = useState("");
    const authCtx = useContext(AuthContext);
    const msgHandler = (msg) => {
        setMessage(msg);
        setMsgVisibility(true);
        setTimeout(() => setMsgVisibility(false), 4000);
    };
    return (
        <>
            {msgVisibility && <PopUp>{message}</PopUp>}
            {!authCtx.isLoggedIn ? (
                <Login msgHandler={msgHandler} />
            ) : (
                <Menue />
            )}
        </>
    );
}

export default App;
