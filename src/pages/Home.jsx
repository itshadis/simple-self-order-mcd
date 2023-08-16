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
      <Link to={'/cashier'} className='absolute text-white font-medium bg-emerald-500 py-2 px-4 rounded left-2 top-2 hover:bg-emerald-600'>Cashier Side</Link>
      <main className="w-[80%] h-screen flex flex-col mx-auto">
        <Header />
        <section className="relative flex gap-1 h-[75%]">
          <Link to={'/order'} className='absolute right-1 -top-12 bg-red-600 rounded py-2 px-6 text-white font-medium hover:bg-red-700'>Your Order</Link>

          <div className="p-2 border border-black rounded">
            <ul className='flex flex-col gap-2'>
              <p className='text-lg font-medium text-center mb-2'>Categories</p>
              {categories.map((item, i) => (
                <li key={i}>
                  <button className="bg-slate-200 rounded w-full py-2 px-10 text-lg hover:bg-slate-300 focus:bg-red-600 focus:text-white" onClick={() => setPath(item.path)}>{item.name}</button>
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