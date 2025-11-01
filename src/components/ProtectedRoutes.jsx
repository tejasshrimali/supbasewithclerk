// ProtectedRoutes.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoutes = ({ children }) => {
  const { isSignedIn, user, isLoaded } = useUser();
  const location = useLocation();

  if (!isLoaded) return null;

  // Public Pages
  const publicRoutes = ["/", "/sign-in", "/sign-up"];
  if (publicRoutes.includes(location.pathname)) {
    return children;
  }

  // Not Signed In
  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  // ✅ Check unsafeMetadata instead of publicMetadata
  const completed = user?.unsafeMetadata?.completedProfile;

  if (!completed && location.pathname !== "/more-info") {
    return <Navigate to="/more-info" />;
  }

  return children;
};

export default ProtectedRoutes;
 