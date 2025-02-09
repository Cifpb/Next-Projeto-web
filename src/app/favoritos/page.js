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

  // Função para remover um favorito
  const removerFavorito = async (id_produto) => {
    setCarregando(true); // Define como 'carregando' enquanto a remoção é processada

    try {
      const clienteId = Cookies.get('clienteId');
      if (!clienteId) {
        setCarregando(false);
        return;
      }

      const response = await fetch('/api/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id_produto })
      });

      if (!response.ok) throw new Error('Erro ao remover favorito');
      // Atualiza a lista de favoritos removendo o produto da lista local
      setFavoritos((prevFavoritos) => prevFavoritos.filter(produto => produto.id !== id_produto));
    } catch (error) {
      console.error('Erro ao remover favorito:', error);
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    const fetchFavoritos = async () => {
      const clienteId = Cookies.get('clienteId'); // Obtém o clienteId do cookie
      if (!clienteId) {
        setCarregando(false);
        return;
      }

      try {
        const response = await fetch(`/api/favoritos?clienteId=${clienteId}`, {
          method: 'GET', // Usando o método GET corretamente
        });

        if (!response.ok) throw new Error('Erro ao buscar favoritos');
        const data = await response.json();
        setFavoritos(data);  // Atualiza a lista de favoritos
      } catch (error) {
        console.error('Erro ao buscar favoritos:', error);
      } finally {
        setCarregando(false);
      }
    };

    fetchFavoritos();
  }, []);

  // Definição da variável heading com base no estado de carregamento e favoritos
  let heading = null;
  if (carregando) {
    heading = (
      <div style={{ display: 'flex', fontSize: '24px', justifyContent: 'center', height: '70vh', alignItems: 'center' }}>
        Carregando...
      </div>
    );
  } else if (favoritos.length === 0) {
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
            <Product 
              key={produto.id} 
              product={produto} 
              onRemove={() => removerFavorito(produto.id)}  // Passando função para remoção
            />
          ))}
        </section>
      </div>
      <Footer />
    </div>
  );
}
