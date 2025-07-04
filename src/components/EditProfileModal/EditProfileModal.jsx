import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const isSubmitDisabled = !name || !email;

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, email });
    setName("");
    setEmail("");
  };

  return (
    <ModalWithForm
      title="Edit Profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
          minLength="1"
          maxLength="30"
          required
        />
      </label>
      <label htmlFor="email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
