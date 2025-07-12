import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  // Debug logs
  console.log("All clothing items:", clothingItems);
  console.log("current weather type:", weatherData.type);
  console.log(
    "Filtered items:",
    clothingItems.filter((item) => item.weather === weatherData.type)
  );

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        <p className="cards__text">
          Today is {""}
          {currentTemperatureUnit === "F"
            ? `${weatherData.temp.F}°F`
            : `${Math.round(weatherData.temp.C)}°C`}
          {""}/ You may want to wear:
        </p>

        <ul className="cards__list">
          {clothingItems.map((item) => (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
