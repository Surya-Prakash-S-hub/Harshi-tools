import { useRef } from "react";

const BatchDrag = ({
  accept = "image/*",
  multiple = true,
  onFiles,
  onDragStateChange,
  children,
}) => {
  const inputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    onDragStateChange?.(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    onDragStateChange?.(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();

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
      className="dragndrop-field"
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

export default BatchDrag;
