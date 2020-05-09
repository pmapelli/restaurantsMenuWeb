import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
import api from "../../services/api";

import "./style.css";

import logoImg from "../../assets/logo.png";

export default function Profile() {
  const [menus, setMenus] = useState([]);
  const restaurantId = localStorage.getItem("restaurantId");
  const restaurantName = localStorage.getItem("restaurantName");
  const restaurantToken = localStorage.getItem("restaurantToken");

  const history = useHistory();

  useEffect(() => {
    api.get(`profile/${restaurantId}`).then((response) => {
      setMenus(response.data);
    });
  });

  async function handleDeleteMenu(id) {
    try {
      await api.delete(
        `menus/${id}`,
        {
          headers: {
            Authorization: "Bearer " + restaurantToken,
          },
        },
        [restaurantToken]
      );

      await Swal.fire({
        title: "Sucesso",
        text: "Produto excluído com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });

      setMenus(menus.filter((menu) => menu.id !== id));
    } catch (error) {
      Swal.fire({
        title: "Ops!",
        text: "Erro ao excluir, tente novamente. " + error,
        icon: "error",
        confirmButtonText: "OK",
      });
      return;
    }
  }
  function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Restaurants" />
        <span>Bem Vindo, {restaurantName}</span>
        <Link className="button" to="/register">
          Editar restaurante
        </Link>
        <Link className="button" to="/menu/new">
          Cadastrar novo lanche
        </Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#ea2041" />
        </button>
      </header>
      <h1>Cardápio Cadastrado</h1>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <strong>Lanche:</strong>
            <p>{menu.title}</p>

            <strong>DESCRIÇÃO:</strong>
            <p>{menu.description}</p>

            <strong>VALOR:</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(menu.value)}
            </p>

            <button onClick={() => handleDeleteMenu(menu.id)} type="button">
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
