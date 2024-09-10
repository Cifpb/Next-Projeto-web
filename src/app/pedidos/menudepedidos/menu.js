"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import arrow from "../../../../public/pedidos/menu/menu.png";
import cronometro from "../../../../public/pedidos/menu/cronometro.png";
import andamento from "../../../../public/pedidos/menu/em-andamento.png";
import complacente from  "../../../../public/pedidos/menu/complacente.png";
import Image from "next/image";

const MenuPed = () => {
    const [ocultoPedido, setOcultoPedido] = useState(false);
        const togglePedido = () => {
            setOcultoPedido(!ocultoPedido);
        };
    return(
        <div className={`container-pedido ${ocultoPedido ? 'oculto-pedido' : ''}`}>
            <div className="menu-pedido btn-pedido" onClick={togglePedido}>
                <Image className="arrow-pedido" src={arrow} alt="Ícone de Menu" />
            </div>
            <div className="menu-pedido">
                 <Link href="pedidos">
                     <Image className="icon-pedido" src={cronometro} alt="Ícone de Cronômetro" />
                </Link>
            <div className="texto-pedido">
                <Link href="pedidos">PEDIDOS SOLICITADOS</Link>
            </div>
            </div>
            <div className="menu-pedido">
                <Link href="em-andamento">
                    <Image className="icon-pedido" src={andamento} alt="Ícone de Pedido em Andamento" />
                </Link>
            <div className="texto-pedido">
                <Link href="em-andamento">PEDIDOS EM ANDAMENTO</Link>
            </div>
            </div>
            <div className="menu-pedido">
                <Link href="concluidos">
                 <Image className="icon-pedido" src={complacente} alt="Ícone de Pedido Concluído" />
                </Link>
            <div className="texto-pedido">
                <Link href="concluidos">PEDIDOS CONCLUÍDOS</Link>
            </div>
        </div>
    </div>
    );
}
export default MenuPed;