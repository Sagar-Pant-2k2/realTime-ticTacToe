import { useState, useContext, useEffect } from "react";
import { SocketContext } from "../SocketContext";
import { useNavigate } from 'react-router-dom'

export const Input = ({ label, ...props }) => {
  return (
    <>
      <h1>{label}</h1>
      <input {...props}></input>
    </>
  );
};

export default () => {
  const socket = useContext(SocketContext);
  const navigate = useNavigate();
  
  const [room, setRoom] = useState("");
  const [warning, setWarning] = useState("");
  
  useEffect(() => {
    if (!socket) return;

    const handleRoomExistsError = (data) => {
      setWarning(data);
    };

    const handleRoomCreated = (data) => {
      setWarning("");
      console.log("created room for you");
      navigate("/game");
    };

    socket.on('roomExistsError', handleRoomExistsError);
    socket.on('roomCreated', handleRoomCreated);

    return () => {
      socket.off('roomExistsError', handleRoomExistsError);
      socket.off('roomCreated', handleRoomCreated);
    };
  }, [socket, navigate]);

  const handleClick = () => {
    console.log("button was clicked");
    let roomName = room.trim();
    if (roomName === "") {
      setWarning("Room Name Can't be Null");
      return;
    } else {
      setWarning("");
      if (socket && socket.id) socket.emit("createRoom", roomName);
    }
  };

  return (
    <>
      <div className="home-box">
        <Input
          placeholder="Enter Room Name"
          label={"Enter Room Name"}
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <button onClick={handleClick}>Create Room</button>
        <p className="warning">{warning}</p>
      </div>
    </>
  );
};
