import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import Card from "../Card";
import { Button, Modal } from 'flowbite-react';
import { OrderContext } from "../../App";

const baseURL = import.meta.env.VITE_BASE_URL;
const imgURL = import.meta.env.VITE_IMG_URL;

function Category({path}) {
  const [menu, setMenu] = useState();
  const [openModal, setOpenModal] = useState(null);
  const props = { openModal, setOpenModal };
  const [detailMenu, setDetailMenu] = useState();
  const [totalItem, setTotalItem] = useState(null);
  const { dispatch } = useContext(OrderContext);
  
  useEffect(() => {
    const getAllMenu = async () => {
      const getData = await axios.get(`${baseURL}${path}`);
      return setMenu(getData.data.data);
    } 
    getAllMenu();
  }, [path]);

  const handleClick = (item) => {
   setDetailMenu(item);
   setOpenModal('default');
  }

  const handleSub = (e) => {
    e.preventDefault()
    if(totalItem <= 0) {
      return setTotalItem(0);
    }
    setTotalItem(totalItem - 1);
  }

  const handleAdd = (e) => {
    e.preventDefault()

    setTotalItem(totalItem + 1);
  }

  const handleClose = (e) => {
    e.preventDefault();
    setTotalItem(null)
    props.setOpenModal(undefined)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "ADD_TO_ORDER",
      payload: {
        name: detailMenu.name,
        price: detailMenu.price,
        img: detailMenu.img,
        qty: totalItem
      }
    })

    setTotalItem(null);
    props.setOpenModal(undefined);
  }

  return (
    <>
      <div className="w-full h-full grid grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-6 lg:p-2 border border-black rounded overflow-auto justify-items-center">
        {menu?.map((item, i) => (
          <button key={i}  onClick={() => handleClick(item)}>
            <Card img={imgURL+item.img} name={item.name} />
          </button>
        ))}
      </div>

      <Modal show={props.openModal === 'default'} onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <Modal.Header className="bg-red-600"><p className="text-white">{detailMenu?.name}</p></Modal.Header>
          <Modal.Body>
              <div className="space-y-6 flex gap-3">
                <div className="flex flex-col items-center justify-center gap-2">
                  <img className="w-32 lg:w-60" src={imgURL+detailMenu?.img} alt={detailMenu?.img} />
                  <div>
                    <p className="text-center mb-1">Order</p>
                    <div className="flex justify-center gap-5">
                      <button className="bg-slate-300 w-6 rounded hover:bg-slate-400" onClick={handleSub}>-</button>
                      <span className="text-lg">{totalItem? totalItem : 0 }</span>
                      <button className="bg-slate-300 w-6 rounded hover:bg-slate-400" onClick={handleAdd}>+</button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col flex-1 justify-around">
                  <p >{detailMenu?.desc}</p>
                  <span className="text-lg">Rp. {detailMenu?.price},00</span>
                </div>
              </div>
          </Modal.Body>
          <Modal.Footer>
            {totalItem === 0 || totalItem === null ? (
              <Button disabled className="bg-red-600">Add to Orders</Button>
              ) : (
              <Button type="submit" className="bg-red-600">Add to Orders</Button>
              )
              }
            <Button color="gray" onClick={handleClose}>
              Back
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  )
}

export default Category;