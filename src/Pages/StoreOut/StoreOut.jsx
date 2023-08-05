import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ItemContext } from "../../Provider/ItemProvider";
import empty from "../../assets/empty.png";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const StoreOut = () => {
    const [product, setProduct] = useState('');
    const [outHistory, setOutHistory] = useState();
    const [warning, setWarning] = useState(' ');
    const { items, handleDelete, formattedDate } = useContext(ItemContext);

    const searchItem = items?.find(data => data.name === product);
    const itemName = searchItem?.name;
    useEffect(() => {
        fetch(`https://pr-store-server.vercel.app/outHistory/`)
            .then(res => res.json())
            .then(data => setOutHistory(data))
    }, [searchItem])
    const handleUpdate = e => {
        e.preventDefault();
        const from = e.target;
        const qnt = parseInt(from.qnt.value);
        const type = from.type.value;
        const storeOutItem = {
            qnt,
            itemName,
            type,
            formattedDate
        }
        // New quantity
        const newQnt = parseInt(searchItem?.quantity) - qnt;

        const updatedQuantity = {
            newQnt
        }
        const id = searchItem?._id;
        // Set outStore item in history 
        if (qnt <= searchItem?.quantity) {
            setWarning(' ')
            fetch(`https://pr-store-server.vercel.app/storeOutHistory/`, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(storeOutItem)
            })
                .then(res => res.json())
                .then(data => {


                })
            // Update product quantity
            fetch(`https://pr-store-server.vercel.app/storeOut/${id}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(updatedQuantity)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.acknowledged) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: `Updated ${itemName} quantity`,
                            showConfirmButton: false,
                            timer: 1000
                        })
                    }

                })
        } else {
            setWarning("Don't have this much product in your store!")
        }

        document.getElementById('myForm').reset();
    }
    return (
        <>
            <div className="mt-3 md:flex justify-around">
                <form onSubmit={handleUpdate} id="myForm" className="shadow-md p-2 mb-6">
                    <h1 className="text-green-400 font-bold text-xl mb-3">Out items from store</h1>
                    <div className="">
                        <div>
                            <input onChange={(event) => setProduct(event.target.value)} type="text" required className="border border-green-500 mb-3 outline-none p-1 w-full" name="search" id="search" placeholder="Search by name.Don't spelling mistake." />
                        </div>
                        <div className="flex justify-center items-center mb-3 gap-2">
                            <div>
                                <img className="w-[100px] h-[100px] md:w-[200px] md:h-[200px] md:mx-auto border border-green-500" src={searchItem?.photo} alt="loading" />
                                <p className="font-bold "><span className="text-lg">Name: </span>{searchItem?.name}</p>
                                <p className="font-semibold text-md"><span className="text-lg">In store: </span>{searchItem?.quantity}{searchItem?.type}</p>
                                <small className="text-red-500 font-bold italic">{warning}</small>
                            </div>
                            <div className="">
                                <input type="number" name="qnt" id="qnt" required placeholder="New quantity " className="border border-green-500 outline-none text-lg font-bold px-2 w-1/2 md:w-[150px] h-[100px] " />
                                <p>
                                    <input type="text" defaultValue={searchItem?.type} className="border  border-green-500 outline-none px-2 mt-2 w-1/2 md:w-[150px]" name="type" id="type" placeholder="order type (kg,pkt)" required />
                                </p>
                            </div>
                        </div>
                        <div >
                            <input className="cursor-pointer w-full bg-green-500 text-white py-2" type="submit" value="Out from store" />
                        </div>
                    </div>
                </form>
                <div className="md:w-1/2 shadow-md p-2">
                    <div className="flex justify-between  border-b-green-500 border-b">
                        <h1 className="text-green-400 font-bold text-xl mb-3">Store out History</h1>
                        <button onClick={() => handleDelete('deleteOutHistory')} className="cursor-pointer  bg-green-500 text-white p-1">Delete History</button>
                    </div>
                    <div>
                        <div className="overflow-x-auto h-[60vh]  mt-3">
                            {outHistory?.length === 0 ? <div className="">
                                <div className="mt-6 mx-auto w-full ">
                                    <img className="w-[100px] mx-auto" src={empty} alt="empty img" />
                                    <h1 className="font-bold text-2xl text-center text-green-400">No history available</h1></div>
                            </div> : <table className="table text-center">
                                {/* head */}
                                <thead className="bg-green-300 text-green-600">
                                    <tr>
                                        <th>#</th>
                                        <th>Product name</th>
                                        <th>Quantity</th>
                                        <th>Store out Date</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    <>

                                        {
                                            outHistory?.map((data, i) => <tr
                                                key={i}
                                                data={data}
                                            >

                                                <th>{i + 1}</th>
                                                <td>{data?.itemName}</td>
                                                <td>{data?.qnt}<small>{data?.type}</small></td>
                                                <td className="">{data?.formattedDate}</td>
                                            </tr>)
                                        }

                                    </>
                                </tbody>

                            </table>}
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer className="absolute top-0 right-0" />
        </>
    );
};

export default StoreOut;