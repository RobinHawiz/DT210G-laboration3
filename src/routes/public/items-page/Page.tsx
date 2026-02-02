import { toast } from "react-toastify";
import { queryClient } from "@src/main";
import { itemListQueryOptions } from "@hooks/queryOptions";
import ItemList from "@routes/public/items-page/components/ItemList";

export function ErrorBoundary() {
  toast.error("Failed to load items");
  return <div>Failed to load items</div>;
}

export async function loader() {
  return await queryClient.ensureQueryData(itemListQueryOptions());
}

export function Component() {
  return <ItemList />;
}
