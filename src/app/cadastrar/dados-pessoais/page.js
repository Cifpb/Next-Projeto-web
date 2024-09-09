"use client";
import React, { useState, useEffect } from "react";
import Cad from "../../../../public/cadastrar/cad.png";
import "../cadastrar.css";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Image from "next/image";
import Link from 'next/link';

export default function Register1() {
  let [tel, settel] = useState('');

  let handleTelChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length <= 13) {
      // Adicionar a formatação para o número de telefone com código do país
      value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3-$4');
      settel(value);
    }
  };

  useEffect(() => {
    if (window.location.pathname === "/Register1") {
      document.getElementById("radio1").checked = true;
    } else if (window.location.pathname === "/Register2") {
      document.getElementById("radio2").checked = true;
    } else if (window.location.pathname === "/Register3") {
      document.getElementById("radio3").checked = true;
    }
  }, []);

  return (
    <div className="Tela-cadastro">
      <Header />
      <div className="cadastro">
        <div className="pt1">
          <Image src={Cad} alt="imagem" className="imagem" />
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
          <form action="e-mail" method="GET">
              <p><label>
                <strong>Nome Completo:<br /></strong>
                <input type="text" placeholder="Nome Completo" maxLength="50" minLength="15" required />
              </label></p>

              <p><label>
                <strong>Telefone:<br /> </strong>
                <input
                  type="tel"
                  value={tel}
                  onChange={handleTelChange}
                  placeholder="+00 00 00000-0000"
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
      <Footer />
    </div>
  );
}
