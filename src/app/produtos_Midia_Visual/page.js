import React from "react";
import { useFavoriteContext } from "../context/FavoritesContext";
import { useCartContext } from "../context/CartContext";
import { produtos } from "../product/product";
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

const prodListaMV = [
  {
    id: "logotipoP1",
    img1: Limg1,
    img2: Limg2,
    img3: Limg3,
    img4: Limg4,
    img5: Limg5,
    img6: Limg6,
    category: "MÍDIA VISUAL",
    subCategory: "Logotipo/Identidade Visual",
    Description:
      "Destaque-se no mercado com nossas identidades visuais personalizadas! Ideal para empresas e artistas que desejam promover sua marca com criatividade e qualidade.",
    promotion: "",
    price1: "800,00",
    price2: "1000,00",
    parcelas: "10 X 100,00",
  },
  {
    id: "flyerP2",
    img1: Fimg1,
    img2: Fimg2,
    img3: Fimg3,
    img4: Fimg4,
    img5: Fimg5,
    img6: Fimg6,
    category: "MÍDIA VISUAL",
    subCategory: "Flyer",
    Description:
      "Destaque-se no mercado com nossos flyers exclusivos! Ideal para empresas e artistas que buscam impactar seu público-alvo com mensagens convincentes e designs memoráveis.",
    promotion: "Novo",
    price1: "150,00",
    price2: "200,00",
    parcelas: "5 X 40,00",
  },
  {
    id: "motionP3",
    img1: Mimg1,
    img2: Mimg2,
    img3: Mimg3,
    img4: Mimg4,
    img5: Mimg5,
    img6: Mimg6,
    category: "MÍDIA VISUAL",
    subCategory: "Motion",
    Description:
      "Destaque-se no mercado com nossos motions dinâmicos! Ideal para empresas e artistas que buscam transmitir sua mensagem de forma envolvente e cativante.",
    promotion: "",
    price1: "250,00",
    price2: "300,00",
    parcelas: "5 X 60,00",
  },
  {
    id: "projetosGrafP4",
    img1: PGimg1,
    img2: PGimg2,
    img3: PGimg3,
    img4: PGimg4,
    img5: PGimg5,
    img6: PGimg6,
    category: "MÍDIA VISUAL",
    subCategory: "Projetos Gráficos",
    Description:
      "Destaque-se no mercado com nossos projetos gráficos de qualidade! Ideal para empresas e artistas que buscam capturar a atenção do público com designs marcantes e mensagens persuasivas.",
    promotion: "10%",
    price1: "1000,00",
    price2: "1200,00",
    parcelas: "10 X 120,00",
  },
];

export { prodListaMV };

export default function ProductsMV({ productsMV, id }) {
  // Favoritos
  const { favorite, addFavorite } = useFavoriteContext();
  const isFavorite = favorite.some((fav) => fav.id === productsMV.id);

  // Identifica pelo id o ProductsMV corespondente ao Product
  const identificadorFavoritos = () => {
    const produtoCorrespondente = produtos.find(
      (prod) => prod.id === productsMV.id,
    );
    if (produtoCorrespondente) {
      addFavorite(produtoCorrespondente);
    }
  };

  // Carrinho
  const { cart, addToCart, updateQuantity } = useCartContext();
  const isCart = cart.some((cart) => cart.id === productsMV.id);

  // Identifica pelo id o ProductsMV corespondente ao Product
  const identificadorCarrinho = () => {
    const produtoCorrespondente = produtos.find(
      (prod) => prod.id === productsMV.id,
    );
    if (produtoCorrespondente) {
      addToCart(produtoCorrespondente);
    }
  };

  // Lógica do Botão Adicionar ao Carrinho
  const botaoCarrinho = () => {
    const produtoCorrespondente = produtos.find(
      (prod) => prod.id === productsMV.id,
    );
    if (produtoCorrespondente) {
      const produtoNoCarrinho = cart.find(
        (item) => item.id === produtoCorrespondente.id,
      );
      if (produtoNoCarrinho) {
        updateQuantity(
          produtoCorrespondente.id,
          produtoNoCarrinho.quantidade + 1,
        );
      } else {
        addToCart(produtoCorrespondente);
      }
    }
  };

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
            {productsMV.promotion != "" && (
              <div
                className="promo-fita2"
                style={{
                  backgroundColor:
                    productsMV.promotion === "Novo" ? "#388E3C" : "#D32F2F",
                }}
              >
                {" "}
                {productsMV.promotion}
              </div>
            )}
            <img src={productsMV.img1} className="imagem-carrossel" />
          </div>
          <div>
            <img src={productsMV.img2} className="imagem-carrossel" />
          </div>
          <div>
            <img src={productsMV.img3} className="imagem-carrossel" />
          </div>
          <div>
            <img src={productsMV.img4} className="imagem-carrossel" />
          </div>
          <div>
            <img src={productsMV.img5} className="imagem-carrossel" />
          </div>
          <div>
            <img src={productsMV.img6} className="imagem-carrossel" />
          </div>
        </Carousel>

        <div className="itens-juntos-MV">
          <div className="itens-direita-text">
            <h1 className="categoria-text">{productsMV.category}</h1>
            <h2 className="nomeProd-text">{productsMV.subCategory}</h2>
            <h1 className="descricao-text"> DESCRIÇÃO </h1>
            <h2 className="conteudoDes-text">{productsMV.Description}</h2>
          </div>

          <div className="itens-esquerda-pag">
            <button
              type="button"
              className="favorito-PM"
              onClick={identificadorFavoritos}
            >
              {!isFavorite ? (
                <MdFavoriteBorder />
              ) : (
                <MdFavorite style={{ color: "#FFB300" }} />
              )}
            </button>
            <button
              type="button"
              className="carrinho-PM"
              onClick={identificadorCarrinho}
            >
              {!isCart ? (
                <HiOutlineShoppingCart />
              ) : (
                <HiShoppingCart style={{ color: "#FFB300" }} />
              )}
            </button>
            <div className="pagamento-pix">
              <h1 className="tipopg1-text">
                {" "}
                A partir de R$ {productsMV.price1}{" "}
              </h1>
              <h2 className="pix-text"> no pix </h2>
            </div>
            <div className="cartao-credito">
              <h1 className="tipopg2-text"> cartão de crédito </h1>
              <h2 className="tipopg3-text">
                {" "}
                R$ {productsMV.price2} <br /> {productsMV.parcelas}{" "}
              </h2>
            </div>
            <button
              type="button"
              className="botao-adicionar"
              onClick={botaoCarrinho}
            >
              {" "}
              Adicionar ao Carrinho{" "}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}