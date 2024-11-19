"use client"; 
import React, { useState } from "react"; 
import Link from 'next/link';
import { Button, Menu } from 'antd';
import { Carousel } from "antd";
import Footer from "../footer/footer";
import Product, { produtos }  from "../product/product";
import { prodListaMV } from "../produtos_Midia_Visual/page";
import { MdFavoriteBorder } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiMenuSearchLine, RiMenuSearchFill } from "react-icons/ri";
import Cimg from "../../../public/catalogo/decoracao-img.png";

export default function Catalog() {

  // Filtro
  function getItem(label, key, icon, children, type, path) {
    return {
      key,
      icon,
      children,
      label: <Link to={path}>{label}</Link>,
      type,
    };
  }

  const items = [
    getItem('CATEGORIAS', '1'),
      {
        label: 'MÍDIA VISUAL',
        key: 'sub1',
        children: prodListaMV.map(produto => (
          getItem(
            produto.subCategory,
            produto.id,
            null,
            null,
            null,
            `/produtos/${produto.subCategory}` // Permite que o valor de produto.subCategory seja inserido diretamente na string, tornando-a dinâmica e permitindo que o valor da subcategoria seja exibido na URL.
          )
        )),
      },
  ];

  const [collapsed, setCollapsed] = useState(true);
  const alterarFiltro = () => {
    setCollapsed(!collapsed);// Alterna o estado do filtro quando o botão é clicado
  };

  return (
    <div className="telaC">
      <div className="catalogo">
        <div className="menuCat">
          <div className="itens-direita">
            <Button type="button" className="filtro" onClick={alterarFiltro} >
              {collapsed ?  <RiMenuSearchLine /> : <RiMenuSearchFill />}
            </Button>
            <div className="fundo-itens">
              {!collapsed && (
                <Menu
                  className="menu-itens"
                  defaultSelectedKeys={['1']}
                  defaultOpenKeys={['sub1']}
                  mode="inline"
                  theme="white"
                  inlineCollapsed={collapsed}
                  items={items}
                />
              )}
            </div>
          </div>
          <div className="itens-esquerda">
            <Link href="/favoritos">
              <button type="button" className="favorito">
                <MdFavoriteBorder />
              </button>
            </Link>
            <div className="espaco-fc"> </div>
            <Link href="/carrinho">
              <button type="button" className="carrinho">
                <HiOutlineShoppingCart />
              </button>
            </Link>
          </div>
        </div>

        <center>
          <img src={Cimg} className="catalogo-img" alt="logo" />
          <h1 className="navegador-text"> NAVEGUE PELAS CATEGORIAS </h1>
          <div className="decoracao-line"></div>
        </center>

        <Carousel autoplay>
          <div className="carrosel">
            {produtos.slice(0, 2).map((produto) => (
              <Product 
                product={produto} 
                id={produto.id} 
                key={produto.id} 
                />
            ))}
          </div>
          <div className="carrosel">
            {produtos.slice(2, 4).map((produto) => (
              <Product 
                product={produto} 
                id={produto.id} 
                key={produto.id} 
                />
            ))}
          </div>
        </Carousel>

        <center> <h1 className="atencao-text"> ATENÇÃO: OS PREÇOS DOS PRODUTOS ABAIXO SÃO ESTIMATIVOS E PODEM VARIAR DE ACORDO COM A SOLICITAÇÃO FEITA PARA CADA PRODUTO, APÓS O DIÁLOGO NO WHATSAPP COM O PROPRIETÁRIO. </h1> </center>

      </div>
      <Footer />
    </div>
  );
}