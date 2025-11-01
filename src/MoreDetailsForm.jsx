// MoreDetailsForm.jsx
import { useUser } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const MoreDetailsForm = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // ✅ IMPORTANT — Clerk allows writing only to unsafeMetadata from frontend
    await user.update({
      unsafeMetadata: {
        completedProfile: true,
      },
    });

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>

      {/* Your fields */}
      <input
        type="text"
        placeholder="Your Name"
        className="border p-2 w-full mb-3"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Submit"}
      </button>
    </form>
  );
};

export default MoreDetailsForm;
