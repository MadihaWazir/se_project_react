import React, { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import "./EditProfileModal.css";

function EditProfileModal({ isOpen, onClose, onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const isSubmitDisabled = !name;

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfile({ name, avatar });
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
      <label className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          id="profile-avatar"
          placeholder="Avatar URL"
          onChange={(e) => setAvatar(e.target.value)}
          value={avatar}
        />
      </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;
