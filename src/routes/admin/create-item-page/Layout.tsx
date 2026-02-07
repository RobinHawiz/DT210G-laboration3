import { Outlet } from "react-router-dom";

function AddItemPageLayout() {
  return (
    <>
      <h1 className="mb-12 text-5xl font-bold sm:text-6xl">Create Item</h1>
      <Outlet />
    </>
  );
}

export default AddItemPageLayout;
