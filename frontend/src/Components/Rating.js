import React from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
//   faRankingStar,
//   faStar,
//   faStarHalfStroke,
// } from '@fortawesome/free-solid-svg-icons';
// import { AiOutlineStar } from 'react-icons/ai';
import { BsStarHalf ,BsStarFill,BsStar } from "react-icons/bs";
// import { FaStar } from 'react-icons/fa';

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
    // <div className="Rating">
    //   <span>
    //     {rating >= 1 ? (
    //       <FontAwesomeIcon icon={faStar} />
    //     ) : rating >= 0.5 ? (
    //       <FontAwesomeIcon icon={faStarHalfStroke} />
    //     ) : (
    //       <FontAwesomeIcon icon={faR} />
    //     )}
    //   </span>
    //   <span>
    //     {rating >= 2 ? (
    //       <FontAwesomeIcon icon={faStar} />
    //     ) : rating >= 1.5 ? (
    //       <FontAwesomeIcon icon={faStarHalfStroke} />
    //     ) : (
    //       <FontAwesomeIcon icon={faRankingStar} />
    //     )}
    //   </span>
    //   <span>
    //     {rating >= 3 ? (
    //       <FontAwesomeIcon icon={faStar} />
    //     ) : rating >= 2.5 ? (
    //       <FontAwesomeIcon icon={faStarHalfStroke} />
    //     ) : (
    //       <FontAwesomeIcon icon={faRankingStar} />
    //     )}
    //   </span>
    //   <span>
    //     {rating >= 4 ? (
    //       <FontAwesomeIcon icon={faStar} />
    //     ) : rating >= 3.5 ? (
    //       <FontAwesomeIcon icon={faStarHalfStroke} />
    //     ) : (
    //       <FontAwesomeIcon icon={faRankingStar} />
    //     )}
    //   </span>
    //   <span>
    //     {rating >= 5 ? (
    //       <FontAwesomeIcon icon={faStar} />
    //     ) : rating >= 4.5 ? (
    //       <FontAwesomeIcon icon={faStarHalfStroke} />
    //     ) : (
    //       <FontAwesomeIcon icon={faRankingStar} />
    //     )}
    //   </span>
    // </div>
    <>
      <div className="icons d-flex align-items-end">{ratingStar}
    
      <h6 className="mx-2 mb-0"  style={{color:"black"}}>{numReview +" Reviews"} </h6>
      </div>
  
    </>
  );
};

export default Rating;
