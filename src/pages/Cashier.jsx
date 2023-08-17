import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { Table } from 'flowbite-react'

const baseURL = import.meta.env.VITE_BASE_URL;

function Cashier() {
  const [input, setInput] = useState();
  const [orders, setOrders] = useState();
  const title = ['No', 'Order ID', 'Total Order', 'Total Prices', 'Status Payment', ''];
  let no = 1;

  const navigate = useNavigate();

  useEffect(() => {
    const getOrders = async () => {
      const getData = await axios.get(`${baseURL}/orders`);
      return setOrders(getData.data.data);
    }

    getOrders();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    navigate(`/order/${input}`)
  }

  return (
    <>
      <Link to={'/'} className='absolute text-white font-medium bg-emerald-500 py-1 lg:py-2 px-2 lg:px-4 rounded left-2 top-2 hover:bg-emerald-600'>Customer Side</Link>

      <main className="w-[95%] h-screen flex flex-col mx-auto lg:justify-between">
        <Header />
        <h4 className='w-full lg:w-[80%] mx-auto text-lg font-medium'>List Orders</h4>
        <div className="w-full lg:w-[80%] mx-auto h-[70%] p-4 border border-black rounded mb-2 overflow-auto">
          <form onSubmit={handleSearch} className='mb-2 flex gap-2'>
            <input onChange={(e) => setInput(e.target.value)} className='rounded-lg ' type="text" placeholder='Search Order ID' />
            <button className='font-medium py-2 px-4 bg-slate-400 rounded-lg hover:bg-slate-500' type='submit'>Search</button>
          </form>

          <Table>
            <Table.Head>
              {title.map((item, i) => (
                <Table.HeadCell key={i} className='bg-red-600 text-white'>
                {item}
              </Table.HeadCell>
              ))}
            </Table.Head>
            <Table.Body className="divide-y">
              {orders?.map((order, i) => (
                <Table.Row className="bg-white text-center dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {no++}
                  </Table.Cell>
                  <Table.Cell>
                    {order.orderId}
                  </Table.Cell>
                  <Table.Cell>
                    {order.menu.length}
                  </Table.Cell>
                  <Table.Cell>
                    {order.totalPrice}
                  </Table.Cell>
                  <Table.Cell className=''>
                    {order.paymentStatus ? (
                      <p className='py-2 text-white bg-blue-600 rounded text-center'>Complete</p>
                    ) : (
                      <p className='py-2 text-white bg-red-600 rounded text-center'>Pending</p>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Link to={`/order/${order.orderId}`} className='text-white bg-emerald-600 py-2 px-2 rounded hover:bg-emerald-700'>Detail</Link>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </main>
    </>
  )
}

export default Cashier;