import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-12 sm:text-6xl">404 Not Found</h1>
      <Link to="/">Go back Home</Link>
    </>
  );
}
