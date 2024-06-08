import React, { useState } from "react";
import "./index.css";
const api = {
  key: "",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});
  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setQuery("");
          setWeather(result);
          console.log(result);
        });
    }
  };
  const dateBuilder = (d) => {
    //     let months = ["January", "February", "March", "April", "May", "June",
    //      "July", "August", "September", "October", "November", "December"];
    //  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday",
    //   "Friday", "Saturday"];

    let date = String(new window.Date());
    date = date.slice(3, 15);

    return date;
  };
  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 18
            ? "app hot"
            : "app cold"
          : "app"
      }
    >
      <main>
        <div className="search-value">
          <input
            type="text"
            className="search-bar"
            placeholder="Search here...."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>

        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-value">
              <div className="location">
                {weather.name},{weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-value">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default App;
