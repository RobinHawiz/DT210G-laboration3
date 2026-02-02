import { useEffect } from "react";
import { useParams, type LoaderFunctionArgs } from "react-router-dom";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { queryClient } from "@src/main";
import { itemQueryOptions } from "@hooks/queryOptions";
import Spinner from "@components/LoadingSpinner";
import Item from "@components/Item";

export function ErrorBoundary() {
  useEffect(() => {
    toast.error("Failed to load item");
  }, []);

  return <></>;
}

export function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  queryClient.ensureQueryData(itemQueryOptions(id!)).catch(() => {});
}

export function Component() {
  const { id } = useParams<{ id: string }>();
  const { data: item, isFetching } = useSuspenseQuery(itemQueryOptions(id!));
  return (
    <>
      {isFetching && <Spinner />}
      <Item
        name={item!.name}
        description={item!.description}
        price={item!.price}
        imageUrl={item!.imageUrl}
        amount={item!.amount}
      />
    </>
  );
}
