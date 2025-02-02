"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import arrow from "../../../../public/pedidos/menu/menu.png";
import cronometro from "../../../../public/pedidos/menu/cronometro.png";
import andamento from "../../../../public/pedidos/menu/em-andamento.png";
import complacente from "../../../../public/pedidos/menu/complacente.png";
import { usePathname } from 'next/navigation';
import Image from "next/image";

const MenuPed = () => {
    const [ocultoPedido, setOcultoPedido] = useState(false);
    const pathname = usePathname();  // Obtém o caminho da página atual

    const togglePedido = () => {
        setOcultoPedido(!ocultoPedido);
    };

    const isActive = (link) => {
        return pathname === link ? "active" : "";
    };

    return (
        <div className={`container-pedido ${ocultoPedido ? 'oculto-pedido' : ''}`}>
            <div className="menu-pedido btn-pedido" onClick={togglePedido}>
                <Image className="arrow-pedido" src={arrow} alt="Ícone de Menu" />
            </div>
            <div className="menu-pedido">
                <Link href="/pedidos">
                    <Image className={`icon-pedido ${isActive('/pedidos')}`} src={cronometro} alt="Ícone de Cronômetro" />
                </Link>
                <div className="texto-pedido">
                    <Link href="/pedidos" className={isActive('/pedidos')}>PEDIDOS SOLICITADOS</Link>
                </div>
            </div>
            <div className="menu-pedido">
                <Link href="/pedidos/em-andamento">
                    <Image className={`icon-pedido ${isActive('/pedidos/em-andamento')}`} src={andamento} alt="Ícone de Pedido em Andamento" />
                </Link>
                <div className="texto-pedido">
                    <Link href="/pedidos/em-andamento" className={isActive('/pedidos/em-andamento')}>PEDIDOS EM ANDAMENTO</Link>
                </div>
            </div>
            <div className="menu-pedido">
                <Link href="/pedidos/concluidos">
                    <Image className={`icon-pedido ${isActive('/pedidos/concluidos')}`} src={complacente} alt="Ícone de Pedido Concluído" />
                </Link>
                <div className="texto-pedido">
                    <Link href="/pedidos/concluidos" className={isActive('/pedidos/concluidos')}>PEDIDOS CONCLUÍDOS</Link>
                </div>
            </div>
        </div>
    );
}

export default MenuPed;