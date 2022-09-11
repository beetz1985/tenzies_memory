import React from "react";
import Dice from './Dice';

function App() {

    const [dice, setDice] = React.useState(initSetUp())
    const [tenzies, setTenzies] = React.useState(false)

    React.useEffect(()=>{

        if(tenzies) {
            console.log("WIIN")
        }
        
    }, [dice, tenzies])



    function initSetUp() {
            const dieData = [];
            let i;
            for(i = 0; i < 10; i++) {
                dieData.push(
                   {
                    id: i,
                    value: generateRandomNumber(),
                    isLocked: false
                   }
                )
            }
            return dieData
    }


    function generateRandomNumber() {
        return Math.ceil(Math.random() * 6)
    }


    function handleToggle(idNumber) {
        setDice((s)=>{
            const newArr = s.map((v)=>{
                if(idNumber === v.id) v.isLocked = v.isLocked ? false : true;
                return v
            })

            const testNumber = newArr[0].value;
            setTenzies(newArr.every((v)=>v.isLocked === true && testNumber === v.value));

            return newArr
        })
    }


    function handleRoll() {
        if(!tenzies) {
            setDice((s)=>{
                const newArr = s.map(v=>{
                    if(!v.isLocked) v.value = generateRandomNumber()
                    return v
                })
                return newArr
            })            
        } else {
            setDice(initSetUp());
            setTenzies(false);
        }
    }

    const diceComponents = dice.map((v)=>{
        return <Dice 
            key={v.id} 
            id={v.id} 
            value={v.value} 
            isLocked={v.isLocked} 
            toggle={()=>handleToggle(v.id)}
        />
    })
    

    return (
        <div className="wrapper">
            <div className="container">
                <div className="dice-container">
                    {diceComponents}
                </div>
                <button className="roll-btn" onClick={handleRoll}>{tenzies ? "Reset" : "Roll"}</button>
                {tenzies && <h2>Congratulations!</h2>}
            </div>
        </div>
        
    )
}

export default App