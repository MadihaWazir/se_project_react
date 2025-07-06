import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

const LoginModal = ({ isOpen, onClose, onLogin, onSwitchToRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <ModalWithForm
        title="Log In"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleLogin}
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
        </label>
        <div className="modal__actions">
          <button
            type="submit"
            className="modal__submit"
            disabled={!email || !password}
          >
            Log in
          </button>
          <button
            type="button"
            className="modal__switch-button"
            onClick={onSwitchToRegister}
          >
            or Register
          </button>
        </div>
      </ModalWithForm>
    </div>
  );
};

export default LoginModal;
