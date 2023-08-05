
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';
const Item = ({ item }) => {
    const notify = () => toast("You don't have access to delete")
    const { name, photo, quantity, type, _id } = item;
    const key = import.meta.env.VITE_accessKey;
    const handleDelete = id => {
        const userKey = prompt('Please provide access key');
        if (key == userKey) {
            Swal.fire({

                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then((result) => {
                if (result.isConfirmed) {
                    fetch(`https://pr-store-server.vercel.app/deleteItem/${id}`, {
                        method: 'DELETE',
                        headers: { 'Content-type': 'application/json' },
                    })
                        .then(res => res.json())
                        .then(data => {


                        })
                    Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    )
                }

            })
        } else {
            notify();
        }

    }
    return (
        <div className=" shadow-md rounded text-center">
            <div className="mb-3 pt-1">
                <img className="w-[100px] h-[100px] mx-auto" src={photo} alt="loading" />
            </div>
            <p className="font-bold text-gray-600">{name}</p>
            {quantity < 4 ? <>
                <p className="font-semibold text-rose-600 pb-2">In store:  {quantity} {type}</p>
                {quantity == 0 && <RiDeleteBin6Line onClick={() => handleDelete(_id)} className='text-center w-full text-lg text-red-400 my-2 cursor-pointer' />}
            </> : <p className="font-semibold text-blue-400">In store:  {quantity} {type}</p>

            }
            <ToastContainer className="absolute top-0 right-0" />
        </div>
    );
};

export default Item;