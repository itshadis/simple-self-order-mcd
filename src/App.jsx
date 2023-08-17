import { Routes, Route } from 'react-router-dom';
import Cashier from './pages/Cashier';
import DetailOrder from './pages/DetailOrder';
import Home from './pages/Home';
import Order from './pages/Order';
import { createContext, useReducer } from 'react';
import { initialState, orderReducer } from './context/orderReducer';

export const OrderContext = createContext()

function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  
  return (
    <OrderContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/cashier' element={ <Cashier /> } />
        <Route path='/order' element={ <Order /> } />
        <Route path='/order/:id' element={ <DetailOrder /> } />
      </Routes>
    </OrderContext.Provider>
  )
}

export default App
