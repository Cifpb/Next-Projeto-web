"use client";
import React, { useState } from "react"; 
import Header from "../header/header";
import Footer from "../footer/footer";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Limg from "../../../public/login/img.png";
import Image from "next/image";
import style from './page.module.css';
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
    <div className={style.logando}>
      <Header />
      <div className={style.pag_login}>
        <div className={style.elem_login}>
          <div className={style.imagem_login}>
            <Image src={Limg} alt="imagem-login"/>
          </div>
          <div className={style.form_login}>
            <h2 className={style.texto_principal}>LOGIN</h2>
            <form action="#aqui usa o backend" method="post">
              <div className={style.formulario_grupo}>
                <label htmlFor="email"></label>
                <input
                  type="email"
                  id="email"
                  placeholder="E-mail"
                  required
                  autoComplete="off"
                />
              </div>
              <div className={style.formulario_grupo}>
                <label htmlFor="password"></label>
                <input
                  type={mostrarSenha ? "text" : "password"} // Usando o estado mostrarSenha para alternar entre "text" e "password"
                  id="password"
                  minLength={8}
                  maxLength={12}
                  placeholder="Senha"
                  required
                />
                <button
                  type="button"
                  className={style.icone_eye}
                  onClick={autMostrarSenha}
                >
                  {mostrarSenha ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
              <div className={style.formulario_links}>
                <Link href="/redefinir-senha"> Esqueceu a senha? </Link>
                <div className={style.formulario_grupo}>
                  <center>
                    <input type="submit" defaultValue="Entrar" />
                  </center>
                </div>
                <span className={style.texto_criar_conta}>Ainda não tem conta?</span>
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
