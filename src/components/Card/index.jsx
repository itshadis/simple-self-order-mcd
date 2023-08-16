function Card({img, name}) {

  return (
    <div className="w-[200px] flex flex-col items-center bg-slate-100 rounded p-2 hover:cursor-pointer hover:bg-red-600 group">
      <img className="w-40" src={img} alt={img} />
      <p className="text-center font-medium mt-1 group-hover:text-white">{name}</p>
    </div>
  )
}

export default Card;