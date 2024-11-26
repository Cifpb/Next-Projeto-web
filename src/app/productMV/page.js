import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import Footer from "../footer/footer";
import { Carousel } from "antd";
import Limg1 from "../../../public/produtos/produtos-pag/logotipo/logotipo1.png";
import Limg2 from "../../../public/produtos/produtos-pag/logotipo/logotipo1.png";
import Limg3 from "../../../public/produtos/produtos-pag/logotipo/logotipo1.png";
import Limg4 from "../../../public/produtos/produtos-pag/logotipo/logotipo1.png";
import Limg5 from "../../../public/produtos/produtos-pag/logotipo/logotipo1.png";
import Limg6 from "../../../public/produtos/produtos-pag/logotipo/logotipo1.png";
import Fimg1 from "../../../public/produtos/produtos-pag/flyer/flyer1.png";
import Fimg2 from "../../../public/produtos/produtos-pag/flyer/flyer1.png";
import Fimg3 from "../../../public/produtos/produtos-pag/flyer/flyer1.png";
import Fimg4 from "../../../public/produtos/produtos-pag/flyer/flyer1.png";
import Fimg5 from "../../../public/produtos/produtos-pag/flyer/flyer1.png";
import Fimg6 from "../../../public/produtos/produtos-pag/flyer/flyer1.png";
import Mimg1 from "../../../public/produtos/produtos-pag/motion/motion1.png";
import Mimg2 from "../../../public/produtos/produtos-pag/motion/motion1.png";
import Mimg3 from "../../../public/produtos/produtos-pag/motion/motion1.png";
import Mimg4 from "../../../public/produtos/produtos-pag/motion/motion1.png";
import Mimg5 from "../../../public/produtos/produtos-pag/motion/motion1.png";
import Mimg6 from "../../../public/produtos/produtos-pag/motion/motion1.png";
import PGimg1 from "../../../public/produtos/produtos-pag/projG/projG1.png";
import PGimg2 from "../../../public/produtos/produtos-pag/projG/projG1.png";
import PGimg3 from "../../../public/produtos/produtos-pag/projG/projG1.png";
import PGimg4 from "../../../public/produtos/produtos-pag/projG/projG1.png";
import PGimg5 from "../../../public/produtos/produtos-pag/projG/projG1.png";
import PGimg6 from "../../../public/produtos/produtos-pag/projG/projG1.png";
import db from "@/lib/db";

export default async function ProductsMV({ productsMV, id }) {

    const produtos = await db.query("select * from produto");

  return (
    <div className="tela-produto">
      <div className="idVisual">
        <div className="retangulo">
          <div className="parte1" />
          <div className="parte3" />
          <div className="parte1" />
        </div>

        <center>
          <h1 className="galeria-text"> EXPLORE NOSSA GALERIA </h1>
          <div className="line"></div>
        </center>

        <Carousel autoplay>
          <div>
            {productsMV.oferta != "" && (
              <div
                className="promo-fita2"
                style={{
                  backgroundColor:
                    productsMV.oferta === "Novo" ? "#388E3C" : "#D32F2F",
                }}
              >
                {productsMV.oferta}
              </div>
            )}
            <img src={Limg1} className="imagem-carrossel" />
          </div>
          <div>
            <img src={Limg1} className="imagem-carrossel" />
          </div>
          <div>
            <img src={Limg1} className="imagem-carrossel" />
          </div>
          <div>
            <img src={Limg1} className="imagem-carrossel" />
          </div>
          <div>
            <img src={Limg1} className="imagem-carrossel" />
          </div>
          <div>
            <img src={Limg1} className="imagem-carrossel" />
          </div>
        </Carousel>

        <div className="itens-juntos-MV">
          <div className="itens-direita-text">
            <h1 className="categoria-text">Mídia Visual</h1>
            <h2 className="nomeProd-text">{productsMV.sub_categoria}</h2>
            <h1 className="descricao-text"> DESCRIÇÃO </h1>
            <h2 className="conteudoDes-text">{productsMV.descricao}</h2>
          </div>

          <div className="itens-esquerda-pag">
            <button type="button" className="favorito-PM"> <MdFavoriteBorder /></button>
            <button type="button" className="carrinho-PM"> <HiOutlineShoppingCart /> </button>
            <div className="pagamento-pix">
              <h1 className="tipopg1-text">
                A partir de R$ {productsMV.valor}
              </h1>
              <h2 className="pix-text"> no pix </h2>
            </div>
            <div className="cartao-credito">
              <h1 className="tipopg2-text"> cartão de crédito </h1>
              <h2 className="tipopg3-text">
                
                R$ 1200,00 <br /> 100,00 X 12
              </h2>
            </div>
            <button type="button" className="botao-adicionar"> Adicionar ao Carrinho </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}