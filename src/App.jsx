import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cashier from './pages/Cashier';
import { createContext, useReducer } from 'react';
import { initialState, orderReducer } from './context/orderReducer';
import Order from './pages/Order';

export const OrderContext = createContext()

function App() {
  const [state, dispatch] = useReducer(orderReducer, initialState);
  
  return (
    <OrderContext.Provider value={{state, dispatch}}>
      <Routes>
        <Route path='/' element={ <Home /> } />
        <Route path='/cashier' element={ <Cashier /> } />
        <Route path='/order' element={ <Order /> } />
      </Routes>
    </OrderContext.Provider>
  )
}

export default App
