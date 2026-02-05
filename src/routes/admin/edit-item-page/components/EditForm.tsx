import { useState, type SubmitEvent } from "react";
import { toast } from "react-toastify";
import z from "zod";
import { updateItemById } from "@api/item";
import Drink from "/images/drink.png";
import Dairy from "/images/dairy.png";
import fruitVeggies from "/images/vegetable.png";
import Pantry from "/images/pantry.png";
import Frozen from "/images/frozen.png";
import Drake from "/images/dragon.jpg";
import NoImage from "/images/placeholder.png";

const editFormSchema = z.object({
  name: z
    .string()
    .min(1, "Item name must be between 1 and 100 characters.")
    .max(100, "Item name must be between 1 and 100 characters."),
  description: z
    .string()
    .min(1, "Description must be between 1 and 200 characters.")
    .max(200, "Password must be between 1 and 200 characters."),
  price: z.coerce
    .number("Price has to be a number.")
    .min(1, "Price must be 0 or higher."),
  imageUrl: z
    .string()
    .min(1, "Image url must be between 1 and 2000 characters.")
    .max(2000, "Image url must be between 1 and 2000 characters."),
  amount: z.coerce
    .number("Amount has to be a number.")
    .min(1, "Amount must be 0 or higher."),
});

type Props = {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  amount: number;
};

function EditForm({ id, name, description, price, imageUrl, amount }: Props) {
  const [formImageUrl, setFormImageUrl] = useState(imageUrl);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Validation
    const result = editFormSchema.safeParse(data);
    if (result.error) {
      toast.error(result.error.issues[0].message);
      return;
    }

    // Form submission
    try {
      setIsLoading(true);
      const promise = updateItemById(id.toString(), result.data);
      toast.promise(promise, {
        pending: `Saving "${result.data.name}...`,
        error: `Couldn’t update "${result.data.name}". Try again or refresh the page.`,
        success: `"${result.data.name}" updated.`,
      });
      await promise;
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full px-3">
      <form
        className="flex-center mx-auto w-full max-w-190 flex-col rounded-[0.625rem] bg-white py-4.5 shadow-lg"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex w-full max-w-135.25 flex-col gap-3.75 px-3">
          <div className="flex flex-col">
            <label htmlFor="name">Name</label>
            <input
              className="rounded-lg border border-solid px-2.5 py-1.25"
              type="text"
              id="name"
              name="name"
              defaultValue={name}
              required
            />
          </div>
          <div className="flex flex-wrap gap-3.75">
            <div className="flex min-w-50 flex-1 flex-col">
              <label htmlFor="amount">Amount in stock</label>
              <input
                className="rounded-lg border border-solid px-2.5 py-1.25"
                type="number"
                id="amount"
                name="amount"
                defaultValue={amount}
                required
                min="0"
              />
            </div>
            <div className="flex min-w-50 flex-1 flex-col">
              <label htmlFor="price">Price (SEK)</label>
              <input
                className="rounded-lg border border-solid px-2.5 py-1.25"
                type="number"
                id="price"
                name="price"
                defaultValue={price}
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="flex flex-wrap gap-3.75">
            <div className="flex min-w-50 flex-1 flex-col">
              <img
                src={formImageUrl}
                className="mx-auto h-38.75 w-38.75"
                alt="Product image"
              />
              <div className="flex flex-col">
                <label htmlFor="imageUrl">Choose image</label>
                <select
                  className="h-[2.55rem] rounded-lg border border-solid px-2.5 py-1.25"
                  id="imageUrl"
                  name="imageUrl"
                  value={formImageUrl}
                  onChange={(e) => setFormImageUrl(e.currentTarget.value)}
                  required
                >
                  <option value={Drink}>Drink</option>
                  <option value={Dairy}>Dairy</option>
                  <option value={fruitVeggies}>Fruit & vegetables</option>
                  <option value={Pantry}>Dry goods</option>
                  <option value={Frozen}>Frozen goods</option>
                  <option value={Drake}>Drake (the rapper)</option>
                  <option value={NoImage}>No image</option>
                </select>
              </div>
            </div>
            <div className="flex min-w-50 flex-1 flex-col">
              <label htmlFor="description">Description</label>
              <textarea
                className="h-full rounded-lg border border-solid px-2.5 py-1.25"
                id="description"
                name="description"
                defaultValue={description}
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center gap-3.75">
            <button
              disabled={isLoading}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-blue-500 px-3 py-1.5 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 disabled:bg-blue-400"
              type="submit"
            >
              Update
            </button>
            <button
              disabled={isLoading}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-red-500 px-3 py-1.5 text-white transition-colors duration-200 ease-in-out hover:bg-red-600 disabled:bg-red-400"
              type="button"
              onClick={() => {}}
            >
              Delete
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default EditForm;
