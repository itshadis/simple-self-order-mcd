function Card({img, name}) {

  return (
    <div className="h-[150px] w-[150px] lg:w-[200px] lg:h-auto flex flex-col items-center justify-center  bg-slate-100 rounded p-2 hover:cursor-pointer hover:bg-red-600 group">
      <img className="w-20 lg:w-40" src={img} alt={img} />
      <p className="text-center text-sm font-medium mt-1 group-hover:text-white">{name}</p>
    </div>
  )
}

export default Card;