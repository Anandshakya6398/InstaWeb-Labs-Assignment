// PropertyEditor component selected element ki properties edit karne ke liye hai
// Props:
//   element: abhi select kiya hua element (ya null)
//   onChange: jab property change ho to parent ko update karne ke liye function
const PropertyEditor = ({ element, onChange }) => {
  // Agar koi element select nahi hai to message dikhaye
  if (!element) return <div className="text-gray-500">Select an element</div>;

  // update function: property change hone par naya object bana ke onChange call karta hai 
  const update = (field, value) => {
    onChange({
      ...element,
      properties: { ...element.properties, [field]: value },
    });
  };

  return (
    <div className="p-4 bg-white shadow rounded">
      {/* Agar text element hai to uska text property edit karne ka input */}
      {element.type === "text" && (
        <input
          type="text"
          value={element.properties.text}
          onChange={(e) => update("text", e.target.value)}
          className="border p-2 w-full"
        />
      )}
      {/* Agar image element hai to uska src property edit karne ka input */}
      {element.type === "image" && (
        <input
          type="text"
          value={element.properties.src}
          onChange={(e) => update("src", e.target.value)}
          placeholder="Image URL"
          className="border p-2 w-full"
        />
      )}
      {/* Agar button element hai to uska label property edit karne ka input */}
      {element.type === "button" && (
        <input
          type="text"
          value={element.properties.label}
          onChange={(e) => update("label", e.target.value)}
          className="border p-2 w-full"
        />
      )}
    </div>
  );
};

export default PropertyEditor;