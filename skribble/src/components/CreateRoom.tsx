import { useEffect, useState } from "react";
import background from "../img/background:skribble.png";
// import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { userName } from "../store/atoms/username";
import { useSetRecoilState } from "recoil";
function CreateRoom() {
  const navigate = useNavigate();
  const [newRoom, setNewRoom] = useState("");
  const [user, setUser] = useState("");
  const setUserName = useSetRecoilState(userName);
  // const [socket, setSocket] = useState<any>(null);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:3000");
  //   setSocket(newSocket);
  // }, []);

  return (
    <div
      className="h-lvh flex flex-col justify-center items-center p-8 "
      style={{
        backgroundImage: `url(${background})`,
      }}
    >
      <div
        className="  w-96 h-72    p-8"
        style={{ backgroundColor: "rgba(12, 44, 150, 0.75)" }}
      >
        <input
          type="text"
          placeholder="Enter name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          className="block h-14 w-80 px-8 m-2  border border-1 rounded-lg border-gray-900"
        ></input>
        <input
          type="text"
          placeholder="Enter new Room name"
          value={newRoom}
          onChange={(e) => setNewRoom(e.target.value)}
          className="block h-14 w-80 px-8 m-2  border border-1 rounded-lg border-gray-900"
        ></input>
        <button
          className="block my-1  bg-green-500 text-white py-3 rounded-md font-bold w-64 mx-8"
          onClick={() => {
            // socket.emit("join-room", newRoom);
            setUserName({
              userName: user,
            });
            if (newRoom == "") {
              alert("enter room name");
            } else {
              // socket.emit("join-room", room);
              navigate(`/canvas/${newRoom}`);
            }
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}
export default CreateRoom;
