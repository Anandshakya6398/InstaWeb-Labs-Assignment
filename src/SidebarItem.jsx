import { useDrag } from "react-dnd";

// SidebarItem ek draggable sidebar 
//   type: item ka type (jaise "button", "input", etc.)
//   label: item ka display label
const SidebarItem = ({ type, label }) => {
  // useDrag hook se item ko draggable banaya hai.
  // type: "element" - drag hone wale item ka type
  // item: drag hone par pass hone wala data (yahan sirf type)
  // collect: drag state ko monitor karta hai (isDragging)
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "element",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    // ref={drag} se ye div draggable ban gya
    // isDragging true ho to opacity kam ho gyi (visual feedback ke liye)
    <div
      ref={drag}
      className={`p-2 m-2 bg-white shadow-md rounded cursor-move ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      {label}
    </div>
  );
};

export default SidebarItem;