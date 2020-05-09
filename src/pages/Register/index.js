import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import { Scope } from "@unform/core";
import { Form } from "@unform/web";
import Input from "../../components/Input";
import MaskedInput from "react-text-mask";
import api from "../../services/api";

import Swal from "sweetalert2/dist/sweetalert2.js";

import "sweetalert2/src/sweetalert2.scss";

import "./style.css";

import logoImg from "../../assets/logo.png";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [restaurant, setRestaurant] = useState([]);
  const restaurantId = localStorage.getItem("restaurantId");

  const history = useHistory();

  useEffect(() => {
    async function getRestaurant() {
      await api.get(`restaurants/${restaurantId}`).then((response) => {
        setRestaurant(response.data);
      });

      if (!restaurant) {
        setName(restaurant.name);
        setEmail(restaurant.email);
        setWhatsapp(restaurant.whatsapp);
        setAddress(restaurant.address);
        setCity(restaurant.city);
        setUf(restaurant.uf);
      }
    }

    getRestaurant();
  });

  async function handleRegister(data) {
    const {
      name,
      email,
      whatsapp,
      address,
      city,
      uf,
      password,
      confirmPassword,
    } = data;

    try {
      if (
        name === "" ||
        email === "" ||
        whatsapp === "" ||
        address === "" ||
        city === "" ||
        uf === "" ||
        password === "" ||
        confirmPassword === ""
      ) {
        Swal.fire({
          title: "Ops!",
          text: "Todos os campos são obrigatórios!",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      if (password !== confirmPassword) {
        Swal.fire({
          title: "Ops!",
          text: "As senhas digitadas não conferem!",
          icon: "warning",
          confirmButtonText: "OK",
        });
        return;
      }

      await api.post("restaurants", data);

      Swal.fire({
        title: "Sucesso",
        text: "O cadastro foi realizado com sucesso!",
        icon: "success",
        confirmButtonText: "OK",
      });
      history.push("/");
    } catch (err) {
      Swal.fire({
        title: "Ops!",
        text: "Erro no cadastro. Tente novamente",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Restaurants" />
          <p>Faça seu cadastro e publique seu cardápio.</p>
          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#ea2041" />
            <span>Voltar</span>
          </Link>
        </section>
        <Form onSubmit={handleRegister}>
          <Input
            name="name"
            label=""
            placeholder="Nome do Restaurante"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <MaskedInput
            name="whatsapp"
            label=""
            mask={[
              "(",
              /[1-9]/,
              /\d/,
              ")",
              " ",
              /\d/,
              " ",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
              "-",
              /\d/,
              /\d/,
              /\d/,
              /\d/,
            ]}
            placeholder="DDD + Whatsapp"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
          />
          <Input
            name="email"
            label=""
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            name="password"
            label=""
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            name="confirmPassword"
            label=""
            type="password"
            placeholder="Confirme a Senha"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Scope path="addresss">
            <Input
              name="address"
              label=""
              placeholder="Endereço"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <Input
              name="city"
              label=""
              placeholder="Cidade"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <Input
              name="state"
              label=""
              placeholder="Estado"
              value={uf}
              onChange={(e) => setUf(e.target.value)}
              type="string"
            />
          </Scope>
          <button className="button" type="submit">
            Cadastrar
          </button>
        </Form>
      </div>
    </div>
  );
}
