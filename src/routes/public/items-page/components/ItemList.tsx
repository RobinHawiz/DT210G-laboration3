import { Link } from "react-router-dom";
import { itemListQueryOptions } from "@hooks/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";
import Item from "@components/Item";
import Spinner from "@components/LoadingSpinner";

function ItemList() {
  const { data: itemList, isFetching } = useSuspenseQuery(
    itemListQueryOptions(),
  );

  return (
    <>
      {isFetching && <Spinner />}
      <ul className="grid-cols-[repeat(auto-fit,13rem)] grid gap-6 w-full justify-center">
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
