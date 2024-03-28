import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

function Test() {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up the socket when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("socket", socket.id);
      });
    }
  }, [socket]);

  return <>socket</>;
}

export default Test;
