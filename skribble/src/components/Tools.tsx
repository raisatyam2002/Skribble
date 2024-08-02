interface ToolsProps {
  change_color: (color: string) => void;
  change_stroke_width: (width: number) => void;
  Undo: () => void;
  Clear: () => void;
}

// export function Tools() {
//   return (

//   );
// }
export const Tools: React.FC<ToolsProps> = ({
  change_color,
  change_stroke_width,
  Undo,
  Clear,
}) => {
  // Your component logic
  function handleChange(color: string) {
    change_color(color);
  }
  function handleColorInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedColor = event.target.value;
    console.log(selectedColor);

    handleChange(selectedColor);
  }
  function handleStrokeWidth(event: any) {
    change_stroke_width(event.target.value);
  }
  return (
    <div className="flex gap-9 bg-white Tool">
      <button onClick={Undo}>Undo</button>
      <button onClick={Clear}>Clear</button>
      <div
        onClick={() => handleChange("red")}
        className="border rounded-full  bg-red-600  w-7 tools"
      ></div>
      <div
        onClick={() => handleChange("blue")}
        className="border rounded-full bg-blue-500 w-7 tools"
      ></div>
      <div
        onClick={() => handleChange("green")}
        className="border rounded-full bg-green-600 w-7 tools"
      ></div>
      <div
        onClick={() => handleChange("black")}
        className="border rounded-full bg-black w-7 tools"
      ></div>
      <input type="color" onChange={handleColorInputChange}></input>
      <input type="range" min="5" max="15" onChange={handleStrokeWidth}></input>
    </div>
  );
};
{
  /* <div class="tools">
<button onclick="Restore()">Undo</button>
<button onclick="Clear()">Clear</button>
<div onclick="change_color(this)" style="background:red" class="stroke-color"></div>
<div onclick="change_color(this)" style="background:blue" class="stroke-color"></div>
<div onclick="change_color(this)" style="background:green" class="stroke-color"></div>
<div onclick="change_color(this)" style="background :black" class="stroke-color"></div>
<input type="color" onchange="changeColor(this.value)" placeholder="Colors">
<input type="range" min="1" max="100" oninput="stroke_width = this.value">
</div>

</div> */
}
