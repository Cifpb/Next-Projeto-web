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


// Lista de Imagens do Carrosel 
const carouselImages = [
  { id: 'carouselImg1', img: Cimg1 },
  { id: 'carouselImg2', img: Cimg2 },
  { id: 'carouselImg3', img: Cimg3 },
];

// Imagem Unica das Marcas que passaram pela Empresa
const times = [
  {id:'times01', img: MPimg}
]

// Lista de Principais Trabalhos
const trabalhos = [
  { id: 'trabalho1', img: Timg1, description: 'DESENVOLVIMENTO DE LOGOTIPOS' },
  { id: 'trabalho2', img: Timg2, description: 'DESIGN DE FLYERS' },
  { id: 'trabalho3', img: Timg3, description: 'ARTE PARA PROJETOS GRÁFICOS' },
  { id: 'trabalho4', img: Timg4, description: 'GESTÃO ESTRATÉGICA DE REDES SOCIAIS' },
];

// Lista de Cards
const cards = [
  { id: 'card001', category: 'MÍDIA VISUAL', subCategory: 'Motion', promotion: '5%', img: CDimg1, title: 'PROMOÇÃO ESPECIAL', content: 'Motions em promoção! Destaque suas mensagens de forma única e envolvente.' },
  { id: 'card002', category: 'MÍDIA VISUAL', subCategory: 'Projetos Gráficos', promotion: 'Novo', img: CDimg2, title: 'VENNHA CONFERIR:', content: 'Projetos Gráficos incríveis! Faça uma repaginada e dê vida nova ao seu automóvel!' },
  { id: 'card003', category: 'MÍDIA VISUAL', subCategory: 'Logotipo/Identidade Visual', promotion: '15%', img: CDimg3, title: 'PROMOÇÃO ESPECIAL:', content: 'Logotipos em promoção! Deixe sua marca nas mãos dos especialistas!' },
  { id: 'card004', category: 'MÍDIA VISUAL', subCategory: 'Flyer', promotion: '25%', img: CDimg3, title: 'PROMOÇÃO ESPECIAL:', content: 'Flyers em promoção! Compre 5 flyers ou mais e aproveite 25% de desconto.' },
  { id: 'card005', category: 'SOCIAL MÍDIA', subCategory: 'Gestão de Redes Sociais', promotion: 'Novo', img: CDimg3, title: 'VENNHA CONFERIR:', content: 'Projetos incriveis de Gestão de Redes Sociais! Maximize presença online e engaje!' },
  { id: 'card006', category: 'SOCIAL MÍDIA', subCategory: 'Impulsionamento', promotion: 'Novo', img: CDimg3, title: 'VENNHA CONFERIR:', content: 'Projetos de Impulsionamento imperdíveis! Amplie alcance e conquiste seguidores!' },
];

// Máximo de caracteres no content para tudo ficar alinhado deve ser 83.
// Minimo coloque 72.

export { carouselImages, times, trabalhos, cards };

// Lógica dos Cards
const cardTela = (card) => (
  <div className="card" key={card.id} id={card.id}>
    <div
      className="promo-fita"
      style={{ backgroundColor: card.promotion === 'Novo' ? '#388E3C' : '#D32F2F' }}> {card.promotion}
    </div>
    <Image src={card.img} alt= "logo" className= "imagemCard"/>
    <h2 className="titulo-text">{card.title}</h2>
    <p className="conteudo-text">{card.content}</p>
    <button type="button" className="botao-card">
      <a className="texto-bntCard" 
        href={`/produtos-e-servicos/${card.subCategory}`} >
        COMPRAR
      </a>
    </button>
  </div>
);

const  renderizadorCards= () => {
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
        <div key={index} >
          <div className="cards"> {group.map(cardTela)} </div>
        </div>
      ))}
    </Carousel>
  );
};

export { renderizadorCards };