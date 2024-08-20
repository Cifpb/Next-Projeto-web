"use client";
import React, { useState, useEffect } from "react";
import Cad from "../../../public/cadastrar/cad.png";
import "./cadastrar.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Image from "next/image";

export default function Register1() {
 
  useEffect(() => {
    if (window.location.pathname === "/Register1") {
      document.getElementById("radio1").checked = true;
    } else if (window.location.pathname === "/Register2") {
      document.getElementById("radio2").checked = true;
    } else if (window.location.pathname === "/Register3") {
      document.getElementById("radio3").checked = true;
    }
  }, []);

  let [cpf, setCpf] = useState('');

  let handleCpfChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ''); 
    if (value.length <= 11) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, '$1.$2.$3-$4');
      setCpf(value);
    }
  };

  return (
    <div className="Tela-cadastro">
      <Header/>
    <div className="cadastro">
      <div className="pt1">
        <Image src={Cad} alt= "imagem" className= "imagem"/>
        <p className="texto"><strong>Cadastre-se <br />para obter<br /> nossos Serviços.</strong></p>
      </div>
      <div className="retanguloAmarelo">
        <div className="etapas">
          <p><strong>Seus dados</strong></p>
          <p><strong>Email e senha</strong></p>
          <p><strong>Concluído!</strong></p>
        </div>
        <div className="nave" style={{ textAlign: 'center' }}>
          <input type="radio" id="radio1" name="radios" value="opcao1" defaultChecked />
          <input type="radio" id="radio2" name="radios" value="opcao2" disabled />
          <input type="radio" id="radio3" name="radios" value="opcao3" disabled />
        </div>

        <div className="dados">
          <form action="/CadastrarEmail">
            <p><label>
              <strong>Nome Completo:<br /></strong>
              <input type="text" placeholder="Nome Completo" maxLength="50" minLength="15" required />
            </label></p>

            <p><label>
              <strong>CPF:<br /> </strong>
              <input
                type="text"
                id="cpf"
                value={cpf}
                maxLength="14"
                placeholder="CPF"
                onChange={handleCpfChange}
                required
              />
            </label></p>

            <p><label>
              <strong>Data de Nascimento:</strong>
              <input type="date" max="2007-01-01" min="1944-01-01" required />
            </label></p>
           <button type="submit" className="Proximo">Prosseguir</button>
          </form>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );

}
