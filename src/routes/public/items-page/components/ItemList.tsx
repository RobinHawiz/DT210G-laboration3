import { Link } from "react-router-dom";
import { itemListQueryOptions } from "@hooks/queryOptions";
import { useSuspenseQuery } from "@tanstack/react-query";

function ItemList() {
  const { data: itemList, isFetching } = useSuspenseQuery(
    itemListQueryOptions(),
  );

  return (
    <>
      {isFetching && <div>Loading items...</div>}
      <ul>
        {itemList?.map((item) => (
          <li key={item.id}>
            <Link to={`/items/${item.id}`}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ItemList;
