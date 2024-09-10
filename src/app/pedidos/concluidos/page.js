"use client";
import React, { useState } from "react"; 
import "../pedidos.css"
import Header from "../../header/header";
import Footer from "../../footer/footer";
import MenuPed from "../menudepedidos/menu";
import { pedidosConclu, PedidosConcluidos } from "../cardPed/cards";

function Requests3() {

  return (
  <div className='Tela-pedidos'>
    <Header/>
    <div className='pedidos'>
     <MenuPed/>
       <div className="bloco-pedido">
       <PedidosConcluidos pedidosConclu={pedidosConclu} />

          </div>
        </div>
        <Footer/>
        </div>
  );
}

export default Requests3;
