import axios from 'axios';
import { useEffect, useState } from 'react'

const baseURL = import.meta.env.VITE_BASE_URL;

function OrderDetail({ id }) {
  const [order, setOrder] = useState()

  useEffect(() => {
    const getDetailOrder = async () => {
      const getData = await axios.get(`${baseURL}/orders/${id}`);
      return setOrder(getData.data.data)
    }

    getDetailOrder()
  }, [id]);

  return (
    <>
      <h1 className='text-xl text-center font-medium mb-2'>Your Order Details</h1>
      <hr />
      <div className='flex flex-col justify-between'>
        <ul className='my-4'>
          <div className='flex justify-between font-medium mb-2'>
            <div className='flex gap-5 lg:gap-10'>
              <span>Qty</span>
              <p>Menu</p>
            </div>
            <span>Total</span>
          </div>
          {order?.menu.map((item, i) => (
            <li key={i} className='flex justify-between items-center text-sm lg:text-base'>
              <div className='flex gap-6 lg:gap-10 items-center'>
                <span>{item.qty}x</span>
                <p>{item.name}</p>
              </div>
              <span>{item.qty * item.price}</span>
            </li>
          ))}
        </ul>
        <hr />
        <div className='flex justify-between mt-2'>
          <span className='font-medium'>Total</span>
          <span>Rp. {order?.totalPrice}</span>
        </div>
        <div className='flex justify-between mt-2'>
          <span className='font-medium'>Order Id</span>
          <div className='flex flex-col'>
            <span>{order?.orderId}</span>
            <p className='text-xs text-center text-slate-500'>*copy code above</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default OrderDetail