import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@src/contexts/AuthProvider";
import { itemQueryOptions } from "@hooks/queryOptions";
import useToast, { type ToastMessages } from "@hooks/useToast";
import Item from "@components/Item";

const initialMessages: ToastMessages = {
  pending: "Loading item...",
  error: "Could not load item",
  success: "Item successfully loaded",
};

const refetchMessages: ToastMessages = {
  pending: "Updating item...",
  error: "Could not update item",
  success: "Item updated successfully",
};

export function ErrorBoundary() {
  return (
    <h2 className="text-red-500">
      The selected item cannot be found, please select a different one or try
      refreshing the page.
    </h2>
  );
}

export function Component() {
  const { id } = useParams<{ id: string }>();
  const {
    data: item,
    promise,
    refetch,
    isRefetching,
    isFetching,
  } = useQuery(itemQueryOptions(id!));

  useToast(
    isFetching,
    isRefetching,
    promise,
    refetch,
    initialMessages,
    refetchMessages,
  );

  const { token } = useAuth();

  const navigate = useNavigate();
  const redirectToEditForm = () => {
    navigate(`/items/${id}/edit`);
  };

  return (
    <>
      {(!isFetching || isRefetching) && item && (
        <>
          {token && (
            <button
              className="mx-4 my-2 cursor-pointer self-end rounded-full bg-blue-500 px-4 py-2 text-white shadow-md transition-colors duration-200 ease-in-out hover:bg-blue-600"
              onClick={redirectToEditForm}
            >
              Edit
            </button>
          )}
          <Item
            name={item.name}
            description={item.description}
            price={item.price}
            imageUrl={item.imageUrl}
            amount={item.amount}
          />
        </>
      )}
    </>
  );
}
