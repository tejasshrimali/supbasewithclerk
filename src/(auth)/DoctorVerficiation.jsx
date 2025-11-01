import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorVerification = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("doctorVerified", "false");
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Doctor Verification</h2>
      <p className="text-gray-600 mb-4">Upload your degree or license for verification.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80 bg-gray-100 p-6 rounded-lg">
        <input type="file" required onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded">
          Submit Documents
        </button>
      </form>
    </div>
  );
};

export default DoctorVerification;
