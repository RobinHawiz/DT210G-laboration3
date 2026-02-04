import { useEffect, useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import z from "zod";
import { useAuth } from "@src/contexts/AuthProvider";
import Spinner from "@components/ButtonSpinner";

const loginFormSchema = z.object({
  username: z
    .string()
    .min(1, "Username must be between 1 and 50 characters.")
    .max(50, "Username must be between 1 and 50 characters."),
  password: z
    .string()
    .min(1, "Password must be between 1 and 100 characters.")
    .max(100, "Password must be between 1 and 100 characters."),
});

export type LoginCredentials = z.infer<typeof loginFormSchema>;

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { token, login } = useAuth();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Validation
    const result = loginFormSchema.safeParse(data);
    if (result.error) {
      toast.error(result.error.issues[0].message);
      return;
    }

    // Form submission
    try {
      setIsLoading(true);
      await login(result.data);
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
        className="flex-center mx-auto w-full max-w-123.75 flex-col gap-3.75 rounded-[0.625rem] bg-white py-13 shadow-md"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex w-62.5 flex-col">
          <label htmlFor="username">Username</label>
          <input
            className="rounded-lg border border-solid px-2.5 py-1.25"
            type="text"
            id="username"
            name="username"
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
            maxLength={100}
            required
          />
        </div>
        <div>
          <button
            className="flex cursor-pointer gap-2 rounded-full bg-blue-500 px-3 py-1.5 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600"
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
