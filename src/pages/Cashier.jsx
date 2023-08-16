import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';
import { Table } from 'flowbite-react'

const baseURL = import.meta.env.VITE_BASE_URL;

function Cashier() {
  const [orders, setOrders] = useState();
  const title = ['No', 'Order ID', 'Total Order', 'Total Prices', 'Status Payment'];
  let no = 1;

  useEffect(() => {
    const getOrders = async () => {
      const getData = await axios.get(`${baseURL}/orders`);
      return setOrders(getData.data.data);
    }

    getOrders();
  }, []);

  console.log(orders)

  return (
    <>
      <Link to={'/'} className='absolute text-white font-medium bg-emerald-500 py-2 px-4 rounded left-2 top-2 hover:bg-emerald-600'>Customer Side</Link>

      <main className="w-[80%] h-screen flex flex-col mx-auto justify-between">
        <Header />
        <div className="relative w-[80%] mx-auto h-[70%] p-4 border border-black rounded mb-2">
          <h4 className='absolute -top-7 left-1 text-lg font-medium'>List Orders</h4>

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
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                  <Table.Cell>
                    {order.paymentStatus ? (
                      <span className='py-2 px-4 text-white bg-red-600'>Unpaid</span>
                    ) : (
                      <span className='py-2 px-4 text-white bg-blue-600'>Paid</span>
                    )}
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

export default Cashier