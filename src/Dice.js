import React from "react";



function Dice(prop) {
    const styles = {
        backgroundColor: (prop.isLocked) ? "#59E391" : 'white'
    }

    return(
        <div 
        style={styles}
        onClick={prop.toggle} 
        className="dice-cover">
            {prop.value}
        </div>
    )
}

export default Dice