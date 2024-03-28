import { useNavigate } from "react-router";
import { userName } from "../store/atoms/username";
import { useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";
// import { io } from "socket.io-client";
export default function Card() {
  const navigate = useNavigate();
  const setUserName = useSetRecoilState(userName);
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  // const [socket, setSocket] = useState<any>(null);
  // useEffect(() => {
  //   const newSocket = io("http://localhost:3000");
  //   setSocket(newSocket);
  // }, []);
  return (
    <div className="bg-white  w-96 h-72  flex flex-col  items-center p-8">
      <input
        type="text"
        placeholder="Enter name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="block h-14 w-80 px-8 m-1  border border-1 rounded-lg border-gray-900"
      ></input>
      <input
        type="text"
        placeholder="Enter RoomName"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
        className="block px-8  h-14 w-80 border border-1 rounded-lg border-gray-900"
      ></input>
      <button
        onClick={() => {
          setUserName({
            userName: user,
          });
          if (room == "") {
            alert("enter room name");
          } else {
            // socket.emit("join-room", room);
            navigate(`/canvas/${room}`);
          }
        }}
        className="block my-1  bg-green-500 text-white py-3 rounded-md font-bold w-64"
      >
        Play
      </button>
      <button
        className="my-1 bg-blue-500 text-white py-3 rounded-md font-bold w-64"
        onClick={() => navigate("/createRoom")}
      >
        Create Room
      </button>
    </div>
  );
}
