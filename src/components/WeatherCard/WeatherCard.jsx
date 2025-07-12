import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function WeatherCard({ weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  console.log("=== WEATHERCARD DEBUG ===");
  console.log("weatherData received:", weatherData);
  console.log("weatherData.temp:", weatherData?.temp);
  console.log("currentTemperatureUnit:", currentTemperatureUnit);

  if (!weatherData || !weatherData.temp) {
    return (
      <section className="weather-card">
        <p className="weather-card__temp">Loading weather...</p>
        <div className="weather-card__placeholder">
          <p>Getting weather data...</p>
        </div>
      </section>
    );
  }

  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  let weatherOption;
  if (filteredOptions.length === 0) {
    weatherOption = defaultWeatherOptions[weatherData.isDay ? "day" : "night"];
  } else {
    weatherOption = filteredOptions[0];
  }

  const tempF = Math.round(weatherData.temp.F);
  const tempC = Math.round(weatherData.temp.C);

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? weatherData.temp.F
          : weatherData.temp.C}{" "}
        &deg; {currentTemperatureUnit}
      </p>
      <img
        src={weatherOption?.url}
        alt={`Card showing ${weatherOption?.day ? "day" : "night"}time ${
          weatherOption?.condition
        } weather`}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
