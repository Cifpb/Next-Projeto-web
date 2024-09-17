"use client";
import React, { useState } from "react"; 
import Header from "../header/header";
import Footer from "../footer/footer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Limg from "../../../public/login/img.png";
import Image from "next/image";
import './login.css';
import Link from 'next/link';


export default function Login() {

  const [mostrarSenha, setMostrarSenha] = useState(false);

  const autMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
    let senha = document.getElementById("password");

    if (senha.type === "password") {
      senha.type = "text";
    } else {
      senha.setAttribute('type', 'password');
    }
  };

  return (
    <div className="logando">
      <Header />
      <div className="pag-login">
        <div className="elem-login">
          <div className="imagem-login">
           <Image src={Limg} alt= "imagem-login"/>
          </div>
          <div className="form-login">
            <h2 className="texto-principal">LOGIN</h2>
            <form action="#aqui usa o backend" method="post">
              <div className="formulario-grupo">
                <label htmlFor="email"></label>
                <input type="email" id="email" placeholder="E-mail" required autoComplete="off" />
              </div>
              <div className="formulario-grupo">
                <label htmlFor="password"></label>
                <input
                  type={mostrarSenha ? "text" : "password"} // Usando o estado mostrarSenha para alternar entre "text" e "password"
                  id="password"
                  minLength={8}
                  maxLength={12}
                  placeholder="Senha"
                  required
                />
                <button type="button" className="icone-eye" onClick={autMostrarSenha}>
                  {mostrarSenha ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              <div className="formulario-links">
                <Link href="/redefinir-senha"> Esqueceu a senha? </Link>
                <div className="formulario-grupo">
                  <center>
                    <input type="submit" defaultValue="Entrar" />
                  </center>
                </div>
                <span className="texto-criar-conta">Ainda não tem conta?</span>
                <Link href="/cadastrar/dados-pessoais"> Cadastre-se </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}