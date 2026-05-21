import React, { useState } from "react"; // Fixed import syntax
import FileUpload from "./DragNDrop";
import axios from "axios";
import { useNavigate } from "react-router";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});
const InterviewGenerate = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const navigate = useNavigate();
  // 1. Created a state object to handle both textareas
  const [formText, setFormText] = useState({
    selfDescription: "",
    jobDescription: "",
  });

  // Handle changes for both textareas dynamically
  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormText((prev) => ({ ...prev, [name]: value }));
  };

  // 2. Added async to the handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Build your FormData payload
    const formData = new FormData();
    formData.append("selfDescription", formText.selfDescription);
    formData.append("jobDescription", formText.jobDescription);
    if (uploadedFile) {
      formData.append("resume", uploadedFile, {
        withCredentials:true,
      }); 
    }

    try {
    const response = await api.post('/api/interview', formData, {
      withCredentials: true, // This tells the browser to send the cookies!
    });
    
    const { interviewReport } = response.data;
    navigate('/interview-response', { 
        state: { reportData: interviewReport } 
      });

    

  } catch (error) {
    console.error("Error generating report:", error);
  }
  };

  return (
    <main className="max-w-5xl mx-auto px-6 space-y-20">
      <div className="flex gap-7 items p-7 justify-around min-h-80 w-full secondary-bgc shadow-lg shadow-black/25 rounded-2xl flex-col">
        <div className="flex flex-col gap-1">
          <h3 className="text-xs text-violet-400 font-bold">ANALYSIS ENGINE</h3>
          <h2 className="font-bold text-4xl">
            Craft your elite{" "}
            <span className="text-violet-700">career narrative.</span>
          </h2>
          <p className="text-sm text-neutral-600 font-bold">
            Synthesize your professional DNA with our AI artisan to generate
            hyper-tailored strategic assets.
          </p>
        </div>
        
        {/* Added onSubmit here */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full gap-5">
          <div className="flex flex-col gap-3 items-center">
            <label htmlFor="resume" className="font-bold text-gray-200">
              Professional Foundation
            </label>
            <FileUpload onFileDrop={setUploadedFile} />
          </div>
          
          <div className="flex items-center justify-between gap-7">
            <div className="flex flex-col gap-3 w-full"> 
              <label htmlFor="selfDescription" className="font-bold text-gray-200">Your story</label>
              <textarea 
                name="selfDescription" 
                id="selfDescription" 
                value={formText.selfDescription} // Added value
                onChange={handleTextChange}      // Added onChange
                placeholder="Tell us about your unique strengths..." 
                className="neutral-bgc rounded-xl p-5 h-45 text-sm outline-violet-800 resize-none custom-scrollbar"
              />
            </div>

            <div className="flex flex-col gap-3 w-full">
              <label htmlFor="jobDescription" className="font-bold text-gray-200">Your target</label>
              <textarea 
                name="jobDescription" 
                id="jobDescription" 
                value={formText.jobDescription} // Added value
                onChange={handleTextChange}     // Added onChange
                placeholder="Paste the job requirements or description here" 
                className="neutral-bgc rounded-xl p-5 h-45 text-sm focus:ring-none focus:outline-violet-800 resize-none custom-scrollbar"
              />
            </div>
          </div>
          
          {/* Removed onClick, type="submit" triggers the form's onSubmit */}
          <button type="submit" className="rounded-md px-5 py-2 text-sm cursor-pointer hover:bg-violet-700 bg-violet-800">
            Generate Report
          </button>
        </form>
      </div>
    </main>
  );
};

export default InterviewGenerate;