import React, { useRef, useEffect, useState } from "react";
import { Tools } from "./Tools";
// import background3 from "../img/background3.png";
import { userName } from "../store/atoms/username";
import { useRecoilValue } from "recoil";
import { io, Socket } from "socket.io-client";
import background from "../img/background:skribble.png";
import { useParams } from "react-router-dom";
import logo from "../img/logo.gif";
import { UsersCard } from "./Users";
import { ChatBox } from "./ChatBox";
import { roomX } from "../store/atoms/roomName";
interface CanvasProps {}

const Canvas: React.FC<CanvasProps> = (props: CanvasProps) => {
  const user = useRecoilValue(userName);
  const roomx = useRecoilValue(roomX);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<any>(null);
  const [currentColor, setCurrentColor] = useState("");
  const [lineWidth, setLineWidth] = useState(5);
  const [is_drawing, setDrawing] = useState(false);
  const [undoContext, setUndoContext] = useState<any>([]);
  const roomName = useParams().roomName;
  const [users, setConnectedUsers] = useState<String[]>([]);
  const userX = localStorage.getItem("userName");
  const roomY = localStorage.getItem("roomName");

  // const [check, setCheck] = useState("start");

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = 800;
      canvas.height = 500;
      const ctx = canvas.getContext("2d");
      setContext(ctx);
    }
  }, []);
  const [socket, setSocket] = useState<any>(null);

  // useEffect(() => {
  //   const newSocket = io("http://localhost:3000"); // Replace with your backend URL
  //   setSocket(newSocket);
  //   if (newSocket) {
  //     newSocket.emit("join-room", { room: roomY, userName: roomY });
  //     newSocket.on("users-in-room", (users: string[]) => {
  //       console.log("Users in room:", users);
  //       setConnectedUsers(users);
  //     });
  //   }
  //   // socket.emit("hello", "hi from client");
  //   return () => {
  //     newSocket.disconnect();
  //   };
  // }, [userX, roomY]);
  useEffect(() => {
    // Use localStorage or another persistent storage method to store user and room information
    // const userId = localStorage.getItem("userName") || generateUserId();
    // const roomId = localStorage.getItem("roomName") || "custom";
    const userX = localStorage.getItem("userName") || "satyam";
    const roomY = localStorage.getItem("roomName") || "custom";
    // Store the userId and roomId in localStorage if not already stored
    console.log("chekicng ", 23);

    if (!localStorage.getItem("userId")) {
      localStorage.setItem("userId", userX);
    }
    if (!localStorage.getItem("roomId")) {
      localStorage.setItem("roomId", roomY);
    }

    // Check if a socket connection already exists
    if (!socket) {
      const newSocket = io("http://localhost:3000", {
        query: { userX, roomY },
      });
      setSocket(newSocket);

      newSocket.emit("join-room", { room: roomY, userName: userX });

      newSocket.on("users-in-room", (users: string[]) => {
        console.log("Users in room:", users);
        setConnectedUsers(users);
      });

      // Handle disconnection cleanly
      return () => {
        newSocket.disconnect();
      };
    }
  }, [userX, roomY]);

  // function generateUserId() {
  //   return `user_${Math.random().toString(36).substr(2, 9)}`;
  // }

  const sendDrawingData = (imageData: any) => {
    if (socket != null) {
      // console.log(imageData);
      // console.log("socket is", socket.id);
      // const { data, width, height } = imageData;
      // const message = {
      //   data: Array.from(data), // Convert the Uint8ClampedArray to a regular array
      //   width,
      //   height,
      // };
      // console.log(message);
      // console.log(imageData);

      socket.emit("drawingData", { roomName, data: imageData });

      // socket.on("drawingData", (data: any) => {
      //   console.log("hii");
      //   console.log("data is", data);
      //   const coordinates = data.data.coordinates;
      //   context.beginPath();
      //   context.moveTo(coordinates.x, coordinates.y); // Move to the starting point
      //   context.strokeStyle = data.data.color;
      //   context.lineWidth = data.data.lineWidth;
      //   context.lineTo(coordinates.x, coordinates.y); // Draw the line to the new coordinates
      //   context.stroke();
      //   context.lineCap = "round";
      //   context.lineJoin = "round";
      //   context.closePath();
      // });
      // console.log("ssdds");
    }
  };
  useEffect(() => {
    // Listen for "drawingData" event
    if (socket) {
      socket.on("drawingData", (data: any) => {
        // console.log(
        //   "Received drawing data from room:",
        //   data.roomName,
        //   "my room is ",
        //   roomName
        // );
        // if (data.roomName) console.log("Data is", data.data);

        // Extract data from the received object
        const { coordinates, color, lineWidth } = data.data;

        // Handle drawing on canvas using the received data
        context.beginPath();
        context.moveTo(coordinates.x, coordinates.y);
        context.strokeStyle = color;
        context.lineWidth = lineWidth;
        context.lineTo(coordinates.x, coordinates.y);
        context.stroke();
        context.closePath();
      });
    }

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      if (socket) {
        socket.off("drawingData");
      }
    };
  }, [socket]); // Ensure this effect runs whenever the socket changes

  function change_color(color: string) {
    setCurrentColor(color);
    // console.log("color is " + color);
  }
  function change_stroke_width(width: number) {
    setLineWidth(width);
  }

  const start = (event: any) => {
    // console.log("start");

    const x = event.nativeEvent.offsetX;
    const y = event.nativeEvent.offsetY;
    if (typeof x === "number" && typeof y === "number") {
      setDrawing(true);
      context.beginPath();
      context.moveTo(x, y);
    }
    event.preventDefault();
  };
  interface DrawingData {
    coordinates: { x: number; y: number }; // Example for coordinates
    color: string;
    lineWidth: number;
  }

  const draw = (event: any) => {
    // alert("hello");
    // console.log("draw");

    if (is_drawing) {
      const x = event.nativeEvent.offsetX;
      const y = event.nativeEvent.offsetY;

      if (typeof x === "number" && typeof y === "number") {
        context.lineTo(x, y);
        context.strokeStyle = currentColor;
        context.lineWidth = lineWidth;
        context.stroke();

        context.lineCap = "round";
        context.lineJoin = "round";
        const drawingData: DrawingData = {
          coordinates: { x: x, y: y },
          color: currentColor,
          lineWidth: lineWidth,
        };
        sendDrawingData(drawingData);
        // const clonedContext = context.toDataUrl("img/png");

        // socket.emit("teest", "testing");
        context.beginPath(); // Begin a new sub-path
        context.moveTo(x, y);
        // console.log("x is " + x);
      }
    }
    event.preventDefault();
  };

  const stop = (event: any) => {
    // console.log("stop")

    if (is_drawing) {
      context.stroke();
      context.closePath();
      setDrawing(false);
      const clonedContext = context.getImageData(0, 0, 900, 500);
      undoContext.push(clonedContext);
      // sendDrawingData(clonedContext);
      // Update the state with the cloned array
      setUndoContext([...undoContext]);
    }
    event.preventDefault();
  };
  const Undo = () => {
    if (undoContext.length > 0) {
      // console.log("undo button is pressed");

      // Pop the last context from the undoContext array
      undoContext.pop();

      // Use the last context to restore the canvas
      const imgData =
        undoContext.length > 0 ? undoContext[undoContext.length - 1] : null;

      // Update the state with the modified array
      setUndoContext([...undoContext]);

      if (imgData) {
        context.putImageData(imgData, 0, 0);

        // Update the state with the cloned context
        setContext(context);
      }
    } else {
      // Reset the canvas to an empty state
      context.clearRect(0, 0, 900, 500);
      setContext(context);
      setUndoContext([]);
    }
  };
  const Clear = () => {
    context.clearRect(0, 0, 900, 500);
    setContext(context);
    setUndoContext([]);
  };

  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="overflow-y-hidden h-lvh cont"
    >
      <div className="pt-10 cont">
        <div className="logo  ml-24 mb-2 cont">
          <img src={logo}></img>
        </div>
        <div className="h-lvh flex ml-24 cont ">
          <div className=" flex gap-2 parent">
            <div className="child1">
              <UsersCard users={users}></UsersCard>
            </div>

            <div className="bg-white  h-[550px] child2">
              <canvas
                className="border-2 border-black border-solid"
                ref={canvasRef}
                onMouseDown={start}
                onMouseMove={draw}
                onMouseUp={stop}
                onMouseOut={stop}
                {...props}
              />
              <Tools
                change_color={change_color}
                change_stroke_width={change_stroke_width}
                Undo={Undo}
                Clear={Clear}
              ></Tools>
            </div>

            <div className="pt-40 child3">
              {socket ? <ChatBox socket={socket} /> : <p>Loading...</p>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Canvas;
