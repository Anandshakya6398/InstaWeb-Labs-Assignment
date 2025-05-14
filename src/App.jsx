import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import SidebarItem from "./SidebarItem";
import Canvas from "./Canvas";
import PropertyEditor from "./PropertyEditor";

// ELEMENTS array mein  sidebar mein dikhne wale items define karein hai 
const ELEMENTS = [
  { type: "text", label: "Text" },
  { type: "image", label: "Image" },
  { type: "button", label: "Button" },
];

export default function App() {
  // elements: canvas par jo items dikh rahe hain unki list
  const [elements, setElements] = useState([]);
  // selectedIndex: abhi select kiya hua element ka index
  const [selectedIndex, setSelectedIndex] = useState(null);

  // handleDrop: jab sidebar se koi item canvas par drop ho
  const handleDrop = (type) => {
    // naye element ke default properties set karo
    const defaultProperties =
      type === "text"
        ? { text: "New text" }
        : type === "image"
        ? { src: "https://picsum.photos/900" }
        : { label: "Click Me" };

    // naye element ko elements array mein add karo
    setElements([...elements, { type, properties: defaultProperties }]);
  };

  // handleSelect: kisi element ko select karne par uska index set karo
  const handleSelect = (index) => setSelectedIndex(index);

  // handleUpdate: property editor se element update hone par elements array update karna
  const handleUpdate = (updatedElement) => {
    const newElements = [...elements];
    newElements[selectedIndex] = updatedElement;
    setElements(newElements);
  };

  return (
    // DndProvider se drag-and-drop context provide hota hai
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen flex p-4 gap-4 bg-gray-200">
        {/* Sidebar: draggable elements dikhata hai */}
        <div className="w-1/5 bg-white p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Elements</h2>
          {ELEMENTS.map((el) => (
            <SidebarItem key={el.type} {...el} />
          ))}
        </div>

        {/* Canvas: drag-and-drop area */}
        <Canvas
          elements={elements}
          onDropElement={handleDrop}
          onSelectElement={handleSelect}
        />

        {/* Property Editor: selected element ki properties edit karne ke liye */}
        <div className="w-1/4">
          <h2 className="text-lg font-bold mb-2">Properties</h2>
          <PropertyEditor
            element={elements[selectedIndex]}
            onChange={handleUpdate}
          />
        </div>
      </div>
    </DndProvider>
  );
}