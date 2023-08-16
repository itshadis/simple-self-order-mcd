import { useContext, useEffect, useState } from "react"
import { OrderContext } from "../App"
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderDetail from "../components/OrderDetail";

const baseURL = import.meta.env.VITE_BASE_URL;
const imgURL = import.meta.env.VITE_IMG_URL;

function Order() {
  const { state, dispatch } = useContext(OrderContext);
  const [checkout, setCheckout] = useState(false);
  const [orderId, setOrderId] = useState();
  const navigate = useNavigate();

  const handleRemoveClick = (order) => {
    dispatch({
      type: "REMOVE_FROM_ORDER",
      payload: order
    })
  }

  const handleCheckout = () => {
    axios.post(`${baseURL}/orders/create`, state)
      .then(res => {
        if(res.status != 201) {
          return setCheckout(false);
        }
        
        setOrderId(res.data.data.orderId);
        setCheckout(true);
      })
    }

    const handleDone = (e) => {
      e.preventDefault();

      navigate('/');
      location.reload();
    }

  return (
    <main className="w-[50%] h-screen flex flex-col mx-auto">
      <h1 className="text-5xl font-bold text-center py-6">Order Details</h1>
      <div className="flex flex-col justify-between border border-black rounded h-[80%]">
        <div className="flex flex-col gap-3 py-2 px-6 overflow-auto">
          {state.menu.length === 0 ? (
            <p className="text-lg font-medium text-center">You have not order yet...</p>
          ) : 
          checkout ? (
            <OrderDetail id={orderId} />
          ) : 
            state.menu?.map((order, i) => (
            <div key={i} className="flex items-center gap-2 border border-slate-400 p-2 rounded">
              <img className="w-24" src={imgURL+order.img} alt={imgURL+order.img} />
              <p className="text-lg flex-1">{order.name}</p>
              <div className="flex items-center gap-10">
                <span className="text-xl">{order.qty}x</span>
                <button onClick={() => handleRemoveClick(order)} className="text-lg text-white bg-red-600 p-2 rounded hover:bg-red-700"><img className="w-5" src="./trash.svg" alt="trash.svg" /></button>
              </div>
            </div>
          ))
          }
          
        </div>

        <div className="flex justify-between items-center bg-red-700 py-5 p-2">
          <div className="flex gap-2">
            <button onClick={checkout ? handleDone : handleCheckout} className="font-medium bg-white py-2 px-4 rounded hover:bg-slate-300 active:bg-slate-400 ">{checkout ? 'Done' : 'Checkout Order'}</button>
          </div>
          {checkout ? null : 
          (
            <Link to={'/'} className=" font-medium bg-yellow-300 py-2 px-4 rounded hover:bg-slate-300">Back</Link>
          )}
        </div>
      </div>
    </main>
  )
}

export default Order