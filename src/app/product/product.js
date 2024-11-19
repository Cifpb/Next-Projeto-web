import React, { useState, useEffect } from "react";
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import Pimg1 from "../../../public/produtos/img-virgem-prod/logotipo.png";
import Pimg2 from "../../../public/produtos/img-virgem-prod/proj.png";
import Pimg3 from "../../../public/produtos/img-virgem-prod/flyer.png";
import Pimg4 from "../../../public/produtos/img-virgem-prod/motion.png";
import CRimg1 from "../../../public/produtos/carrinho/icon1.png";
import CRimg2 from "../../../public/produtos/carrinho/icon2.png";
import CRimg3 from "../../../public/produtos/carrinho/icon3.png";
import CRimg4 from "../../../public/produtos/carrinho/icon4.png";
import './product.css';
import Image from "next/image";

// Lista de Produtos
const produtos = [
  { id: 'logotipoP1', 
    img: Pimg1,
    imgCart: CRimg1,
    category: 'MÍDIA Visual', 
    subCategory: 'Logotipo/Identidade Visual', 
    price: '800,00'
  },
  { id: 'flyerP2', 
    img: Pimg3,
    imgCart: CRimg2,
    category: 'MÍDIA VISUAL', 
    subCategory: 'Flyer', 
   
    price: '150,00'
  },
  { id: 'motionP3', 
    img: Pimg4,
    imgCart: CRimg4,
    category: 'MÍDIA VISUAL', 
    subCategory: 'Motion',
    
    price: '250,00'
  },
  { id: 'projetosGrafP4', 
    img: Pimg2,
    imgCart: CRimg3,
    category: 'MÍDIA VISUAL', 
    subCategory: 'Projetos Gráficos', 
  
    price: '1000,00'
  },
];

export { produtos };

export default function Product({ product, addFavorite, removeFavorite }) {

  // Favoritos
  const [favorite, setFavorite] = useState(false);

  // Carrinho 
  /* const { cart, addToCart } = useCartContext();
  const isCart = cart.some((cart) => cart.id === product.id); */

  return (
    <div className="produto">
      
      
      <Image src={product.img} className="prod-img" alt="logo" />
      <h1 className="cat-text">{product.category}</h1>
      <h2 className="sub-text">
        {product.subCategory}</h2>
      <div className="linha-esquerda"></div>
      <div className="icones">
        <button type="button" className="icone-fav" onClick={() => {
          setFavorite(!favorite);
          console.log(addFav)
          console.log(product)

          if(favorite) {
            addFavorite(product);
          } else {
            removeFavorite(product.id);
          }
        }}>
          {favorite ? <MdFavoriteBorder /> : <MdFavorite style={{color: '#fdd54f'}}/>}
        </button>
         
        
        
         
        
      </div>
      
   </div>
  );
}