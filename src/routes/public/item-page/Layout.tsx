import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "@components/LoadingSpinner";

function ItemPageLayout() {
  return (
    <>
      <h1 className="text-5xl font-bold mb-12 sm:text-6xl">Item</h1>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </>
  );
}

export default ItemPageLayout;
