import Card from "../UI/Card";
import { useContext } from "react";
import AuthContext from "../../store/auth-context";
const Menu = (props) => {
    const url = "http://localhost:8080/api/home";
    const authCtx = useContext(AuthContext);
    /*fetch(url, {
        method: "GET",
        headers: new Headers({
            Authorization: "Bearer " + props.token,
        }),
    }).then((response) => {
        if (response.ok) {
            console.log(response);
        } else {
            console.log(response);
        }
    });*/
    console.log(authCtx.roles);
    const clickHandler = () => {
        authCtx.logout();
    };
    return (
        <Card>
            <span onClick={clickHandler}>log</span>
        </Card>
    );
};

export default Menu;
