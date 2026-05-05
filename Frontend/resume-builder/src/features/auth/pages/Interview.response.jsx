import React from "react";
import { useLocation, Link } from "react-router-dom"; 

const InterviewResponse = () => {
  // 2. Initialize the hook
  const location = useLocation();
  
  // 3. Extract the data exactly as you named it in the navigate function
  // We use `?.` (optional chaining) so the app doesn't crash if state is null
  const reportData = location.state?.reportData;

  // 4. Handle the "null" scenario (if a user refreshes or visits the URL directly)
  if (!reportData) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-white">
        <h2 className="text-2xl mb-4">No report data found.</h2>
        <Link to="/" className="text-violet-400 underline hover:text-violet-300">
          Go back to generate a report
        </Link>
      </div>
    );
  }

  // 5. Render your actual page if the data exists!
  return (
    <main className="p-20 text-white">
      <h1 className="text-4xl font-bold mb-8 text-violet-400">Your Analysis</h1>
      
      {/* Example of how to display the data */}
      <div className="secondary-bgc p-7 rounded-2xl shadow-lg shadow-black/25">
        <pre className="whitespace-pre-wrap font-sans text-sm text-gray-300">
          {/* If your report is a JSON object, this is a quick way to render it on screen to test it */}
          {JSON.stringify(reportData, null, 2)}
        </pre>
      </div>
    </main>
  );
};

export default InterviewResponse;