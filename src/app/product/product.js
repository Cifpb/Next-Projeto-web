'use client';
import { useState, useEffect } from 'react';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import { HiShoppingCart, HiOutlineShoppingCart } from 'react-icons/hi';
import { Tooltip } from 'antd';
import Pimg1 from "../../../public/produtos/img-virgem-prod/logotipo.png";
import Pimg2 from "../../../public/produtos/img-virgem-prod/flyer.png";
import Pimg3 from "../../../public/produtos/img-virgem-prod/motion.png";
import Pimg4 from "../../../public/produtos/img-virgem-prod/proj.png";
import style from "./page.module.css";
import Link from 'next/link';
import Image from "next/image";


export default function Product({ product }) {
 const [logado, setLogado] = useState(false);
 const [favorito, setFavorito] = useState(false);
 const [carrinho, setCarrinho] = useState(false);


 useEffect(() => {
   const status = sessionStorage.getItem('logado');
   setLogado(status === 'true');


   async function fetchCarrinho() {
     const res = await fetch(`/api/carrinho/${product.id}`);
     if (res.ok) {
       const itemCarrinho = await res.json();
       setCarrinho(itemCarrinho.length > 0);
     }
   }


   if (status === 'true') fetchCarrinho();
 }, []);


 const mensagem = (action) => {
   return (
     <center style={{ fontSize: '95%', padding: '0.5%' }} >
       Faça login para <b>{action}</b> este produto. Se não possui uma conta, cadastre-se.
     </center>
   );
 };


 const handleClick = (action) => {
   if (!logado) {
     console.log(`Usuário tentou ${action} sem estar logado.`);
   } else {
     console.log(`${action} acionado para o produto ${product.id}`);
   }
 };


 //Favoritos


 useEffect(() => {
   const status = sessionStorage.getItem('logado');
   setLogado(status === 'true');


   async function fetchFavoritos() {
     const res = await fetch('/api/favoritos', { method: 'GET' });
     if (res.ok) {
       const favoritos = await res.json();
       setFavorito(favoritos.some(fav => fav.id === product.id));
     }
   }


   if (status === 'true') fetchFavoritos();
 }, [product.id]);


 const handleFavorite = async () => {
   if (!logado) return;


   const res = await fetch('/api/favoritos', {
     method: 'POST',
     headers: { 'Content-Type': 'application/json' },
     body: JSON.stringify({ id_produto: product.id }),
   });


   if (res.ok) {
     setFavorito(!favorito);
   }
 };


 const handleCart = async () => {
   if (!logado) return;


   if (carrinho) {
     const res = await fetch(`/api/itensDePedido/${product.id}`, {
       method: 'DELETE'
     });


     if (res.ok) {
       setCarrinho(false);
     }
   } else {
     const res = await fetch('/api/carrinho', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ produto: product }),
     });


     if (res.ok) {
       setCarrinho(true);
     }
   }
 };


 // Imagens Corretas
 const imagens = {
   logotipo: Pimg1,
   flyer: Pimg2,
   motion: Pimg3,
   'projetos gráficos': Pimg4,
 };


 // Normaliza a subcategoria para comparações sem diferenças de capitalização ou espaços extras
 const nomeProdNormalizada = product.nome_produto.toLowerCase().trim();


 // Atribui a imagem correspondente com base na subcategoria normalizada
 const imagemProduto = imagens[nomeProdNormalizada] || Pimg1;


 return (
   <div className={style.produto}>
     {product.oferta && product.oferta.trim() !== "" && (
       <div
         className={style.promo_fita3}
         style={{ backgroundColor: product.oferta === 'Novo' ? '#388E3C' : '#D32F2F' }}>
         {product.oferta}
       </div>
     )}
     <Image src={imagemProduto} className={style.prod_img} alt="Produto" />
     <h1 className={style.cat_text}>Mídia Visual</h1>
     <h2 className={style.sub_text}>{product.nome_produto}</h2>
     <div className={style.linha_esquerda}></div>
     <div className={style.icones}>
       <Tooltip title={!logado ? mensagem('favoritar') : ''} placement="top">
         <button
           type="button"
           className={style.icone_fav}
           onClick={handleFavorite}
           disabled={!logado}>
           {favorito ? <MdFavorite style={{ color: '#fdd54f' }} /> : <MdFavoriteBorder />}
         </button>
       </Tooltip>


       <Tooltip title={!logado ? mensagem('adicionar ao carrinho') : ''} placement="top">
         <button
           type="button"
           className={style.icone_car}
           onClick={handleCart}
           disabled={!logado}
         >
           {carrinho ? <HiShoppingCart style={{ color: '#fdd54f' }} /> : <HiOutlineShoppingCart />}
         </button>
       </Tooltip>


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
