import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Form } from "@unform/web";
import Input from "../../components/Input";
import TextArea from "../../components/TextArea";
import api from "../../services/api";
import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";
import "./style.css";

import logoImg from "../../assets/logo.png";

export default function NewMenu() {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [value, setValue] = useState();
  const history = useHistory();
  const restaurantToken = localStorage.getItem("restaurantToken");

  async function handleNewMenu(data) {
    const { title, description, value } = data;

    try {
      if (title === "" || description === "" || value === "") {
        Swal.fire({
          title: "Ops!",
          text: "Todos os campos são obrigatórios!",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      if (isNaN(value) || value < 1) {
        Swal.fire({
          title: "Ops!",
          text: "O valor tem que ser maior do que zero.",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      await api.post("menus", data, {
        headers: {
          Authorization: "Bearer " + restaurantToken,
        },
      });

      Swal.fire({
        title: "Sucesso",
        text: "O cadastro foi realizado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });

      history.push("/profile");
    } catch (error) {
      Swal.fire({
        title: "Ops!",
        text: "Erro no cadastro. Tente novamente",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Restaurants" />
          <h1>Cadastrar novo lanche</h1>
          <p>Descreva o lanche detalhadamente.</p>
          <Link className="back-link" to="/profile">
            <FiArrowLeft size={16} color="#ea2041" />
            <span>Voltar</span>
          </Link>
        </section>
        <Form onSubmit={handleNewMenu}>
          <Input
            name="title"
            label=""
            placeholder="Nome do lanche"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            name="description"
            label=""
            placeholder="Descrição"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            name="value"
            label=""
            placeholder="Valor em reais"
            step="0.01"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
