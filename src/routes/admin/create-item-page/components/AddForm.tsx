import { useState, type SubmitEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { itemAddMutationOptions } from "@hooks/queryOptions";
import { toast } from "react-toastify";
import z from "zod";
import type { ItemPayload } from "@customTypes/item";
import Drink from "/images/drink.png";
import Dairy from "/images/dairy.png";
import fruitVeggies from "/images/vegetable.png";
import Pantry from "/images/pantry.png";
import Frozen from "/images/frozen.png";
import Drake from "/images/dragon.jpg";
import NoImage from "/images/placeholder.png";

const addFormSchema = z.object({
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

function AddForm() {
  const [formImageUrl, setFormImageUrl] = useState(NoImage);
  const navigate = useNavigate();
  const { mutateAsync: addItemMutation, isPending: isLoading } = useMutation(
    itemAddMutationOptions(),
  );

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Validation
    const result = addFormSchema.safeParse(data);
    if (result.error) {
      toast.error(result.error.issues[0].message);
      return;
    }

    // Form submission
    try {
      const createdItem: ItemPayload = { ...result.data };
      const promise = addItemMutation(createdItem);

      toast.promise(promise, {
        pending: `Creating "${createdItem.name}"...`,
        error: `Couldn’t create "${createdItem.name}". Try again or refresh the page.`,
        success: `"${createdItem.name}" created.`,
      });

      await promise.then((location) => {
        if (!location) {
          throw new Error("Server Error: Missing location header contents");
        }
        navigate(location.replace(/^\/api/, ""));
      });
    } catch (err) {
      console.error(err);
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
                required
              ></textarea>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              disabled={isLoading}
              className="flex cursor-pointer items-center gap-2 rounded-full bg-blue-500 px-3 py-1.5 text-white transition-colors duration-200 ease-in-out hover:bg-blue-600 disabled:bg-blue-400"
              type="submit"
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddForm;
