import React, { useState } from 'react';
import "./Requests.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import MenuPed from "../menudepedidos/menu";
import { PedidosSolicitados, pedidosSoli } from "../cardPed/cards";

const Requests1 = () => {

    return (
        
        <div className='Tela-pedidos'>
         <Header/>
        <div className='pedidos'>
          <MenuPed/>
            <div className="bloco-pedido">
                <PedidosSolicitados pedidosSoli={pedidosSoli} />
                <p className="infor-pedido">Aguarde a confirmação do designer</p>
            </div>
        </div>
        <Footer/>
        </div>
    );
}

export default Requests1;
