import React from 'react';
import { BsStarHalf, BsStarFill, BsStar } from 'react-icons/bs';

const Rating = ({ rating, numReview, caption }) => {
  const ratingStar = Array.from({ length: 5 }, (ele, index) => {
    let number = index + 0.5;
    return (
      <span key={index}>
        {rating >= index + 1 ? (
          <BsStarFill className="icon " />
        ) : rating >= number ? (
          <BsStarHalf className="icon " />
        ) : (
          <BsStar className="icon " />
        )}
      </span>
    );
  });
  return (
    <>
      <div className="icons d-flex align-items-end">
        {ratingStar}

        <h6 className="mx-2 mb-0" style={{ color: 'black' }}>
          {caption ? (
            <span>{caption}</span>
          ) : (
            <span>{numReview + ' Reviews'}</span>
          )}
        </h6>
      </div>
    </>
  );
};

export default Rating;
