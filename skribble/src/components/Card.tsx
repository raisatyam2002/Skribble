import { useNavigate } from "react-router";
import { userName } from "../store/atoms/username";
import { useSetRecoilState } from "recoil";
import { useState, useEffect } from "react";

import { roomX } from "../store/atoms/roomName";

// import { io } from "socket.io-client";
export default function Card() {
  const navigate = useNavigate();
  const setUserName = useSetRecoilState(userName);
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const setRoomX = useSetRecoilState(roomX);

  const [backgroundPositions, setBackgroundPositions] = useState({
    color: { x: "0", y: "0" },
    eyes: { x: "0", y: "0" },
    mouth: { x: "0", y: "0" },
  });

  useEffect(() => {
    const getRandomPosition = () => {
      const postions = [
        {
          x: "200%",
          y: "1000%",
        },
        {
          x: "800%",
          y: "800%",
        },
        {
          x: "200%",
          y: "0%",
        },
        {
          x: "800%",
          y: "1000%",
        },
        {
          x: "600%",
          y: "900%",
        },
        {
          x: "900%",
          y: "800%",
        },
      ];
      const randomPosition =
        postions[Math.floor(Math.random() * postions.length)];
      return { x: randomPosition.x, y: randomPosition.y };
    };

    setBackgroundPositions({
      color: getRandomPosition(),
      eyes: getRandomPosition(),
      mouth: getRandomPosition(),
    });
  }, []);
  return (
    <div
      className=" bg-transparent max-w-full  flex flex-col  items-center p-8 "
      style={{ backgroundColor: "rgba(12, 44, 150, 0.75)" }}
    >
      <input
        type="text"
        placeholder="Enter name"
        value={user}
        onChange={(e) => setUser(e.target.value)}
        className="block h-14 w-80 px-8 m-1  border border-1 rounded-lg border-gray-900  "
      ></input>
      <input
        type="text"
        placeholder="Enter RoomName"
        value={room}
        onChange={(e) => {
          setRoom(e.target.value);
          setRoomX({
            roomX: e.target.value,
          });
        }}
        className="block px-8  h-14 w-80 border border-1 rounded-lg border-gray-900"
      ></input>
      <div className="flex max-w-full h-40 justify-center gap-3">
        <div className="w-1/4 flex flex-col justify-around ">
          <div className="arrow1"></div>
          <div className="arrow1"></div>
          <div className="arrow1"></div>
        </div>
        <div className="face w-1/2">
          <div
            className="color"
            style={{
              backgroundPosition: `${backgroundPositions.color.x} ${backgroundPositions.color.y}`,
            }}
          ></div>
          <div
            className="eyes"
            style={{
              backgroundPosition: `${backgroundPositions.color.x} ${backgroundPositions.color.y}`,
            }}
          ></div>
          <div
            className="mouth"
            style={{
              backgroundPosition: `${backgroundPositions.color.x} ${backgroundPositions.color.y}`,
            }}
          ></div>
        </div>
        <div className="w-1/4 flex flex-col justify-around">
          <div className="arrow2"></div>
          <div className="arrow2"></div>
          <div className="arrow2"></div>
        </div>
      </div>
      <button
        onClick={() => {
          setUserName({
            userName: user,
          });
          if (room == "") {
            alert("enter room name");
          } else {
            // socket.emit("join-room", room);
            localStorage.setItem("userName", user);
            localStorage.setItem("roomName", room);
            navigate(`/canvas/${room}`);
          }
        }}
        className="block my-1  bg-green-500 text-white py-3 rounded-md font-bold w-64 "
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
