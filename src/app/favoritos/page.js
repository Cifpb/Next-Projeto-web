'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Product from '../product/product';
import Footer from '../footer/footer';
import { MdFavorite } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaRegFaceSadTear } from "react-icons/fa6";
import Cookies from 'js-cookie';
import style from './page.module.css';  // Importando o CSS

export default function Favorites() {
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const fetchFavoritos = async () => {
      const clienteId = Cookies.get('clienteId'); // Obtém o clienteId do cookie
      console.log("ID:", clienteId); 
      if (!clienteId) {
        setCarregando(false);
        return;
      }
  
      try {
        const response = await fetch(`/api/favoritos?clienteId=${clienteId}`, {
          method: 'GET', // Usando o método GET corretamente
          // O clienteId já estará disponível no cookie automaticamente
        });
        if (!response.ok) throw new Error('Erro ao buscar favoritos');
        const data = await response.json();
        console.log(data);  // Verificando os dados recebidos
        setFavoritos(data);
      } catch (error) {
        console.error(error);
      } finally {
        setCarregando(false);
      }
    };
  
    fetchFavoritos();
  }, []);  

  // Definição da variável heading com base na quantidade de favoritos
  let heading = null;
  if (!carregando && favoritos.length === 0) {
    heading = (
      <div style={{ display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center' }}>
        Não há favoritos
        <FaRegFaceSadTear className={style.iconeTriste} />
      </div>
    );
  }
  

  return (
    <div className={style.telaF}>
      <div className={style.favorites}>
        <div className={style.menuFav}>
          <div className={style.espacoDireita}></div>
          <div className={style.objetosEsquerda}>
            <button type="button" className={style.btnFavorito}>
              <MdFavorite />
            </button>
            <Link href="/carrinho">
              <button type="button" className={style.btnCarrinho}>
                <HiOutlineShoppingCart />
              </button>
            </Link>
          </div>
        </div>

        <center>
          <h1 className={style.favoritosText}> MEUS FAVORITOS </h1>
          <div className={style.decoracaoLinha}></div>
          <h2 className={style.mensagemText}>{heading}</h2>
        </center>

        {/* Lista de Favoritos */}
        <section className={style.produtos}>
          {favoritos.length > 0 && favoritos.map((produto) => (
            <Product product={produto} key={produto.id} />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
}
