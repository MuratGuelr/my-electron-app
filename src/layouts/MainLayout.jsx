import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import AppURLTaker from "../components/AppURLTaker";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <AppURLTaker /> */}
      <ToastContainer
        transition={Slide}
        position="bottom-center"
        autoClose={1000}
        limit={3}
        pauseOnHover={true}
        newestOnTop={true}
        closeOnClick
        closeButton={false}
        hideProgressBar={true}
        theme="light"
        className="custom-toast"
        draggable={true}
      />
    </>
  );
};

export default MainLayout;
