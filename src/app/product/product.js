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
import Link from 'next/link';
import Image from "next/image";


export default async function Product({ product }) {


  // Carrinho 
  /* const { cart, addToCart } = useCartContext();
  const isCart = cart.some((cart) => cart.id === product.id); */

  return (
    <div className="produto">


      <Image src={Pimg1} className="prod-img" alt="logo" />
      <h1 className="cat-text">Mídia Visual</h1>
      <h2 className="sub-text">
        {product.sub_categoria}</h2>
      <div className="linha-esquerda"></div>
      <div className="icones">
        <button type="button" className="icone-fav">
          <MdFavoriteBorder />
        </button>
        <button type="button" className="icone-car">
          <HiOutlineShoppingCart />
        </button>

        <Link href={`/product/${product.id}`} passHref>
          <button className="preco"> R$ {product.valor} </button>
        </Link>



      </div>

    </div>
  );
}