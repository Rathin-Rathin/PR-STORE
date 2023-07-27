

const Item = ({item}) => {
    const { name, photo, quantity, type } = item;
   
    return (
        <div className=" shadow-md rounded text-center">
            <div className="mb-3 pt-1">
                <img className="w-[100px] h-[100px] mx-auto" src={photo} alt="loading" />
            </div>
            <p className="font-bold text-gray-600">{name}</p>
            {quantity < 5 ? <>
                <p className="font-semibold text-yellow-400">In store:  {quantity} {type}</p><marquee className="text-red-500 mx-2">please order me</marquee></> : <p className="font-semibold text-blue-400">In store:  {quantity} {type}</p>}
        </div>
    );
};

export default Item;