import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <>
      <main className="max-w-277 w-full mx-auto px-1 flex flex-col items-center relative">
        <Outlet />
      </main>
    </>
  );
}

export default PublicLayout;
