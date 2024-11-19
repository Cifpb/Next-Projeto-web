"use client";
import { useFavoriteContext } from '../context/FavoritesContext';
import { Link } from "react-router-dom";
import Product from '../product/product';
import Footer from '../footer';
import { MdFavorite } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { FaRegFaceSadTear } from "react-icons/fa6";

export default function Favorites() {

  // Lista de Favoritos
  const { favorite } = useFavoriteContext();
  
  const count = favorite.length; 
  let heading; 
  if(count === 0) {
    heading = (
      <div style={{display: 'flex', justifyContent: 'center', height: '70vh', alignItems: 'center'}}>
        Não há favoritos
        <FaRegFaceSadTear className="icone-triste"/>
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
              <Link to="/carrinho">
                <button type="button" className="btn-carrinho">
                  <HiOutlineShoppingCart />
                </button>
              </Link>
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
              <Product product={produto} id={produto.id} key={produto.id} />
            ))}
          </section>
        </div> 
        <Footer />
      </div>
    );
  }