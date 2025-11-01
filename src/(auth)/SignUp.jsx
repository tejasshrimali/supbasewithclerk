import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <SignUp
        path="/sign-up"
        signInUrl="/sign-in"
        afterSignUpUrl="/select-role"
        redirectUrl="/select-role"
      />
    </div>
  );
};

export default SignUpPage;
