import { Outlet } from "react-router-dom";

function ItemsPageLayout() {
  return (
    <>
      <h1>Item Stock</h1>
      <Outlet />
    </>
  );
}

export default ItemsPageLayout;
