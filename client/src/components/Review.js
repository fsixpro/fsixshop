import React from 'react'
import Rating from './Rating'
import formatDate from '../util/formateDate'

const Review = ({ review }) => {
  return (
    <div className='card pl-3 mb-3'>
      <strong>{review.name}</strong>
      <Rating value={review.rating} />
      <p>{review.comment}</p>
      <time>{formatDate(review.createdAt)}</time>
    </div>
  )
}

export default Review
