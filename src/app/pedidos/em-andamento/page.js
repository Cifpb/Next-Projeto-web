"use client";
import React, { useState } from "react"; 
import "../pedidos.css"
import Header from "../../header/header";
import Footer from "../../footer/footer";
import MenuPed from "../menudepedidos/menu";
import { PedidosAndamento, pedidosAndamen } from "../cardPed/cards";


function Requests2() {

    return (
        <div className='Tela-pedidos'>
         <Header/>
          <div className='pedidos'>
            <MenuPed/>
            <div className="bloco-pedido">
                <PedidosAndamento pedidosAndamen={pedidosAndamen} />
            </div>
           </div>
         <Footer/>
        </div>
    );
}

export default Requests2;
