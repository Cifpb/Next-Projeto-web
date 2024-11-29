import Cimg1 from "../../../public/home/carrosel/marca1.png";
import Cimg2 from "../../../public/home/carrosel/marca2.png";
import Cimg3 from "../../../public/home/carrosel/marca3.png";
import Timg1 from "../../../public/home/trabalhos/musical.png";
import Timg2 from "../../../public/home/trabalhos/midia.png";
import Timg3 from "../../../public/home/trabalhos/plotagem.png";
import Timg4 from "../../../public/home/trabalhos/identidade.png";
import CDimg1 from "../../../public/home/cards/a-loba.png";
import CDimg2 from "../../../public/home/cards/dono.png";
import CDimg3 from "../../../public/home/cards/plot-matheus.png";
import MPimg from "../../../public/home/marcas/times.png";
import Image from "next/image";
import { Carousel } from "antd";


// Arrays da Tela Inicial

// Lista de Imagens do Carrosel
const carouselImages = [
  { id: "carouselImg1", img: Cimg1 },
  { id: "carouselImg2", img: Cimg2 },
  { id: "carouselImg3", img: Cimg3 },
];

// Imagem Unica das Marcas que passaram pela Empresa
const times = [{ id: "times01", img: MPimg }];

// Lista de Principais Trabalhos
const trabalhos = [
  { id: "trabalho1", img: Timg1, description: "DEsenvolvimeto DE LOGOTIPOS" },
  { id: "trabalho2", img: Timg2, description: "DESIGN DE FLYERS" },
  { id: "trabalho3", img: Timg3, description: "Arte para Projetos Gráficos" },
  {
    id: "trabalho4",
    img: Timg4,
    description: "GESTÃO ESTRATÉGICA DE REDES SOCIAIS",
  },
];

// Lista de Cards
const cards = [
  {
    id: "card001",
    tipo: "Gold",
    valor: "1000,00",
    promotion: "",
    img: CDimg1,
    content:
      "15 post Mensais. 15 Stories Mensais. Desenvolvimento das Artes. Desenvolvimento do Conteúdo.",
    document: DPpdf1,
    emblem: "",
  },
  {
    id: "card002",
    tipo: "Platinum",
    valor: "1800,00",
    promotion: "Novo",
    img: CDimg2,
    content:
      "24 post Mensais. 24 Stories Mensais. Desenvolvimento das Artes. Desenvolvimento do Conteúdo. Gerenciamento de Anúncios.",
    document: DPpdf2,
    emblem: "",
  },
  {
    id: "card003",
    tipo: "Diamond",
    valor: "2800",
    promotion: "20%",
    img: CDimg3,
    content:
      "Quantidade de post Mensais LIVRE. Quantidade de Stories Mensais LIVRE. Desenvolvimento das Artes. Desenvolvimento do Conteúdo. Gerenciamento de Anúncios.",
    document: DPpdf3,
    emblem: "",
  },
];

export { carouselImages, times, trabalhos, cards };

// Lógica dos Cards
const cardTela = (card) => (
  <div className="card" key={card.id} id={card.id}>
    {card.promotion !== "" && (
      <div
        className="promo-fita"
        style={{ backgroundColor: card.promotion === "Novo" ? "#388E3C" : "#D32F2F" }} >
        {card.promotion}
      </div>
    )}
    <img src={card.img} className="imagemCard" alt="logo" />
    <div className="contentCard">
      <div className="conteudoDiv">
        {card.content.split(".").map((sentence, index) => {
          if (sentence.trim() !== "") {
            return <p className="conteudo-text" key={index}>{sentence}</p>;
          }
          return null;
        })}
      </div>
      <button type="button" className="botao-card">
        <a className="texto-bntCard" href={card.document}>
          SAIBA MAIS
        </a>
      </button>
    </div>
  </div>
);

const renderizadorCards = () => {
  if (cards.length < 4) {
    return <div className="cards">{cards.map(cardTela)}</div>;
  }

  const cardGrupoCarrosel = [];
  for (let i = 0; i < cards.length; i += 3) {
    cardGrupoCarrosel.push(cards.slice(i, i + 3));
  }

  return (
    <Carousel autoplay>
      {cardGrupoCarrosel.map((group, index) => (
        <div key={index}>
          <div className="cards"> {group.map(cardTela)} </div>
        </div>
      ))}
    </Carousel>
  );
};

export { renderizadorCards };