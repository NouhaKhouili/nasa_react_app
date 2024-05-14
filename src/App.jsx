import { useEffect, useState } from "react";
import Footer from "./components/Footer";
import Main from "./components/Main";
import SideBar from "./components/SideBar";

function App() {
  const NASA_KEY = import.meta.env.VITE_NASA_API_KEY;
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState(null);
  const [Loading, setLoading] = useState(false);

  const today = new Date().toDateString;
  const localKey = `NASA-${today}`;
  if (localStorage.getItem(localKey)) {
    const apiData = JSON.parse(localStorage.getItem(localKey));
    setData(apiData);
    console.log("ferched from cache today");
    return;
  }
  localStorage.clear();

  useEffect(() => {
    async function fetchAPIData() {
      const url =
        "https://api.nasa.gov/planetary/apod" + `?api_key=${NASA_KEY}`;
      try {
        const res = await fetch(url);
        const apiData = await res.json();
        localStorage.setItem(localKey, JSON.stringify(apiData));
        setData(apiData);
        console.log("ferched from API today");
        console.log("Data\n", apiData);
      } catch (error) {
        console.log(error.message);
      }
    }
    fetchAPIData();
  }, []);

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
