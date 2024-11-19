import React from "react";
import { useFavoriteContext } from "../context/FavoritesContext";
import { useCartContext } from '../context/CartContext';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import { prodListaMV } from "../produtos_Midia_Visual/page";
import Pimg1 from "../../../public/produtos/img-virgem-prod/logotipo.png";
import Pimg2 from "../../../public/produtos/img-virgem-prod/proj.png";
import Pimg3 from "../../../public/produtos/img-virgem-prod/flyer.png";
import Pimg4 from "../../../public/produtos/img-virgem-prod/motion.png";
import CRimg1 from "../../../public/produtos/carrinho/icon1.png";
import CRimg2 from "../../../public/produtos/carrinho/icon2.png";
import CRimg3 from "../../../public/produtos/carrinho/icon3.png";
import CRimg4 from "../../../public/produtos/carrinho/icon4.png";

// Função para obter a promoção do produto com base nos cards
const getPromotionProduct = (subCategory) => {
  const productMV = prodListaMV.find(productMV => productMV.subCategory === subCategory);
  return productMV ? productMV.promotion : null;
};

// Lista de Produtos
const produtos = [
  { id: 'logotipoP1', 
    img: Pimg1,
    imgCart: CRimg1,
    category: 'MÍDIA Visual', 
    subCategory: 'Logotipo/Identidade Visual', 
    promotion: getPromotionProduct('Logotipo/Identidade Visual'),
    price: '800,00'
  },
  { id: 'flyerP2', 
    img: Pimg3,
    imgCart: CRimg2,
    category: 'MÍDIA VISUAL', 
    subCategory: 'Flyer', 
    promotion: getPromotionProduct('Flyer'),
    price: '150,00'
  },
  { id: 'motionP3', 
    img: Pimg4,
    imgCart: CRimg4,
    category: 'MÍDIA VISUAL', 
    subCategory: 'Motion',
    promotion: getPromotionProduct('Motion'),
    price: '250,00'
  },
  { id: 'projetosGrafP4', 
    img: Pimg2,
    imgCart: CRimg3,
    category: 'MÍDIA VISUAL', 
    subCategory: 'Projetos Gráficos', 
    promotion: getPromotionProduct('Projetos Gráficos'),
    price: '1000,00'
  },
];

export { produtos };

export default function Product({ product, id }) {

  // Favoritos
  const { favorite, addFavorite } = useFavoriteContext();
  const isFavorite = favorite.some((fav) => fav.id === product.id);

  // Carrinho 
  const { cart, addToCart } = useCartContext();
  const isCart = cart.some((cart) => cart.id === product.id);

  return (
    <div className="produto">
      {product.promotion != "" && (
      <div 
        className="promo-fita3" 
        style={{ backgroundColor: product.promotion === 'Novo' ? '#388E3C' : '#D32F2F' }}>
        {" "}
        {product.promotion}
      </div>
      )}

      {/* 
      // Código de Raykkoner
        {product.promotion.trim() !== "" && (
          <div className="promo-fita3" style={{ backgroundColor: product.promotion === 'Novo' ? '#388E3C' : '#D32F2F' }}>
            {product.promotion}
          </div>
        )}
      */}
      
      <img src={product.img} className="prod-img" alt="logo" />
      <h1 className="cat-text">{product.category}</h1>
      <h2 className="sub-text">
        {product.subCategory}</h2>
      <div className="linha-esquerda"></div>
      <div className="icones">
        <button type="button" className="icone-fav" onClick={() => addFavorite(product)}>
          {!isFavorite ? <MdFavoriteBorder /> : <MdFavorite style={{color: '#fdd54f'}}/>}
        </button>
        <button type="button" className="icone-car" onClick={() => addToCart(product)}>
          {!isCart ? <HiOutlineShoppingCart /> : <HiShoppingCart style={{ color: "#fdd54f" }}/>}
        </button>
      </div>
      {produtos.map((produto) => (
        <button 
          type="button" 
          className="preco" 
          key={produto.id}
        >
          <a 
            className="texto-bnt" 
            href={`/produtos/${product.subCategory}`}
          >
            R$ {product.price}
          </a>
        </button>
      ))}

    </div>
  );
}