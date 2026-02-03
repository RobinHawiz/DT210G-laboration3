import { Outlet } from "react-router-dom";
import Header from "@components/Header";

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="max-w-277 w-full mx-auto px-1 flex flex-col items-center relative">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;
