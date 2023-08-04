import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import Axios from "axios";
const KEY = "d1374b8438cfcca57e19e0d4d9c7e7fd";
// const WeatherStack = "5ce14377af1cfc16f437834f5787f1b9";
function App() {
  const [value, setValue] = useState({});
  const [city, setCity] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function handleChange(e) {
    setCity(e.target.value);
    if (city === "") setValue({});
  }
  useEffect(() => {
    function callback(e) {
      if (e.key === "Enter") {
        fetchData();
      }
    }
    document.addEventListener("keydown", callback);

    return () => {
      document.removeEventListener("keydown", callback);
    };
  });

  const fetchData = async () => {
    try {
      if (value) setValue({});
      setIsLoading(true);
      if (!city) return;
      const res = await Axios.get(
        `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${KEY}`
      );
      // if (!res.ok) throw new Error("Something Went Wrong !! Try Again");

      setValue(res.data);
      setIsLoading(false);
    } catch (err) {
      setError("Sorry,Your City is Not Found");
    }
  };

  return (
    <div className="container">
      <div className="box-1">
        <h1>Weather in</h1>
        <input
          type="text"
          placeholder="Enter Your City.."
          value={city}
          onChange={handleChange}
        />
        <button onClick={fetchData}>Search</button>
      </div>

      <div className="box-2">
        {value.name && (
          <>
            {" "}
            <div className="city">
              <p>{value && value?.name}</p>
              <label>...</label>
            </div>
            <div className="degree-clouds">
              <div className="degree">
                <p>{value.main?.temp}°C</p>
              </div>
              <div className="few">
                <p className="p">{value.weather?.[0].description}</p>
                <p>Max:{value.main?.temp_max}°C</p>
                <p>Min:{value.main?.temp_min}°C</p>
              </div>
            </div>
            <div className="end">
              <div className="feels">
                <p className="feels-degree">{value.main?.feels_like}°C</p>
                <p className="content">Feels Like</p>
              </div>
              <div className="humidity">
                <p className="feels-degree">{value.main?.humidity}%</p>
                <p className="content">Humidity</p>
              </div>
            </div>
          </>
        )}
        {!value.name && !error && !isLoading && (
          <div className="value-not">Search Your City.....</div>
        )}
        {error && !value.name && <div>{error}</div>}
        {isLoading && !error && !value.name && (
          <div>
            <p>Searching</p>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
