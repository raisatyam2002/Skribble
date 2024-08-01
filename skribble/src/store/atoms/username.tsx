import { atom } from "recoil";

export const userName = atom({
  key: "userName",
  default: {
    userName: "",
  },
});
export const roomName = atom({
  key: "roomName",
  default: {
    roomName: "",
  },
});
