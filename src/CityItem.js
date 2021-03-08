import React from "react"
import './CityItem.css';

function CityItem(props){
    return (
        <div className="container">
            <img 
                src={props.src} 
                alt = "CityItem"
                className="cityImg"
            />
            <div className="overlay">
                <div className="text">{props.name}</div>
                <div className="text">{props.address}</div>
                <div className="text">{props.open}</div>
            </div>
        </div>
    )
}

CityItem.defaultProps = {
    name: "No name",
    address: "Nowhere",
    src: "https://i.imgur.com/xkA94Yi.png",
    open: "No Status"
}

export default CityItem