import { Suspense, useEffect } from "react";
import { toast } from "react-toastify";
import { queryClient } from "@src/main";
import { itemListQueryOptions } from "@hooks/queryOptions";
import ItemList from "@routes/public/items-page/components/ItemList";
import Spinner from "@components/LoadingSpinner";

export function ErrorBoundary() {
  useEffect(() => {
    toast.error("Failed to load item list");
  }, []);

  return <></>;
}

export function loader() {
  queryClient.ensureQueryData(itemListQueryOptions()).catch(() => {});
}

export function Component() {
  return (
    <Suspense fallback={<Spinner />}>
      <ItemList />
    </Suspense>
  );
}
