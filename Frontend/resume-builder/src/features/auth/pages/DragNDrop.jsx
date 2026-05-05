import { useState } from "react";

export default function FileUpload({ onFileDrop }) {
  const [fileName, setFileName] = useState("");

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileDrop(file); // 👈 FIX 1: We must pass the file to the parent here!
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (file) {
      setFileName(file.name);
      onFileDrop(file);
    }
  };

  const handleDragOver = (e) => {
    // 👈 FIX 2: All this needs to do is prevent default so the browser allows the drop.
    // Do NOT try to read e.dataTransfer.files here.
    e.preventDefault(); 
  };

  return (
    <div className="w-full mx-auto transition-all duration-500 hover:-translate-y-1 cursor-pointer">
      <label
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="flex flex-col items-center justify-center w-full h-52 border-3 border-neutral-800 hover:border-b-violet-500 rounded-2xl cursor-pointer neutral-bgc hover:bg-gray-50 transition shadow-lg shadow-black/10"
      >
        <div className="flex flex-col items-center">
          <span
            className="material-symbols-outlined primary-color bg-neutral-800 p-3 rounded-full transform"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            upload_file
          </span>
          <p className="text-white text-sm font-bold">Drag & drop your resume here</p>
          <p className="text-sm text-gray-500">or click to browse</p>
        </div>

        <input type="file" className="hidden" onChange={handleChange} />
      </label>

      {fileName && (
        <p className="mt-3 text-sm text-neutral-500">Selected: {fileName}</p>
      )}
    </div>
  );
}