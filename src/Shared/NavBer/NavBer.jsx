import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.jpg';
const NavBer = () => {
    const listItems = <>
        <NavLink to=""
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-600" : "font-bold"
            }><a className='px-2 text-lg'>Store In</a></NavLink>
        <NavLink to=""
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-600" : "font-bold"
            }><a className='px-2 text-lg'>Store Out</a></NavLink>
        <NavLink to=""
            className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-600" : "font-bold"
            }><a className='px-2 text-lg'>Add item</a></NavLink>
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
                    <a className="normal-case text-2xl font-bold ">PR-Store</a>
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