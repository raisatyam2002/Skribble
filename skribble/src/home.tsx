import Card from "./components/Card";
// import Test from "./components/socket";
import background from "./img/peakpx.jpg";
function Home() {
  return (
    <div
      style={{ backgroundImage: `url(${background})` }}
      className="h-lvh flex justify-center bg-url[]"
    >
      <div className="m-32">
        <div>
          <h2>Skribble</h2>
        </div>
        <Card></Card>
      </div>
      {/* <Test></Test> */}
    </div>
  );
}
export default Home;
