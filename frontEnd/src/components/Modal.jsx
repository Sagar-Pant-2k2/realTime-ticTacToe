import { useContext } from "react"
import { GameContext } from "../GameContext"

export default () => {
    const {gameResult,resetGame} = useContext(GameContext);

    return (

        <>
             (<div className="main-modal">
                <div className="modal-box">
                    <div className="modal-message">{gameResult}</div>

                    <button onClick={()=>resetGame()} className="replay-button">Replay</button>
                </div>
            </div>) 
        </>


    )
}