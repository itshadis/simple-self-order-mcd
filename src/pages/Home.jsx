import React, { useState } from 'react';
import Header from '../components/Header';
import Menu from '../components/Menu';
import { Link } from 'react-router-dom';

function Home() {
  const [path, setPath] = useState('/menu')
  
  const categories = [
    {
      name: 'All Menu',
      path: '/menu'
    },
    {
      name: 'Meals',
      path: '/menu/category/meals'
    },
    {
      name: 'Beverages',
      path: '/menu/category/beverages'
    },
    {
      name: 'Dessert',
      path: '/menu/category/dessert'
    },
    {
      name: 'Snack',
      path: '/menu/category/snack'
    },
  ]

  return (
    <>
      <Link to={'/cashier'} className='absolute text-white font-medium bg-emerald-500 py-1 lg:py-2 px-2 lg:px-4 rounded left-2 top-2 hover:bg-emerald-600'>Cashier Side</Link>
      <main className="w-[90%] lg:w-[80%] h-screen flex flex-col mx-auto">
        <Header />
        <section className="relative flex flex-col lg:flex-row gap-1 h-[75%]">
          <Link to={'/order'} className='absolute right-1 -top-8 lg:-top-12 bg-red-600 rounded py-1 lg:py-2 px-2 lg:px-6 text-white text-sm lg:text-base font-medium hover:bg-red-700'>Your Order</Link>

          <div className="p-2 border border-black rounded">
            <ul className='flex lg:flex-col gap-2 flex-wrap'>
              <p className='hidden lg:block text-lg font-medium text-center mb-2'>Categories</p>
              {categories.map((item, i) => (
                <li key={i}>
                  <button className="bg-slate-200 rounded lg:w-full lg:py-2 px-4 lg:px-10 lg:text-lg hover:bg-slate-300 focus:bg-red-600 focus:text-white" onClick={() => setPath(item.path)}>{item.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <Menu path={path} />
        </section>
      </main>
    </>
  )
}

export default Home