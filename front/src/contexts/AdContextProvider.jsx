import { useContext, useState, useEffect } from "react";
import AdContext from "./AdContext";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AdContextProvider = ({ children }) => {
  const [ads, setAds] = useState([]);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchAds = async (searchTerm = "", sortColumn = "category_id") => {
      try {
        const params = {
          searchTerm,
          sortColumn,
        };
        const { data: response } = await axios.get(`${API_URL}/ads`, {
          params,
          withCredentials: true,
        });

        
          setAds(response.data);
       
      } catch (err) {
        setError(err.message || "Error fetching ads");
      }
    };

    fetchAds(searchTerm);
  }, [searchTerm]);

  const update = () => {
    window.location.reload();
  };

  return (
    <AdContext.Provider
      value={{
        ads,
        setAds,
        error,
        setError,
        searchTerm,
        setSearchTerm,
        showForm,
        setShowForm,
        update,
      }}
    >
      {children}
    </AdContext.Provider>
  );
};

export default AdContextProvider;
