import { useEffect } from "react";
import { toast } from "react-toastify";
import { queryClient } from "@src/queryClient";
import { itemListQueryOptions } from "@hooks/queryOptions";
import ItemList from "@routes/public/items-page/components/ItemList";

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
  return <ItemList />;
}
