import { useUser } from "@clerk/clerk-react";
import DoctorDashboard from "./DoctorDashboard";
import PatientDashboard from "./PatientDashboard";

const Dashboard = () => {
  const { user } = useUser();
  const role = user?.publicMetadata?.role;

  if (role === "doctor") return <DoctorDashboard />;
  if (role === "patient") return <PatientDashboard />;

  return <div>Please select your role first.</div>;
};

export default Dashboard;
