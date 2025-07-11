import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password }).catch(() =>
      setError("Login failed. Please try again.")
    );
  };

  return (
    <div className={`modal${isOpen ? "modal_opened" : ""}`}>
      <ModalWithForm
        title="Log In"
        buttonText="Log in"
        disabled={!password}
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        contentClassName="modal__content modal__content--login"
        actions={
          <button
            type="button"
            className="modal__switch-button"
            onClick={onSwitchToRegister}
          >
            or Register
          </button>
        }
      >
        <label htmlFor="login-email" className="modal__label">
          Email
          <input
            type="email"
            className="modal__input"
            id="login-email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label htmlFor="login-password" className="modal__label">
          Password
          <input
            type="password"
            className="modal__input"
            id="login-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <span className="modal__error">{error}</span>}
        </label>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;
