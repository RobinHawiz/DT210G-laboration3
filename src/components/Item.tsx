type Props = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  amount: number;
};

function Item({ name, description, price, imageUrl, amount }: Props) {
  return (
    <article className="w-full overflow-auto rounded-lg bg-white shadow-lg">
      <div className="px-4 py-2">
        <h3 className="truncate text-xl font-bold text-gray-800 uppercase">
          {name}
        </h3>
        <p className="mt-1 truncate text-sm text-gray-600">{description}</p>
      </div>
      <img
        className="mx-auto mt-2 h-38.75 w-38.75 object-cover"
        src={imageUrl}
        alt={name}
      />
      <div className="flex items-center justify-between bg-gray-900 px-4 py-2">
        <p className="text-lg font-bold text-white">{amount} st</p>
        <p className="text-lg font-bold text-white">{price} kr</p>
      </div>
    </article>
  );
}

export default Item;
