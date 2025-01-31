import Cimg1 from "../../../public/home/carrosel/marca1.png";
import Cimg2 from "../../../public/home/carrosel/marca2.png";
import Timg1 from "../../../public/home/trabalhos/logotipo.png";
import Timg2 from "../../../public/home/trabalhos/flyer.png";
import Timg3 from "../../../public/home/trabalhos/projGrafico.png";
import Plimg1 from "../../../public/home/planos/imagens/pacoteGold.png";
import Plimg2 from "../../../public/home/planos/imagens/pacotePlatinum.png";
import Plimg3 from "../../../public/home/planos/imagens/pacoteDiamond.png";
// import DPpdf1 from "../../../public/home/planos/documentos/documento-plano1.pdf";
// import DPpdf2 from "../../../public/home/planos/documentos/documento-plano2.pdf";
// import DPpdf3 from "../../../public/home/planos/documentos/documento-plano3.pdf";
import MPimg from "../../../public/home/marcas/times.png";
import Image from "next/image";
import { Carousel } from "antd";

// Arrays da Tela Inicial

// Lista de Imagens do Carrosel
const carouselImages = [
  { id: "carouselImg1", img: Cimg1 },
  { id: "carouselImg2", img: Cimg2 }
];

// Imagem Unica das Marcas que passaram pela Empresa
const times = [{ id: "times01", img: MPimg }];

// Lista de Principais Trabalhos
const trabalhos = [
  { id: "trabalho1", img: Timg1, description: "LOGOTIPOS/Identidade Visual" },
  { id: "trabalho2", img: Timg2, description: "FLYERS" },
  { id: "trabalho3", img: Timg3, description: "Projetos Gráficos" }
];

// Lista de Cards
const cards = [
  {
    id: "card001",
    tipo: "Gold",
    valor: "1000,00",
    img: Plimg1,
    content:
      "15 post Mensais. 15 Stories Mensais. Desenvolvimento das Artes. Desenvolvimento do Conteúdo.",
    // document: DPpdf1,
    emblem: "",
  },
  {
    id: "card002",
    tipo: "Platinum",
    valor: "1800,00",
    img: Plimg2,
    content:
      "24 post Mensais. 24 Stories Mensais. Desenvolvimento das Artes. Desenvolvimento do Conteúdo. Gerenciamento de Anúncios.",
    // document: DPpdf2,
    emblem: "",
  },
  {
    id: "card003",
    tipo: "Diamond",
    valor: "2800",
    img: Plimg3,
    content:
      "Quantidade de post Mensais LIVRE. Quantidade de Stories Mensais LIVRE. Desenvolvimento das Artes. Desenvolvimento do Conteúdo. Gerenciamento de Anúncios.",
    // document: DPpdf3,
    emblem: "",
  },
];

export { carouselImages, times, trabalhos, cards };

// Lógica dos Cards
const cardTela = (card) => (
  <div className="card" key={card.id} id={card.id}>
    <Image src={card.img} className="imagemCard" alt="logo" />
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
        <a className="texto-bntCard">
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