import { useContext } from "react";
import { ItemContext } from "../../Provider/ItemProvider";
import Item from "../Item/Item";
import empty from "../../assets/empty.png";

const OrderItems = () => {
    const { orderItem, items } = useContext(ItemContext);
    return (
        <>
            {orderItem?.length === 0 && <div className="flex justify-center items-center md:h-[90vh]">
                <div className="mt-6">
                <img className="w-[200px] mx-auto" src={empty} alt="empty img" />
                <h1 className="font-bold text-2xl md:text-4xl text-blue-400">No order for restaurant</h1></div>
            </div>}
        <div className="mt-3 grid gap-6 grid-cols-2  md:grid-cols-6">
            {
                orderItem?.map(item => <Item
                    key={item._id}
                    item={item}
                ></Item>)
                
            }
            
        </div></>
    );
};

export default OrderItems;