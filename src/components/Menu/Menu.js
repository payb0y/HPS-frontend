import Card from "../UI/Card";

const Menu = (props) => {
    const url = "http://localhost:8080/api/home";
    fetch(url, {
        method: "GET",
        headers: new Headers({
            Authorization: "Bearer " + props.token,
        }),
    }).then((response) => {
        console.log(response);
    });

    const clickHandler = () => {
        props.tokenHandler("");
    };
    return (
        <Card>
            <span onClick={clickHandler}>log out</span>
        </Card>
    );
};

export default Menu;
