"use client";
import Product from '../product/product';
import Footer from '../footer/footer';
import { MdFavorite } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaRegFaceSadTear } from "react-icons/fa6";
import Link from 'next/link';
import { useState } from 'react';
import './favorites.css';

export default function FavoritesPage() {
  // Obtém a lista de favoritos e a função de adicionar/remover favoritos
  const [favorite, setFavorite] = useState([]);

  const addFavorite = (newFavorite) => {
    const favoriteExistent = favorite.filter(p => p.id == newFavorite.id);
    if(favoriteExistent.length == 0){      
      setFavorite([...favorite, newFavorite]);
      console.log(favorite);
    }
  }

  const removeFavorite = (id) => {
    setFavorite(favorite.filter(p => p.id != id));
    console.log(favorite);
  }

  // Verifica se há favoritos
  const count = favorite.length; 
  let heading; 
  if (count === 0) {
    heading = (
      <div style={{ display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center' }}>
        Não há favoritos
        <FaRegFaceSadTear className="icone-triste" />
      </div>
    );
  }

  return (
    <div className="telaF">
      <div className="favorites"> 
        <div className="menuFav">
          <div className="espaco-direita"></div>
          <div className="objetos-esquerda">
            <button type="button" className="btn-favorito">
              <MdFavorite />
            </button>
            
          </div>
        </div>
        <center>
          <h1 className="favoritos-text"> MEUS FAVORITOS </h1>
          <div className="decoracao-linha"></div>
          <h2 className="mensagem-text">{heading}</h2> 
        </center>

        {/* Lista de Favoritos */}
        <section className="produtos">
          {favorite.map((produto) => (
            <Product 
              key={produto.id} 
              product={produto}
              addFavorite={addFavorite} 
              removeFavorite={removeFavorite}
            />
          ))}
        </section>
      </div> 
      <Footer />
    </div>
  );
}
