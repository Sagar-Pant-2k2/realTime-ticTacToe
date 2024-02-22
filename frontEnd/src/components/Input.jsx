import React, { useContext } from "react";
import { GameContext } from "../store/GameContext";
import { SocketContext } from "../SocketContext";

const Input = ({ type, ...props }) => {
    const socket = useContext(SocketContext);
    const { gameState } = useContext(GameContext);
    const className = `${GameState.turn === type ? 'active' : ''}`;
    return (
        <input className={className} {...props} value={`Player ${type}`} disabled />
    );
}

export default Input;