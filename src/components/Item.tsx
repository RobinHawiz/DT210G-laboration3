type Props = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  amount: number;
};

function Item({ name, description, price, imageUrl, amount }: Props) {
  return (
    <article className="bg-white overflow-auto rounded-lg shadow-lg w-full">
      <div className="px-4 py-2">
        <h3 className="text-xl font-bold text-gray-800 uppercase">{name}</h3>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
      <img
        className="object-cover h-38.75 w-38.75 mt-2 mx-auto"
        src={imageUrl}
        alt={name}
      />
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900">
        <p className="text-lg font-bold text-white">{amount} st</p>
        <p className="text-lg font-bold text-white">{price} kr</p>
      </div>
    </article>
  );
}

export default Item;
