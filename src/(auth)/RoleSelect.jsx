import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const RoleSelect = () => {
  const navigate = useNavigate();
  const { user, isLoaded } = useUser();

  const handleSelectRole = async (role) => {
    if (!isLoaded || !user) {
      alert("Please wait... loading your account.");
      return;
    }

    try {
      // 🧠 TEMPORARY: store the role locally (mock backend)
      localStorage.setItem("userRole", role);

      // 🔁 Redirect based on role
      if (role === "doctor") {
        navigate("/upload-documents");
      } else {
        navigate("/dashboard/patient");
      }
    } catch (error) {
      console.error("Error setting role:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-6">Choose your role</h2>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded mb-4 hover:bg-blue-700"
        onClick={() => handleSelectRole("doctor")}
      >
        I am a Doctor
      </button>
      <button
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        onClick={() => handleSelectRole("patient")}
      >
        I am a Patient
      </button>
    </div>
  );
};

export default RoleSelect;
