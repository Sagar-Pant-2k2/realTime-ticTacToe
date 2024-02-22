import { useContext, useState, useEffect } from "react";
import { Input } from "./CreateRoom";
import { SocketContext } from "../SocketContext";
import { useNavigate } from "react-router-dom";


const JoinRoom = () => {
    const socket = useContext(SocketContext);
    const navigate = useNavigate();
    const [room, setRoom] = useState("");
    const [warning, setWarning] = useState("");

    useEffect(() => {
        if (!socket) return;

        const handleRoomFullError = (data) => {
            setWarning(data);
        };

        const handleRoomJoined = (data) => {
            navigate("/game")
            console.log(data);
        };

        const handleRoomNotFoundError = (data) => {
            setWarning("No such room exists");
        };

        socket.on('roomFullError', handleRoomFullError);
        socket.on('roomJoined', handleRoomJoined);
        socket.on('roomNotFoundError', handleRoomNotFoundError);

        return () => {
            socket.off('roomFullError', handleRoomFullError);
            socket.off('roomJoined', handleRoomJoined);
            socket.off('roomNotFoundError', handleRoomNotFoundError);
        };
    }, [socket]);

    const handleClick = () => {
        console.log("button was clicked");
        let roomName = room.trim();
        if (roomName === "") {
            setWarning("Can't join null room :(");
            return;
        } else {
            setWarning("");
            if (socket && socket.id) socket.emit("joinRoom", roomName);
        }
    };

    return (
        <>
            <div className="home-box">
                <Input
                    placeholder="Enter Room Name"
                    label={"Enter Room Name To Join"}
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />
                <button onClick={handleClick}>Join Room</button>
                <p className="warning">{warning}</p>
            </div>
        </>
    );
};

export default JoinRoom;
