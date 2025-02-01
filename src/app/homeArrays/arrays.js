import Cimg1 from "../../../public/home/carrosel/marca1.png";
import Cimg2 from "../../../public/home/carrosel/marca2.png";
import Timg1 from "../../../public/home/trabalhos/logotipo.png";
import Timg2 from "../../../public/home/trabalhos/flyer.png";
import Timg3 from "../../../public/home/trabalhos/projGrafico.png";
import Plimg1 from "../../../public/home/planos/imagens/pacoteGold.png";
import Plimg2 from "../../../public/home/planos/imagens/pacotePlatinum.png";
import Plimg3 from "../../../public/home/planos/imagens/pacoteDiamond.png";
import MPimg from "../../../public/home/marcas/times.png";
import Image from "next/image";
import { Carousel } from "antd";
import db from "../../lib/db";

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

const planosImagens = {
  gold: Plimg1, 
  platinum: Plimg2, 
  diamond: Plimg3, 
};

// Função para renderizar os cards
const renderizadorCards = async () => {
  const planos = await db.query("SELECT * FROM planos");

  const cardTela = (card) => {
    
    const tipoPlanoNormalizado = card.tipo.toLowerCase().trim();
    const imagemPlano = planosImagens[tipoPlanoNormalizado];  

    return (
      <div className="card" key={card.id} id={card.id}>
        <Image src={imagemPlano} className="imagemCard" alt={card.tipo} />
        <div className="contentCard">
          <div className="conteudoDiv">
            {card.conteudo.split(".").map((sentence, index) => {
              if (sentence.trim() !== "") {
                return <p className="conteudo-text" key={index}>{sentence}</p>;
              }
              return null;
            })}
          </div>
          <button type="button" className="botao-card">
            <a
              className="texto-bntCard"
              href="https://api.whatsapp.com/send/?phone=558386795396&text&type=phone_number&app_absent=0"
              target="_blank"
            >
              SAIBA MAIS
            </a>
          </button>
        </div>
      </div>
    );
  };

  if (planos.rows.length < 4) {
    return <div className="cards">{planos.rows.map(cardTela)}</div>;
  }

  const cardGrupoCarrosel = [];
  for (let i = 0; i < planos.rows.length; i += 3) {
    cardGrupoCarrosel.push(planos.rows.slice(i, i + 3));
  }

  return (
    <Carousel autoplay dots className="custom_dots1">
      {cardGrupoCarrosel.map((group, index) => (
        <div key={index}>
          <div className="cards"> {group.map(cardTela)} </div>
        </div>
      ))}
    </Carousel>
  );
};

export { carouselImages, times, trabalhos, renderizadorCards };