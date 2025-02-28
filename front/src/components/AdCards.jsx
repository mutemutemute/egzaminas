import React, { useContext } from "react";
import AdContext from "../contexts/AdContext";

const AdCard = ({ ad }) => {
  const { id, name, category_name, description, price, image_url, reviews = [], } = ad;
  return (
    <>
    <div className="border border-gray-200 p-4 rounded shadow-md"> 
      <p className="font-bold">{name}</p>
      <p>Category: {category_name}</p>
      <p>Description: {description}</p>
      <p>$ {price}</p>
      <p><img src={image_url} alt="img" /></p>
      
    

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
</div>
</>
  );
};

export default AdCard;
