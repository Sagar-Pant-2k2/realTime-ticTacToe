import { useContext, useEffect } from "react"
import { GameContext } from "../GameContext"
import { SocketContext } from "../SocketContext";
import Board from "../components/Board";
import Players from "../components/Players";
import Modal from "../components/Modal";

export default () => {

    const socket = useContext(SocketContext);
    const { gameState, dispatchMove, gameResult, resetGame } = useContext(GameContext);
    

    if (gameState === null) return (
        <h1>Enter any Room to play game</h1>
    )

    if (gameState && (gameState.players.length < 2)) {
        return <h1>Waiting for other to join...</h1>
    }




    if (gameResult !== "nothing") return <Modal />
    return (

        <div className="game-area">
            <h1>Tic-Tac-Toe</h1>
            <Board />
            <Players />
        </div>


    )
}
