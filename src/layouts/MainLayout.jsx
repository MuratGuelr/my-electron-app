import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <ToastContainer
        transition={Slide}
        position="bottom-center"
        autoClose={1000}
        limit={3}
        pauseOnHover={true}
        newestOnTop={true}
        closeOnClick={false}
        closeButton={false}
        hideProgressBar={true}
        className="custom-toast"
      />
    </>
  );
};

export default MainLayout;
