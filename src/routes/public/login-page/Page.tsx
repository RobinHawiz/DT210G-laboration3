import { useEffect } from "react";
import { toast } from "react-toastify";
import LoginForm from "@routes/public/login-page/components/LoginForm";

export function ErrorBoundary() {
  useEffect(() => {
    toast.error("Something went wrong loading the login page");
  }, []);

  return <></>;
}

function Component() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-12 sm:text-6xl">Login</h1>
      <LoginForm></LoginForm>
    </>
  );
}

export default Component;
