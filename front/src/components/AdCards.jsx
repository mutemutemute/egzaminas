import React, { useContext } from "react";
import AdContext from "../contexts/AdContext";
import { FaRegTrashCan } from "react-icons/fa6";
import UserContext from "../contexts/UserContext";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const AdCard = ({ ad }) => {
  const {
    id,
    name,
    category_name,
    description,
    price,
    image_url,
    reviews = [],
  } = ad;
  const { setAds, setError } = useContext(AdContext);
  const { user } = useContext(UserContext);

  const handleDelete = async () => {
    
    const confirmed = window.confirm(
      "Are you sure you want to delete this advertisement?"
    );
    if (!confirmed) return;
  
    try {
      
      await axios.delete(`${API_URL}/ads/${id}`, {
        withCredentials: true,
      });
  
      
      setAds((prev) => prev.filter((ad) => ad.id !== id));
  
      window.alert("Advertisement deleted successfully!");
      
      update();
    } catch (error) {
      
      setError(error.message);
    }
  };
  
  return (
    <>
      <div className="border border-gray-200 p-4 rounded shadow-md">
        <p className="font-bold">{name}</p>
        <p>Category: {category_name}</p>
        <p>Description: {description}</p>
        <p>$ {price}</p>
        <p>
          <img src={image_url} alt="img" />
        </p>

        <div className="mt-4">
          <h3 className="font-semibold">Reviews:</h3>
          {Array.isArray(reviews) && reviews.length > 0 ? (
            <ul className="list-disc pl-5">
              {reviews.map((review) => (
                <li key={review.id}>
                  <strong>{review.name}</strong>
                  {review.comment}
                </li>
              ))}
            </ul>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>

        {user &&<div className="pt-2">
         
          <button
            onClick={handleDelete}
            className="text-[#42416f] border border-[#42416f] rounded-sm p-1"
          >
            <FaRegTrashCan size={22} />
          </button>
        </div>}
      </div>
    </>
  );
};

export default AdCard;
