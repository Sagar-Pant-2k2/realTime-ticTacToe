import { useContext } from "react";
import { SocketContext } from "../SocketContext";
import { GameContext } from "../GameContext";

const Input = ({ type, ...props }) => {
    const socket = useContext(SocketContext)
    const { gameState } = useContext(GameContext);
    let className="";
    if(type === 'X') {
        className = `${gameState.currentPlayer === gameState.players[0] ? 'active' : ''}`;
    }
    else {
        className = `${gameState.currentPlayer === gameState.players[1] ? 'active' : ''}`; 
    }
    return (
        <input className={className} {...props} value={`Player ${type}`} disabled />
    );
}
export default () => {
    
    return (
        <div className="turn-status">
            <Input type="X" />
            <Input type="O" />
        </div>
    );
}