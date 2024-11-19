"use client"; 
import React, { useState } from "react"; 
import Image from "next/image";
import Link from 'next/link';
import { Button, Menu } from 'antd';
import { Carousel } from "antd";
import Footer from "../footer/footer";
import Product, { produtos }  from "../product/product";
import { MdFavoriteBorder } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiMenuSearchLine, RiMenuSearchFill } from "react-icons/ri";
import Cimg from "../../../public/catalogo/decoracao-img.png";
import "./catalogo.css";

export default function Catalog() {

  return (
    <div className="telaC">
      <div className="catalogo">
        <div className="menuCat">
          
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
          <Image src={Cimg} className="catalogo-img" alt="logo" />
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