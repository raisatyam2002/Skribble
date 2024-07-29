import Card from "./components/Card";
// import Test from "./components/socket";
import bgImage from "./img/background:skribble.png";
import logo from "./img/logo.gif";
function Home() {
  return (
    <div
      style={{ backgroundImage: `url(${bgImage})` }}
      className="h-lvh flex justify-center "
    >
      <div className="mt-20">
        <div className="logo mb-4">
          <img src={logo}></img>
        </div>
        <Card></Card>
      </div>
      {/* <Test></Test> */}
    </div>
  );
}
export default Home;
