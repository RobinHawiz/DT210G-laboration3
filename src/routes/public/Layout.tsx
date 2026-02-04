import { Outlet } from "react-router-dom";
import Header from "@components/Header";

function PublicLayout() {
  return (
    <>
      <Header />
      <main className="relative mx-auto flex w-full max-w-277 flex-col items-center px-1">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;
