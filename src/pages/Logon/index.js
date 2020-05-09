import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import api from "../../services/api";

import "./style.css";

import logoImg from "../../assets/logo.png";
import fundoImg from "../../assets/fundo.png";

export default function Logon() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function handleLogin(e) {
    e.preventDefault(); //evitar carregamento da página

    try {
      const response = await api.post("sessions", {
        email: email,
        password: password,
      });

      localStorage.setItem("restaurantEmail", email);
      localStorage.setItem("restaurantId", response.data.user.id);
      localStorage.setItem("restaurantName", response.data.user.name);
      localStorage.setItem("restaurantToken", response.data.token);
      history.push("/profile");
    } catch (err) {
      alert("Falha no login");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img className="logo" src={logoImg} alt="Restaurant" />

        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link className="back-link" to="/register">
            <FiLogIn size={16} color="#fff" />
            <span>Não tenho cadastro</span>
          </Link>
        </form>
      </section>

      <img className="fundo" src={fundoImg} alt="fundo" />
    </div>
  );
}
