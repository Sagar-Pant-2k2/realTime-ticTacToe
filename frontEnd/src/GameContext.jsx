import { createContext, useContext, useEffect, useState } from "react";
import { SocketContext } from "./SocketContext";

export const GameContext = createContext();

export const GameContextProvider = ({ children }) => {
    const socket = useContext(SocketContext);
    const [gameState, setGameState] = useState(null);
    const [gameResult, setGameResult] = useState("nothing");

    const checkGameState = (state) => {
        const { players, board, currentPlayer } = state;

        // Function to check if a player has won
        const checkWinner = () => {
            const winConditions = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
                [0, 4, 8], [2, 4, 6] // diagonals
            ];
            for (const condition of winConditions) {
                const [a, b, c] = condition;
                if (board[a] != "" && board[a] === board[b] && board[b] === board[c]) {
                    setGameResult(`${board[a]} won the Game`);
                    return true;
                }
            }
            return false;
        };

        // Check if current player has won
        if (checkWinner()) {
            return; // Game is over, exit function
        }

        // Check for draw condition
        if (board.every(cell => cell !== '')) {
            setGameResult("Game Draw");
            return; // Game is over, exit function
        }

        setGameResult("nothing");
    };

    useEffect(() => {
        if (!socket) return;

        const handleGameState = (state) => {
            setGameState(state);
            checkGameState(state);
        };

        socket.on("gameState", handleGameState);

        return () => {
            if (socket) {
                socket.off("gameState", handleGameState);
            }
        };
    }, [socket]);

    const dispatchMove = (cellIndex) => {
        if (socket && gameState) {
            socket.emit("move", { roomName: gameState.roomName, cellIndex });
        }
    };

    const resetGame = ()=>{
        if(socket) {
            socket.emit('resetGame',gameState.roomName);
            setGameResult("nothing");
        }
    }

    return (
        <GameContext.Provider value={{ gameState, dispatchMove, gameResult,resetGame }}>
            {children}
        </GameContext.Provider>
    );
};
