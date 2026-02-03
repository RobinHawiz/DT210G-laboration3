import { Outlet } from "react-router-dom";

function ItemPageLayout() {
  return (
    <>
      <h1 className="mb-12 text-5xl font-bold sm:text-6xl">Item</h1>
      <Outlet />
    </>
  );
}

export default ItemPageLayout;
