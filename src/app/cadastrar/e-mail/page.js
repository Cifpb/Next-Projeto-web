"use client";
import React, { useState, useEffect } from "react";
import Cad from "../../../../public/cadastrar/cad.png";
import "../cadastrar.css";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Image from "next/image";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from 'next/link';

export default function Register2() {
  let [mostrarSenha, setMostrarSenha] = useState(false); 
  let [email, setEmail] = useState("");
  let [senha, setSenha] = useState("");
  let [formValid, setFormValid] = useState(false);



  let autMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  useEffect(() => {

    document.getElementById("radio2").checked = true;
  }, []);

  useEffect(() => {
    
    setFormValid(
      email.length >= 10 &&
      email.length <= 50 &&
      senha.length >= 8 &&
      senha.length <= 12
    );
  }, [email, senha]);

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
            <input type="radio" id="radio1" name="radios" value="opcao1" disabled />
            <input type="radio" id="radio2" name="radios" value="opcao2" />
            <input type="radio" id="radio3" name="radios" value="opcao3" disabled />
          </div>
          <form action="concluido" method="GET">
            <div className="dadosEmail">
              <p><label>
                <strong>E-mail:<br /></strong>
                <input 
                  type="email" 
                  placeholder="E-mail" 
                  maxLength="50" 
                  minLength="10" 
                  required 
                  autoComplete="off" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label></p>
              <label>
                <div className="senha">
                  <strong>Senha:<br /></strong>
                  <input 
                    type={mostrarSenha ? "text" : "password"} 
                    id="senha" 
                    placeholder="Senha" 
                    maxLength="12" 
                    minLength="8" 
                    required 
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                  />
                  <button type="button" className="icone-olho" onClick={autMostrarSenha}>
                    {mostrarSenha ? <FaRegEyeSlash /> : <FaRegEye />}
                  </button>
                </div>
              </label>
            </div>
            <div className="botoes">
              <Link href="dados-pessoais" className="volta">Voltar</Link> 
              <button type="submit" className="Proximo1" disabled={!formValid}>Prosseguir</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}
