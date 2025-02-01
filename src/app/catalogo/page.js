import Image from 'next/image';
import Link from 'next/link';
import { Carousel } from 'antd';
import Footer from '../footer/footer';
import Product from '../product/product';
import MenuProdutos from '../../componentes/produtos/menu';
import Cimg from '../../../public/catalogo/decoracaoImg.png';
import style from './page.module.css';
import db from '../../lib/db';

export default async function Catalog() {
  
  const produtos = await db.query('select * from produtos');

  const size = produtos.rows.length / 2;
  let matrizProdutos = [];
  let j = 0;
  for (let i = 0; i < size; i++) {
    matrizProdutos[i] = [produtos.rows[j++], produtos.rows[j++]];
  }

  function getItem(label, key, path) {
    return {
      key,
      label: <Link href={path} className={style.menu_link}>{label}</Link>,
    };
  }

  const items = [
    {
      label: <span className={style.menu_midia_visual}>MÍDIA VISUAL</span>,
      key: 'sub1',
      children: produtos.rows.map(produto =>
        getItem(produto.nome_produto, produto.id, `/productMV/${produto.id}`)
      ),
    },
  ];

  return (
    <div className={style.telaC}>
      <div className={style.catalogo}>
        
        <MenuProdutos items={items} />

        <center>
          <Image src={Cimg} className={style.catalogo_img} alt="logo" />
          <h1 className={style.navegador_text}>NAVEGUE PELAS CATEGORIAS</h1>
          <div className={style.decoracao_line}></div>
        </center>

        <Carousel autoplay dots={{ className: style.custom_dots }}>
          {matrizProdutos.map((prods) => (
            <div className={style.carrosel} key={prods[0]?.id}>
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
