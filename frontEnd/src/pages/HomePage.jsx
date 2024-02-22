import { useNavigate } from "react-router-dom"
import JoinRoom from "./JoinRoom";

export default () => {
    const navigate = useNavigate();
    return (
        <>
            <h1>Online Multiplayer Tic-Tac-Toe</h1>
            <div className="home-box">
                <button onClick={()=>navigate("/joinRoom")}>Join Room</button>
                <button onClick={()=>navigate("/createRoom")}>Create Room</button>
            </div>
        </>
    )
}