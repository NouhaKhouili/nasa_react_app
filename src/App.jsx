import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    const today = new Date().toDateString();
    const localKey = `NASA-${today}`;

    // Check if data exists in localStorage
    const cachedData = localStorage.getItem(localKey);
    if (cachedData) {
      setData(JSON.parse(cachedData));
      console.log("fetched from cache today");
    } else {
      // Fetch data from API
      async function fetchAPIData() {
        const url =
          "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;
        try {
          const res = await fetch(url);
          const apiData = await res.json();
          // Save data to localStorage
          localStorage.setItem(localKey, JSON.stringify(apiData));
          setData(apiData);
          console.log("Data\n", apiData);
        } catch (error) {
          console.log(error.message);
        }
      }
      fetchAPIData();
    }
  }, [NASA_KEY]); // useEffect dependency

  function handleToggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      {showModal && (
        <SideBar data={data} handleToggleModal={handleToggleModal} />
      )}
      {data ? (
        <Main data={data} />
      ) : (
        <div className="loadingState">
          <i className="fa-solid fa-gear"></i>
        </div>
      )}
      {data && <Footer data={data} handleToggleModal={handleToggleModal} />}
    </>
  );
}

export default App;
