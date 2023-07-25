import { Outlet } from "react-router-dom";
import NavBer from "../../Shared/NavBer/NavBer";
import Footer from "../../Shared/Footer/Footer";


const Home = () => {
    return (
        <div className="max-w-7xl mx-auto px-2 md:px-4">
            <NavBer />
            <Outlet />
            <Footer/>
        </div>
    );
};

export default Home;