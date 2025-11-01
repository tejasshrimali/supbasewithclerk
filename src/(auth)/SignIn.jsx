import React from "react";

const SignInPage = () => {
  

  return (
    <SignIn
      signInForceRedirectUrl="/dashboard"
      signInFallbackRedirectUrl="/dashboard"
    />
  );
};

export default SignInPage;
