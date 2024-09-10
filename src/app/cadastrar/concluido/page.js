"use client";
import React, { useState, useEffect } from "react";
import Cad from "../../../../public/cadastrar/cad.png";
import "../cadastrar.css";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Image from "next/image";
import Link from 'next/link';

export default function Register3() {
  let [selectedRadio, setSelectedRadio] = useState("");

  useEffect(() => {
    setSelectedRadio("radio3");
  }, []);

  return (
    <div className="Tela-cadastro">
      <Header />
      <div className="cadastro">
        <div className="pt1">
          <Image src={Cad} alt="imagem" className="imagem" />
          <p className="texto">
            <strong>
              Cadastre-se <br />
              para obter
              <br /> nossos Serviços.
            </strong>
          </p>
        </div>
        <div className="retanguloAmarelo">
          <div className="etapas">
            <p>
              <strong>Seus dados</strong>
            </p>
            <p>
              <strong>Email e senha</strong>
            </p>
            <p>
              <strong>Concluído!</strong>
            </p>
          </div>
          <div className="nave" style={{ textAlign: "center" }}>
            <input
              type="radio"
              id="radio1"
              name="radios"
              value="opcao1"
              checked={selectedRadio === "radio1"}
              disabled={selectedRadio !== "radio1"}
              onChange={() => setSelectedRadio("radio1")}
            />
            <input
              type="radio"
              id="radio2"
              name="radios"
              value="opcao2"
              checked={selectedRadio === "radio2"}
              disabled={selectedRadio !== "radio2"}
              onChange={() => setSelectedRadio("radio2")}
            />
            <input
              type="radio"
              id="radio3"
              name="radios"
              value="opcao3"
              checked={selectedRadio === "radio3"}
              disabled={selectedRadio !== "radio3"}
              onChange={() => setSelectedRadio("radio3")}
            />
          </div>
          <p className="textofinal">
          Cadastro realizado com sucesso.
            <br />
            Seja bem-vindo à familia 
           <br/> Sala da Mídia!
          </p>
          <Link href="Sobre"><button className="Proximo2">ir para pagina Inícial</button></Link> 
        </div>
      </div>
      <Footer />
    </div>
  );
}
