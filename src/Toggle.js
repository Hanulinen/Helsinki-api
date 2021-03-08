import React from "react"

const Toggle = ({  handleToggle, checked }) => {
    

    return(
        <label>Show only results with images 
            <input 
                type="checkbox"
                onChange={() => handleToggle()}
                checked={checked}
            />  
        </label>
    )
}

export default Toggle