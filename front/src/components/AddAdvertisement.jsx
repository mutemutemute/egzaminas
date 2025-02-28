import { useForm } from "react-hook-form";
import axios from "axios";
import { useContext } from "react";
import AdContext from "../contexts/AdContext";
import UserContext from "../contexts/UserContext";
const API_URL = import.meta.env.VITE_API_URL;

const AddAdvertisement = () => {
  const { setAds, error, setError, setShowForm } = useContext(AdContext);
  const { user } = useContext(UserContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formdata) => {
    try {
      const payload = {
        ...formdata,
        user_id: user.id,
      };

      const response = await axios.post(`${API_URL}/ads`, payload, {
        withCredentials: true,
      });

      const newAppointment = response.data?.data || response.data || response;

      setAds((prev) => [...prev, newAppointment]);
      reset();
      window.alert("Advertisement added successfully!");
      setShowForm(false);
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4 flex flex-col space-y-1">
          <label htmlFor="name" className="text-sm ">
            Name
          </label>
          <input
            {...register("name", {
              required: "Excursion name is required",
            })}
            type="text"
            placeholder="Advertisement Name"
            className="input input-bordered mt-1 p-2  rounded-md w-full flex-1"
          />

          {errors.name && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap top-[-0.2rem]">
                {errors.name.message}
              </p>
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-col space-y-1">
          <label htmlFor="category_id" className="text-sm">
            Category
          </label>
          <select
            {...register("category_id", {
              required: "Category is required",
            })}
            className="input input-bordered mt-1 p-2 rounded-md w-full"
          >
            <option value="">Select Category</option>
            <option value="1">Furniture</option>
            <option value="2">Sports</option>
            <option value="3">Technology</option>
            <option value="4">Transport</option>
            <option value="5">Leisure</option>
            <option value="6">Real estate</option>
          </select>

          {errors.category_id && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap top-[-0.2rem]">
                {errors.category_id.message}
              </p>
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-col space-y-1">
          <label htmlFor="description" className="block text-sm mt-2">
            Description
          </label>
          <textarea
            {...register("description")}
            placeholder="Excursion Description"
            className="input input-bordered mt-1 p-2 rounded-md w-full h-32 flex-1"
          />

          {errors.description && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap top-[-0.2rem]">
                {errors.description.message}
              </p>
            </div>
          )}
        </div>
        <div className="mb-4 flex flex-col space-y-1">
          <label htmlFor="price" className="text-sm">
            Price
          </label>
          <input
            {...register("price", {
              required: "Price is required",
              valueAsNumber: true, // Convert input value to a number
              min: {
                value: 0,
                message: "Price must be greater than 0",
              },
            })}
            type="number"
            placeholder="Price"
            min="0"
            step="1"
            className="mt-1 p-2 input input-bordered rounded-md w-full "
          />

          {errors.price && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap top-[-0.2rem]">
                {errors.price.message}
              </p>
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-col space-y-1">
          <label htmlFor="image_url" className="text-sm ">
            Image URL
          </label>
          <input
            {...register("image_url", {
              required: "Image URL is required",
              pattern: {
                value:
                  /^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tiff)(\?.*)?$/i,
                message: "Please enter a valid image URL (jpg, png, gif, etc.)",
              },
            })}
            type="text"
            placeholder="Image URL"
            className="input input-bordered mt-1 p-2  rounded-md w-full flex-1"
          />

          {errors.image_url && (
            <div className="relative">
              <p className="text-red-500 text-sm absolute whitespace-nowrap top-[-0.2rem]">
                {errors.image_url.message}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-2 pt-2 pb-2">
            <button
              type="submit"
              className="btn px-4 py-2 bg-[#42416f] text-white "
            >
              Add Advertisement
            </button>
          </div>
          
          {error && <p className="text-red-500">{error}</p>}
        </div>
      </form>
    </>
  );
};

export default AddAdvertisement;
