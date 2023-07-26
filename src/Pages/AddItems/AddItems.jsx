import Swal from "sweetalert2";


const AddItems = () => {

    const handleSubmit = event => {
        event.preventDefault();
        const from = event.target;
        const name = from.name.value;
        const photo = from.photo.value;
        const quantity = parseInt(from.quantity.value);
        const type = from.type.value;
        const items = {
            name,photo,quantity,type
        }
        fetch(`http://localhost:5000/addItem`, {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(items)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Item added!',
                        showConfirmButton: false,
                        timer: 1000
                      })
                }
                document.getElementById("myForm").reset();
        })
    }
    return (
        <form onSubmit={handleSubmit} id="myForm" className="mt-6 md:w-2/3 mx-auto">
           
            <div className="pt-3 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <p>Product name</p>
                    <input className="border border-blue-600 rounded shadow-md outline-none my-2 p-2 w-full" type="text" placeholder="Name of the product" name="name" id="name" required />
                </div>
                <div>
                    <p>Image Link</p>
                    <input className="border  border-blue-600 rounded shadow-md  outline-none my-2 p-2 w-full" type="url" placeholder="Photo link" name="photo" id="photo" required />
                </div>
                <div>
                    <p>Quantity</p>
                    <input className="border  border-blue-600  rounded shadow-md outline-none my-2 p-2 w-full" type="number" placeholder="How many quantity" name="quantity" id="quantity" required />
                </div>
                <div>
                    <p>Product type </p>
                    <input className="border  border-blue-600 rounded shadow-md  outline-none my-2 p-2 w-full" type="text" placeholder="( Kg,pcs )" name="type" id="type" required />
                </div>
            </div>
            <div className="w-full ">
                <input className="border text-white font-semibold bg-blue-600 rounded shadow-md  outline-none my-2 px-3 py-1 cursor-pointer" type="submit" value="Add Item" />
            </div>
        </form>
    );
};

export default AddItems;