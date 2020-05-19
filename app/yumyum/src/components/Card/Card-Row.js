import React from "react";
import "./card.css"


function CardRow(props) {
    return(
    <div className="row">
        {props.children}
    </div>)
}

export default CardRow;