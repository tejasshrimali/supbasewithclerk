import React, { useEffect, useState } from "react";
import { supabase } from "../../supbaseClient";

export default function AdminDashboard() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select("id, full_name, email, degree_name, digilocker_link")
      .eq("role", "Doctor")
      .eq("isVerfied", false);

    if (error) {
      console.error("Error fetching doctors:", error);
    } else {
      setDoctors(data);
    }
    setLoading(false);
  };

  const handleVerify = async (doctorId) => {
    const { error } = await supabase
      .from("profiles")
      .update({ isVerfied: true })
      .eq("id", doctorId);

    if (error) {
      console.error("Error verifying doctor:", error);
    } else {
      setDoctors(doctors.filter((doc) => doc.id !== doctorId));
    }
  };

  return (
    <div className="p-6">
      {" "}
      <h1 className="text-2xl font-bold mb-6">Unverified Doctors</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="flex border rounded-lg shadow-sm p-4 items-start gap-4 bg-white"
            >
              <button
                onClick={() => handleVerify(doctor.id)}
                className="bg-green-500 text-white px-3 py-2 rounded hover:bg-green-600 transition"
              >
                Verify
              </button>
              <div>
                <h2 className="text-lg font-semibold">{doctor.full_name}</h2>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Email:</span> {doctor.email}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Degree:</span>{" "}
                  {doctor.degree_name}
                </p>
                <p className="text-sm text-gray-700">
                  <span className="font-semibold">Digilocker:</span>{" "}
                  <a
                    href={doctor.digilocker_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline hover:text-blue-600"
                  >
                    View
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
