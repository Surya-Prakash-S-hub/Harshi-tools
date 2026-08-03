import { useRef, useState } from "react";

const DragDrop = ({
  accept = "image/*",
  multiple = false,
  onFiles,
  children,
  onDragStateChange,
}) => {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
    onDragStateChange?.(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
    onDragStateChange?.(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    onDragStateChange?.(false);

    const files = Array.from(e.dataTransfer.files);

    if (files.length) {
      onFiles(files);
    }
  };

  const handleChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length) {
      onFiles(files);
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={`${dragging ? "drag-active" : ""} dragndrop-field`}
    >
      <input
        ref={inputRef}
        type="file"
        hidden
        accept={accept}
        multiple={multiple}
        onChange={handleChange}
      />

      <div onClick={() => inputRef.current.click()}>{children}</div>
    </div>
  );
};

export default DragDrop;
