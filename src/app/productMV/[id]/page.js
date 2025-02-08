import { MdFavoriteBorder } from "react-icons/md";
import Footer from "../../footer/footer";
import { Carousel } from "antd";
import { getprodutoById } from '../../../lib/produto';
import Image from "next/image";
import style from './page.module.css';
import logo1 from "../../../../public/produtos/produtos-pag/logotipo/logotipo1.png";
import proj1 from "../../../../public/produtos/produtos-pag/projG/projG1.png";

export default async function ProductsMV({ params }) {

  const produtoMV = await getprodutoById(params.id);

  return (
    <div className={style.tela_produto}>
      <div className={style.idVisual}>
        <div className={style.retanguloProdMV}>
          <div className={style.parte1} />
          <div className={style.parte3} />
          <div className={style.parte1} />
        </div>

        <center>
          <h1 className={style.galeria_text}>EXPLORE NOSSA GALERIA</h1>
          <div className={style.line}></div>
        </center>

        <div className="carousel-container">
          <Carousel autoplay>
            <div><Image src="/produtos/produtos-pag/projG/projG1.png" width={1920} height={350} alt="Produto" /></div>
            <div><Image src="/produtos/produtos-pag/logotipo/logotipo1.png" width={1920} height={350} alt="Produto" /></div>
            <div><Image src="/produtos/produtos-pag/logotipo/logotipo1.png" width={1920} height={350} alt="Produto" /></div>
            <div><Image src="/produtos/produtos-pag/logotipo/logotipo1.png" width={1920} height={350} alt="Produto" /></div>
            <div><Image src="/produtos/produtos-pag/logotipo/logotipo1.png" width={1920} height={350} alt="Produto" /></div>
            <div><Image src="/produtos/produtos-pag/logotipo/logotipo1.png" width={1920} height={350} alt="Produto" /></div>
          </Carousel>
        </div>

        <div className={style.itens_juntos_MV}>
          <div className={style.itens_direita_text}>
            <h1 className={style.categoria_text}>Mídia Visual</h1>
            <h2 className={style.nomeProd_text}>{produtoMV.nome_produto}</h2>
            <h1 className={style.descricao_text}>DESCRIÇÃO</h1>
            <h2 className={style.conteudoDes_text}>{produtoMV.descricao}</h2>
          </div>

          <div className={style.itens_esquerda_pag}>
            <button type="button" className={style.favorito_PM}><MdFavoriteBorder /></button>
            <div className={style.pagamento_pix}>
              <h1 className={style.tipopg1_text}>
                A partir de R$ {produtoMV.valor}
              </h1>
              <h2 className={style.pix_text}>no pix</h2>
            </div>
            <div className={style.cartao_credito}>
              <h1 className={style.tipopg4_text}>A taxa de maquineta será combinada via WhatsApp</h1>
            </div>
            <button type="button" className={style.botao_adicionar}>Adicionar ao Carrinho</button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}