'use client';
import { useState, useEffect } from 'react';
import { MdFavoriteBorder } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
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

  useEffect(() => {
    const status = sessionStorage.getItem('logado');
    setLogado(status === 'true');
  }, []);

  const mensagem = (action) => {
    return (
      <center style={{ fontSize: '95%',  padding: '0.5%'}} >
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

  //Imagens Corretas
  const imagens = {
    logotipo: Pimg1,
    flyer: Pimg2,
    motion: Pimg3,
    'projetos gráficos': Pimg4,
  };

  // Normaliza a subcategoria para comparações sem diferenças de capitalização ou espaços extras
  const subCategoriaNormalizada = product.sub_categoria.toLowerCase().trim();

  // Atribui a imagem correspondente com base na subcategoria normalizada
  const imagemProduto = imagens[subCategoriaNormalizada]; 

  return (
    <div className={style.produto}>
      <Image src={imagemProduto} className={style.prod_img} alt="Produto" />
      <h1 className={style.cat_text}>Mídia Visual</h1>
      <h2 className={style.sub_text}>{product.sub_categoria}</h2>
      <div className={style.linha_esquerda}></div>
      <div className={style.icones}>
        <Tooltip title={!logado ? mensagem('favoritar') : ''} placement="top">
          <button
            type="button"
            className={style.icone_fav}
            onClick={() => handleClick('favoritar')}
            disabled={!logado}
          >
            <MdFavoriteBorder />
          </button>
        </Tooltip>

        <Tooltip title={!logado ? mensagem('adicionar ao carrinho') : ''} placement="top">
          <button
            type="button"
            className={style.icone_car}
            onClick={() => handleClick('adicionar ao carrinho')}
            disabled={!logado}
          >
            <HiOutlineShoppingCart />
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
