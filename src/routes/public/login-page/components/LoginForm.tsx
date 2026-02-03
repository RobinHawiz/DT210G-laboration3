import { useState, type SubmitEvent } from "react";
import { toast } from "react-toastify";
import Spinner from "@components/ButtonSpinner";
import { loginUser } from "@api/item";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (username.length < 1 || username.length > 50) {
      toast.error("Username must be between 1 and 50 characters.");
      return;
    }

    if (password.length < 1 || password.length > 100) {
      toast.error("Password must be between 1 and 100 characters.");
      return;
    }

    // Form submission
    try {
      setIsLoading(true);
      const response = await loginUser(username, password);
      localStorage.setItem("token", response!.token);
      navigate("/");
      toast.info("Login successful. Welcome!");
    } catch (err) {
      console.error(err);
      toast.error("Invalid username or password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-3">
      <form
        className="flex-center mx-auto w-full max-w-123.75 flex-col gap-3.75 rounded-[0.625rem] py-13 bg-white shadow-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex w-62.5 flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="rounded-lg border border-solid px-2.5 py-1.25"
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            minLength={1}
            maxLength={50}
            required
          />
        </div>
        <div className="flex w-62.5 flex-col">
          <label htmlFor="password">Password</label>
          <input
            className="rounded-lg border border-solid px-2.5 py-1.25"
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={1}
            maxLength={100}
            required
          />
        </div>
        <div>
          <button
            className="flex cursor-pointer gap-2 rounded-full px-3 py-1.5 transition-colors duration-200 ease-in-out hover:bg-blue-600 bg-blue-500 text-white"
            type="submit"
            disabled={isLoading}
          >
            {isLoading && <Spinner />}
            Log in
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
