import { useContext} from "react";
import { ItemContext } from "../../Provider/ItemProvider";
import empty from "../../assets/empty.png";
import logo from "../../assets/logo.jpg";
import { AiFillPrinter } from "react-icons/ai";
const OrderItems = () => {
    const { orderItem, formattedDate } = useContext(ItemContext);
    const handlePrint = () => {
        const contentToPrint = document.getElementById('print-content');
        window.print(contentToPrint)
      };
    return (
        <>
            
            {orderItem?.length === 0 && <div className="flex justify-center items-center md:h-[90vh]">
                <div className="mt-6">
                    <img className="w-[200px] mx-auto" src={empty} alt="empty img" />
                    <h1 className="font-bold text-2xl md:text-4xl text-blue-400">No order for restaurant</h1></div>

            </div>}

            <div id="print-content"  className="overflow-x-auto md:w-1/2 mx-auto mt-3">
                <div className="text-center leading-none mb-2 ">
                    <h1 className="text-xl font-bold">Hotel ProgatiInn ltd</h1>
                    <div className="flex justify-center font-semibold my-2 items-center gap-2">
                        <img src={logo} className="h-10 w-10 " alt="logo" />
                        <h2 className="">Restaurant order for store</h2>
                        <p>{formattedDate}</p>
                        <button  onClick={handlePrint}><AiFillPrinter className="hide-on-print h-10 w-10 text-blue-900" /></button>
                    </div>
                </div>
                <table  className="table text-center md:border   border-blue-500 border-t-0 font-bold">
                    {/* head */}
                    <thead className="bg-blue-300 md:text-lg  text-blue-600">
                        <tr>
                            <th>#</th>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Check</th>
                        </tr>
                    </thead>

                    <tbody>
                        <>

                            {
                                orderItem?.map((data, i) => <tr
                                    key={i}
                                    data={data}
                                >

                                    <th>{i + 1}</th>
                                    <td>{data?.name}</td>
                                    <td>{data?.qnt}<small>{data?.type}</small></td>
                                    <td>
                                        <input type="checkbox" name="checkbox" />
                                    </td>
                                </tr>)
                            }

                        </>
                    </tbody>

                </table>
            </div>
        </>
    );
};

export default OrderItems;