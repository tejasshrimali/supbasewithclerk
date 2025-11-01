import { useNavigate } from "react-router-dom";

const DoctorDocsUpload = () => {
  const navigate = useNavigate();

  const handleUpload = () => {
    // simulate upload and verification pending
    alert("Documents uploaded successfully! You’ll be verified soon.");
    navigate("/dashboard/doctor");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Upload Verification Documents</h2>
      <input type="file" multiple className="mb-4" />
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded"
        onClick={handleUpload}
      >
        Submit Documents
      </button>
    </div>
  );
};

export default DoctorDocsUpload;
