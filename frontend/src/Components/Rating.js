import React from 'react';
import { BsStarHalf ,BsStarFill,BsStar } from "react-icons/bs";

const Rating = ({ rating, numReview }) => {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <BsStarFill className="icon " />
        ) : rating >= number ? (
          <BsStarHalf className="icon " />
        ) : (
          <BsStar className="icon "/>
        )}
      </span>
    );
  });
  return (
    <>
      <div className="icons d-flex align-items-end">{ratingStar}
    
      <h6 className="mx-2 mb-0"  style={{color:"black"}}>{numReview +" Reviews"} </h6>
      </div>
  
    </>
  );
};

export default Rating;
