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
import style from "./page.module.css";
import Link from 'next/link';
import Image from "next/image";

export default async function Product({ product }) {

  // Carrinho 
  /* const { cart, addToCart } = useCartContext();
  const isCart = cart.some((cart) => cart.id === product.id); */

  return (
    <div className={style.produto}>

      <Image src={Pimg1} className={style.prod_img} alt="logo" />
      <h1 className={style.cat_text}>Mídia Visual</h1>
      <h2 className={style.sub_text}>
        {product.sub_categoria}
      </h2>
      <div className={style.linha_esquerda}></div>
      <div className={style.icones}>
        <button type="button" className={style.icone_fav}>
          <MdFavoriteBorder />
        </button>
        <button type="button" className={style.icone_car}>
          <HiOutlineShoppingCart />
        </button>

        <Link href={`/productMV/${product.id}`}>
          <button type="button" className={style.preco}>
            <div className={style.texto_bnt}>
              R$ {Number(product.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
          </button>
        </Link>
      </div>

    </div>
  );
}