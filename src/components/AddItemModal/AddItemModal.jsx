import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import React from "react";
import { useState, useEffect } from "react";

export default function AddItemModal({
  onClose,
  isOpen,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weather, setWeather] = useState("");
  const isSubmitDisabled = !name || !imageUrl || !weather;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, imageUrl, weather });
  };

  useEffect(() => {
    setName("");
    setImageUrl("");
    setWeather("");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          minLength="1"
          maxLength="30"
          required
        />
      </label>

      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
          required
        />
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>
        <div className="modal__radio-button">
          <input
            id="hot"
            type="radio"
            name="weathertype"
            className="modal__radio-input"
            value="hot"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />
          <label className="modal__radio-label" htmlFor="hot">
            Hot
          </label>
        </div>

        <div className="modal__radio-button">
          <input
            id="warm"
            type="radio"
            name="weathertype"
            className="modal__radio-input"
            value="warm"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />
          <label className="modal__radio-label" htmlFor="warm">
            Warm
          </label>
        </div>
        <div className="modal__radio-button">
          <input
            id="cold"
            type="radio"
            name="weathertype"
            className="modal__radio-input"
            value="cold"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />
          <label className="modal__radio-label" htmlFor="cold">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
