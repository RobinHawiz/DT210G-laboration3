import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { itemListQueryOptions } from "@hooks/queryOptions";
import useToast, { type ToastMessages } from "@hooks/useToast";
import Item from "@components/Item";

const initialMessages: ToastMessages = {
  pending: "Loading items...",
  error: "Could not load items",
  success: "Items successfully loaded",
};

const refetchMessages: ToastMessages = {
  pending: "Updating items...",
  error: "Could not update items",
  success: "Items updated successfully",
};

function ItemList() {
  const {
    data: itemList,
    promise,
    refetch,
    isRefetching,
    isFetching,
  } = useQuery(itemListQueryOptions());

  useToast(
    isFetching,
    isRefetching,
    promise,
    refetch,
    initialMessages,
    refetchMessages,
  );

  return (
    <>
      <ul className="grid w-full grid-cols-[repeat(auto-fit,13rem)] justify-center gap-6">
        {itemList?.map((item) => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>
              <Item
                name={item.name}
                description={item.description}
                price={item.price}
                imageUrl={item.imageUrl}
                amount={item.amount}
              />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemList;
