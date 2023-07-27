import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
import { useContext } from 'react';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { ItemContext } from '../../Provider/ItemProvider';
const NavBer = () => {
    const {items,orderItem } = useContext(ItemContext);
    
    const listItems = <>
        <NavLink to="/home"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-400 font-bold" : "font-bold text-gray-600"
            }><a className='px-2 text-lg  border-e-2 border-blue-500'>Home</a></NavLink>
        <NavLink to="/storeIn"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-400 font-bold" : "font-bold text-gray-600"
            }><a className='px-2 text-lg border-e-2 border-blue-500'>Store In</a></NavLink>
        <NavLink to=""
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-400 font-bold" : "font-bold text-gray-600"
            }><a className='px-2 text-lg border-e-2 border-blue-500'>Store Out</a></NavLink>
        <NavLink to="/addItems"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-400 font-bold" : "font-bold text-gray-600"
            }><a className='px-2 text-lg border-e-2 border-blue-500'>Add item</a></NavLink>
        <NavLink to="/orderItems"
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-400 font-bold" : "font-bold text-gray-600"
            }><a className='px-2 text-lg pt-1 flex items-center justify-center'><AiOutlineShoppingCart /> <sup className='text-rose-600 font-bold'>{orderItem.length}</sup></a></NavLink>
    </>
    return (
        <div>
            <div className="navbar lg:flex justify-between shadow-lg">
                <div className="navbar-start flex gap-6 md:gap-1">
                    <div className="dropdown ">
                        <label tabIndex={0} className="">
                            <img className="h-10 w-10 " src={logo} alt="" />
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2  rounded-box w-52 lg:hidden">
                            {listItems}
                        </ul>
                    </div>
                    <a className="normal-case text-2xl text-gray-600 font-bold ">PR-Store</a>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal  px-1">
                        {listItems}
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default NavBer;