import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

function Main({ weatherData, handleCardClick, clothingItems, onCardLike }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

  return (
    <main>
      <WeatherCard weatherData={weatherData} />

      <section className="cards">
        {weatherData && weatherData.temp ? (
          <p className="cards__text">
            Today is {""}
            {currentTemperatureUnit === "F"
              ? weatherData.temp.F
              : weatherData.temp.C}
            {""}
            &deg; {currentTemperatureUnit}/ You may want to wear:
          </p>
        ) : null}
        <ul className="cards__list">
          {clothingItems && clothingItems.length === 0 && (
            <p>No clothing items found.</p>
          )}
          {clothingItems && weatherData && clothingItems.map((item) => (
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
