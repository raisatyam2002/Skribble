import Canvas from "./components/Canvas";
// import { Tools } from "./components/Tools";
import Home from "./home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CreateRoom from "./components/CreateRoom";
export default function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/canvas/:roomName" element={<Canvas />} />
          <Route path="/createRoom/" element={<CreateRoom />} />
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}
