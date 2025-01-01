import Image from "next/image";
import Link from 'next/link';
import { MdFavoriteBorder } from 'react-icons/md';
import { HiOutlineShoppingCart } from 'react-icons/hi';
import { RiMenuSearchLine, RiMenuSearchFill } from "react-icons/ri";
import { Carousel } from "antd";
import { Button, Menu } from 'antd';
import Footer from "../footer/footer";
import Product from "../product/product";
import Cimg from "../../../public/catalogo/decoracao-img.png";
import style from './page.module.css';
import db from '../../lib/db';

export default async function Catalog() {

  const produtos = await db.query("select * from produto");

  const size = produtos.rows.length / 2;
  let matrizProdutos = [];
  let j = 0;
  for (let i = 0; i < size; i++) {
    matrizProdutos[i] = [produtos.rows[j++], produtos.rows[j++]];
  }

  // Função para criar os itens do menu
  function getItem(label, key, path) {
    return {
      key,
      label: <Link href={path} className={style.menu_link}>{label}</Link>,
    };
  }

  // Construção do menu de categorias
  const items = [
    {
      label: <span className={style.menu_midia_visual}>MÍDIA VISUAL</span>,
      key: 'sub1',
      children: produtos.rows.map(produto =>
        getItem(
          produto.sub_categoria,
          produto.id,
          `/productMV/${produto.id}`
        )
      ),
    },
  ];

  // Arumar o Menu 
  // Deve aparecer este icone RiMenuSearchLine e o menu deve estar fechado
  // Deve aparecer este icone RiMenuSearchFill e o menu deve estar aberto

  return (
    <div className={style.telaC}>
      <div className={style.catalogo}>
        <div className={style.menuCat}>
          <div className={style.itens_direita}>
            <Button type="button" className={style.filtro}>
              <RiMenuSearchLine />
            </Button>
            <div className={style.fundo_itens}>
              <Menu
                className={style.menu_itens}
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="white"
                items={items}
              />
            </div>
          </div>
          <div className={style.itens_esquerda}>
            <Link href="/favoritos">
              <button type="button" className={style.favorito}>
                <MdFavoriteBorder />
              </button>
            </Link>
            <div className={style.espaco_fc}></div>
            <Link href="/carrinho">
              <button type="button" className={style.carrinho}>
                <HiOutlineShoppingCart />
              </button>
            </Link>
          </div>
        </div>

        <center>
          <Image src={Cimg} className={style.catalogo_img} alt="logo" />
          <h1 className={style.navegador_text}>NAVEGUE PELAS CATEGORIAS</h1>
          <div className={style.decoracao_line}></div>
        </center>

        <Carousel autoplay  dots={{ className: style.custom_dots }} >
          {matrizProdutos.map((prods) => (
            <div className={style.carrosel}>
              <Product product={prods[0]} />
              {prods[1] && <Product product={prods[1]} />}
            </div>
          ))}
        </Carousel>

        <center>
          <h1 className={style.atencao_text}>
            ATENÇÃO: OS PREÇOS DOS PRODUTOS ABAIXO SÃO ESTIMATIVOS E PODEM VARIAR DE ACORDO COM A SOLICITAÇÃO FEITA PARA CADA PRODUTO, APÓS O DIÁLOGO NO WHATSAPP COM O PROPRIETÁRIO.
          </h1>
        </center>

      </div>
      <Footer />
    </div>
  );
}
