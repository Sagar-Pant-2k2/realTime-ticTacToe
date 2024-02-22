import React, { useContext } from 'react';
import { GameContext } from '../GameContext';
import { SocketContext } from '../SocketContext';


const Box = ({ children, ...props }) => {
    return <button {...props}>{children}</button>
}


export default () => {
    const socket = useContext(SocketContext);

    const { gameState,gameResult } = useContext(GameContext);
    const board = gameState.board;

    const handleClick = (idx) => {
        if (socket && (socket.id === gameState.currentPlayer) && gameResult==="nothing") { //if user is the current active player then only he can dispatch
            socket.emit('move', { "roomName": gameState.roomName, "cellIndex": idx })
            
        }
    }

    return (
        <div className="board">
            {board.map((item, idx) => {
                let className = '';
                if (idx === 3 || idx === 4 || idx === 5) {
                    className += 'upper-border ';
                    className += 'lower-border ';
                }
                if (idx === 1 || idx === 4 || idx === 7) {
                    className += 'left-border ';
                    className += 'right-border ';
                }

                return (
                    <Box key={idx} onClick={() => handleClick(idx)} className={`box ${className.trim()}`}>
                        {item}
                    </Box>
                );
            })}
            {/* <h1>{gameResult}</h1> */}
        </div>
    );
}