"use client";
import React, { useState, useEffect } from "react";
import Cad from "../../../../public/cadastrar/cad.png";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import style from '../page.module.css';
import Image from "next/image";
import Link from 'next/link';

export default function Register3() {
  let [selectedRadio, setSelectedRadio] = useState("");

  useEffect(() => {
    setSelectedRadio("radio3");
  }, []);

  return (
    <div className={style.tela_cadastro}>
      <Header />
      <div className={style.cadastro}>
        <div className={style.pt1} >
          <Image src={Cad} alt="imagem" className={style.imagem}/>
          <p className={style.texto}>
            <strong>
              Cadastre-se <br />
              para obter
              <br /> nossos <br />
              Serviços.
            </strong>
          </p>
        </div>
        <div className={style.retanguloAmarelo}>
          <div className={style.etapas}>
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
          <div className={style.nave} style={{ textAlign: "center" }}>
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
          <p className={style.textofinal} >
          Cadastro realizado com sucesso.
            <br />
            Seja bem-vindo à familia 
           <br/> Sala da Mídia!
          </p>
          <Link href="/"><button className={style.proximo_2}>Pagina Inícial</button></Link> 
        </div>
      </div>
      <Footer />
    </div>
  );
}
