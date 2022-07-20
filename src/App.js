import { useState } from "react";
import Login from "./components/Login/Login";
import Menu from "./components/Menu/Menu";
import PopUp from "./components/UI/PopUp";

function App() {
    const [msgVisibility, setMsgVisibility] = useState(false);
    const [message, setMessage] = useState("");
    const [token, setToken] = useState("");
    const tokenHandler = (t) => {
        console.log(t);
        setToken(t);
    };
    const msgHandler = (msg) => {
        setMessage(msg);
        setMsgVisibility(true);
        setTimeout(() => setMsgVisibility(false), 4000);
    };
    return (
        <>
            {msgVisibility && <PopUp>{message}</PopUp>}
            {token === "" ? (
                <Login msgHandler={msgHandler} tokenHandler={tokenHandler} />
            ) : (
                <Menu tokenHandler={tokenHandler} token={token} />
            )}
        </>
    );
}

export default App;
