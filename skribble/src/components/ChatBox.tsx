import { useEffect, useState } from "react";
interface userMessage {
  userName: string;
  message: string;
}
export const ChatBox = ({ socket }: any) => {
  const user = localStorage.getItem("userName") || "";
  const room = localStorage.getItem("roomName");
  const [messages, setMessages] = useState<userMessage[]>([]);
  const [latestMessage, setLatestMessage] = useState<string>("");
  useEffect(() => {
    socket.on("message", (data: any) => {
      setMessages((prev) => [
        ...prev,
        {
          userName: data.user,
          message: data.latestMessage,
        },
      ]);
      console.log("message ", data.latestMessage);
    });
  }, [socket]);
  function handleKeyDown(e: any) {
    if (e.key === "Enter" && latestMessage.trim() !== "") {
      console.log("Emitting message:", latestMessage, "to room:", room);
      setMessages((prev) => [
        ...prev,
        {
          userName: user,
          message: latestMessage,
        },
      ]);
      socket.emit("message", { room, latestMessage, user });
      setLatestMessage("");
    }
  }

  return (
    <div className="bg-white h-96 w-60 relative ChatBox ChatBoxDiv">
      <div className="overflow-y-auto h-5/6">
        {messages.map((mess, index) => (
          <p key={index}>
            {mess.userName}: {mess.message}
          </p>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your guess here"
        className="w-full p-2 border-t border-gray-300 absolute bottom-0 left-0 border-4 border-solid h-1/6"
        style={{ borderWidth: "5px" }}
        value={latestMessage}
        onChange={(e) => {
          setLatestMessage(e.target.value);
        }}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};
