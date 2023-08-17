import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Button, Modal } from 'flowbite-react';

const baseURL = import.meta.env.VITE_BASE_URL;

function DetailOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState();
  const [openModal, setOpenModal] = useState(null);
  const props = { openModal, setOpenModal };
  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const getData = await axios.get(`${baseURL}/orders/${id}`);
      return setOrder(getData.data.data);
    }

    getOrders();
  }, [id]);

  const handleConfirm = (e) => {
    e.preventDefault();

    const putOrder = async () => {
      const getData = await axios.put(`${baseURL}/orders/payment/${id}`);
      return setOrderStatus(getData.data.data);
    }

    putOrder();
    setOpenModal(undefined);
    navigate('/cashier');
  }

  return (
    <>
      <Link to={'/'} className='absolute text-white font-medium bg-emerald-500 py-2 px-4 rounded left-2 top-2 hover:bg-emerald-600'>Customer Side</Link>

      <main className="relative w-[50%] h-screen flex flex-col mx-auto justify-center">
        <h4 className='w-full mx-auto text-lg font-medium mb-2'>Order Detail</h4>
        <div className="w-full mx-auto h-[80%] p-10 border border-black rounded mb-2 overflow-auto">
          <Link to={'/cashier'} className="absolute font-medium bg-yellow-300 py-2 px-4 rounded hover:bg-slate-300 bottom-16 right-4">Back</Link>
          {order? (
            <>
              <h2 className='font-medium'>Order ID : <span className='text-base font-normal'>{order.orderId}</span>
              </h2>
              <h2 className='font-medium'>Menu</h2>
              {order.menu.map((item, i) => (
                <div key={i} className='flex gap-2 justify-between mb-4'>
                  <p>{item.name}</p>
                  <div className='flex gap-5 items-center'>
                    <span>{item.qty}x</span>
                    <p className='w-10'>{item.qty * item.price}</p>
                  </div>
                </div>
              ))}
              <hr />
              <div className='my-2'>
                <div className='flex justify-between'>
                  <h2 className='font-medium mb-2'>Total</h2>
                  <span>Rp. {order.totalPrice}</span>
                </div>
                <div className='flex justify-between'>
                  <h2 className='font-medium'>Status Payment</h2>
                  <span className='font-medium'>{order.paymentStatus ? 'Complete' : 'Pending'}</span>
                </div>
                
              </div>
              <hr />
              {order.paymentStatus ? null : (
                <button onClick={() => {setOpenModal('default')}} className='text-white py-2 px-4 bg-red-600 rounded hover:bg-red-700 active:bg-red-800 mt-4 font-medium'>Confirm Payment</button>
              )}
            </>
          ) : (
            null
          )}

          <Modal size={'sm'} show={props.openModal === 'default'} onClose={() => props.setOpenModal(undefined)}>
            <Modal.Body>
              <div className="space-y-6 mb-8">
                <p className='text-center'>Confirm this order payment?</p>
              </div>
              <div className='flex gap-5 justify-center'>
                <Button className='bg-red-600' onClick={handleConfirm}>I accept</Button>
                <Button color="gray" onClick={() => props.setOpenModal(undefined)}>
                  Decline
                </Button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </main>
    </>
  )
}

export default DetailOrder;