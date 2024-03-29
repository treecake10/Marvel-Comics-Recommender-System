import React from "react";
import { Link } from "react-router-dom";

const Card = ({category, id, thumbnail, name}) => {

    return(
        <Link to={`/${category}/${id}`} target="_blank">
            <div className="result">
                <img src={thumbnail} alt="thumbnail" />
                <h3 className="card-name">{name}</h3>
            </div>  
        </Link>
    )
}
export default Card;