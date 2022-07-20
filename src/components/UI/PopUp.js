import classes from "./PopUp.module.css";

const PopUp = (props) => {
    return <div className={classes.div}>{props.children}</div>;
};

export default PopUp;
