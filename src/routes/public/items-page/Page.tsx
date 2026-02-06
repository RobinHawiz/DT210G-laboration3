import { itemListQueryOptions } from "@hooks/queryOptions";
import ItemList from "@routes/public/items-page/components/ItemList";
import { queryClient } from "@src/queryClient";

export function ErrorBoundary() {
  return (
    <h2 className="text-red-500">
      The list of items could not load, please check your internet connection or
      try refreshing the page.
    </h2>
  );
}

export function loader() {
  queryClient.ensureQueryData(itemListQueryOptions());
}

export function Component() {
  return <ItemList />;
}
