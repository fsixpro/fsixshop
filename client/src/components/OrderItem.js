import React from 'react'

const OrderItem = ({ order }) => {
  return (
    <div className='col-md-6'>
      <figure className='itemside  mb-4'>
        <div className='aside mr-3'>
          <img src={order.image} alt={order.image} className='border img-sm' />
        </div>
        <figcaption className='info'>
          <p>{order.name} </p>
          <span className='text-muted'>{`${order.qty} X ${order.price} = ${
            order.qty * order.price
          }`}</span>
        </figcaption>
      </figure>
    </div>
  )
}

export default OrderItem
