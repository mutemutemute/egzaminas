import Navbar from "./Navbar";
import Ads from "./Ads";
import { useContext } from "react";
import AddAdvertisement from "./AddAdvertisement";
import AdContext from "../contexts/AdContext";
import UserContext from "../contexts/UserContext";
import { FaPlus } from "react-icons/fa";

const Home = () => {
  const { showForm, setShowForm } = useContext(AdContext);
  const { user } = useContext(UserContext);
  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-6">
        {user?.role === "user" && (
          <>
            <button
              onClick={() => setShowForm((prev) => !prev)}
              className="bg-[#42416f] text-white flex justify-center items-center px-6 py-1.5 rounded-md shadow-md w-80 md:w-1/2"
            >
              <FaPlus /> Add Advertisement
            </button>
            {showForm && (
              <div className="mt-6 p-6 bg-white rounded-lg shadow-lg w-80 md:w-1/2">
                <AddAdvertisement />
              </div>
            )}
          </>
        )}
        <div>
          <Ads />
        </div>
      </div>
    </>
  );
};

export default Home;
