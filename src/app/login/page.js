"use client";
import React, { useState } from "react"; 
import Header from "../header/header";
import Footer from "../footer/footer";
import Limg from "../../../public/login/img1.png";
import Image from "next/image";
import style from './page.module.css';
import LoginFrom from '../../componentes/loginCliente/loginFrom';

export default function Login() {

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
    
            <LoginFrom />

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
