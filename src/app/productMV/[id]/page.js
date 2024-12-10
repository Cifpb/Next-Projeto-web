import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { HiOutlineShoppingCart, HiShoppingCart } from "react-icons/hi";
import Footer from "../../footer/footer";
import { Carousel } from "antd";
import { getprodutoById } from "@/lib/produto";
import Image from "next/image";

export default async function ProductsMV({ productsMV, params }) {

  const produtoMV = await getprodutoById(params.id);

  if (!produtoMV) {
    return <p>Produto não encontrado</p>;
  }

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
            {produtoMV.oferta != "" && (
              <div
                className="promo-fita2"
                style={{
                  backgroundColor:
                  produtoMV.oferta === "Novo" ? "#388E3C" : "#D32F2F",
                }}
              >
                {produtoMV.oferta}
              </div>
            )}
            <Image src="/produtos/produtos-pag/logotipo/logotipo1.png" fill={true} />
          </div>
          <div>
          <Image src="/produtos/produtos-pag/logotipo/logotipo1.png" fill={true}/>
          </div>
          <div>
          <Image src="/produtos/produtos-pag/logotipo/logotipo1.png" fill={true} />
          </div>
          <div>
          <Image src="/produtos/produtos-pag/logotipo/logotipo1.png" fill={true} />
          </div>
          <div>
          <Image src="/produtos/produtos-pag/logotipo/logotipo1.png" fill={true} />
          </div>
          <div>
          <Image src="/produtos/produtos-pag/logotipo/logotipo1.png" fill={true} />
          </div>
        </Carousel>

        <div className="itens-juntos-MV">
          <div className="itens-direita-text">
            <h1 className="categoria-text">Mídia Visual</h1>
            <h2 className="nomeProd-text">{produtoMV.sub_categoria}</h2>
            <h1 className="descricao-text"> DESCRIÇÃO </h1>
            <h2 className="conteudoDes-text">{produtoMV.descricao}</h2>
          </div>

          <div className="itens-esquerda-pag">
            <button type="button" className="favorito-PM"> <MdFavoriteBorder /></button>
            <button type="button" className="carrinho-PM"> <HiOutlineShoppingCart /> </button>
            <div className="pagamento-pix">
              <h1 className="tipopg1-text">
                A partir de R$ {produtoMV.valor}
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