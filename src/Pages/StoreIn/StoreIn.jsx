import { useContext, useEffect, useState } from "react";
import { ItemContext } from "../../Provider/ItemProvider";


const StoreIn = () => {
    const currentDate = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    const formattedDate = currentDate.toLocaleString('en-US', options);

    const [product, setProduct] = useState('');
    const [inHistory, setInHistory] = useState();
    const { items } = useContext(ItemContext);
    const searchItem = items?.find(data => data.name === product);
    const itemName = searchItem?.name;
    useEffect(() => {
        fetch(`http://localhost:5000/inHistory/`)
            .then(res => res.json())
            .then(data => setInHistory(data))
    }, [searchItem])
    const handleUpdate = e => {
        e.preventDefault();
        const from = e.target;
        const qnt = parseInt(from.qnt.value);
        const type = from.type.value;
        const storeInItem = {
            qnt,
            itemName,
            type,
            formattedDate
        }
        fetch(`http://localhost:5000/history/`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(storeInItem)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);

            })
        document.getElementById('myForm').reset();
    }
    return (
        <div className="mt-3 md:flex justify-around">
            <form onSubmit={handleUpdate} id="myForm" className="shadow-md p-2 mb-6">
                <h1 className="text-blue-400 font-bold text-xl mb-3">Add item in store</h1>
                <div className="">
                    <div>
                        <input onChange={(event) => setProduct(event.target.value)} type="text" required className="border border-blue-500 mb-3 outline-none p-1 w-full" name="search" id="search" placeholder="Search by name.Don't spelling mistake." />
                    </div>
                    <div className="flex justify-center items-center mb-3 gap-2">
                        <div>
                            <img className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] md:mx-auto border border-blue-500" src={searchItem?.photo} alt="loading" />
                            <p className="font-bold "><span className="text-lg">Name: </span>{searchItem?.name}</p>
                        </div>
                        <div className="">
                            <input type="number" name="qnt" id="qnt" required placeholder="New quantity " className="border border-blue-500 outline-none text-lg font-bold px-2 w-1/2 md:w-[150px] h-[100px] " />
                            <p>
                                <input type="text" className="border  border-blue-500 outline-none px-2 mt-2 w-1/2 md:w-[150px]" name="type" id="type" placeholder="order type (kg,pkt)" required />
                            </p>
                        </div>
                    </div>
                    <div >
                        <input className="cursor-pointer w-full bg-blue-500 text-white py-2" type="submit" value="Add in store" />
                    </div>
                </div>
            </form>
            <div className="md:w-1/2  shadow-md p-2">
                <div className="flex justify-between  border-b-blue-500 border-b">
                    <h1 className="text-blue-400 font-bold text-xl mb-3">StoreIn History</h1>
                    <button className="cursor-pointer  bg-blue-500 text-white p-1">Delete History</button>
                </div>
                <div>
                    <div className="overflow-x-auto mt-3">
                        <table className="table text-center">
                            {/* head */}
                            <thead className="bg-blue-300 text-blue-600">
                                <tr>
                                    <th>#</th>
                                    <th>Product name</th>
                                    <th>Quantity</th>
                                    <th>StoreIn Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    inHistory?.map((data, i) => <tr
                                        key={i}
                                        data={data}
                                    >
                                        <th>{i+1}</th>
                                        <td>{data?.itemName}</td>
                                        <td>{data?.qnt}<small>{data?.type}</small></td>
                                        <td className="">{data?.formattedDate}</td>
                                    </tr>)
                                }
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StoreIn;