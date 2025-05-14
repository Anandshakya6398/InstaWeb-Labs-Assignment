import { useDrop } from "react-dnd";

// Canvas component drag-and-drop area hai jahan sidebar se items drag karke chhodenge.
// Props:
//   elements: canvas par dikhne wale elements ki list
//   onDropElement: jab naya item drop ho to call hoga
//   onSelectElement: kisi element par click ho to call hoga
const Canvas = ({ elements, onDropElement, onSelectElement }) => {
  // useDrop hook se canvas ko drop area banaya hai
  // accept: "element" - sirf "element" type items yahan drop hoga
  // drop: jab item drop ho to onDropElement ko us item ke type ke saath call kara
  const [, drop] = useDrop(() => ({
    accept: "element",
    drop: (item) => onDropElement(item.type),
  }));

  return (
    // ref={drop} se ye div drop area banaya
    <div
      ref={drop}
      className="flex-1 min-h-[400px] bg-gray-100 border p-4 flex flex-col gap-4"
    >
      {/* Canvas par jitne elements hain unko map karke dikhate hain */}
      {elements.map((el, idx) => (
        <div
          key={idx}
          onClick={() => onSelectElement(idx)} // element select karne ke liye
          className="p-2 border bg-white rounded shadow cursor-pointer hover:bg-gray-50"
        >
          {/* Alag-alag type ke elements ko alag tarike se render kara hai */}
          {el.type === "text" && <p>{el.properties.text}</p>}
          {el.type === "image" && (
            <img src={el.properties.src} alt="" className="max-w-xs" />
          )}
          {el.type === "button" && (
            <button className="px-4 py-2 bg-blue-500 text-white rounded">
              {el.properties.label}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default Canvas;