import { Outlet } from "react-router-dom";

function ItemsPageLayout() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-12 sm:text-6xl">Item Stock</h1>
      <Outlet />
    </>
  );
}

export default ItemsPageLayout;
