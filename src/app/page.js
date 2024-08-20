import { Carousel } from "antd";
import Footer from "./footer/footer";
import Header from "./header/header";
import "./page.module.css";
import { carouselImages, times, trabalhos, renderizadorCards } from './homeArrays/arrays';
import Image from "next/image";

export default function Home() {

  return (
    <div className="pagina-inicial">
      <Header />
      <div className="telaH"> 
        <Carousel autoplay>
          {carouselImages.map((image) => (
            <div key={image.id}>
               <Image src={image.img} alt= "Logo" className= "img-carrosel"/>
            </div>
          ))}
        </Carousel>

          <center>
            <h1 className="home-text"> PRINCIPAIS TRABALHOS </h1>
          </center>
          <div className="trabalhos-img">
            {trabalhos.map((trabalho) => (
              <div className="item" key={trabalho.id} id={trabalho.id}>
                <Image src={trabalho.img} alt= {trabalho.description}/>
                <p className="text-descritivo">{trabalho.description}</p>
              </div>
            ))}
          </div>

          <center>
            <h1 className="home-text"> NOVIDADES </h1>
          </center>
          {renderizadorCards()}

          <center>
            <h1 className="time-text"> QUEM JÁ FEZ OU FAZ </h1>
            <h2 className="time1-text"> PARTE DO TIME </h2>
            {times.map((time) => (
              <div key={time.id} id={time.id}>
                <Image src={time.img} className="times-img"/>
              </div>
            ))}
          </center>
      </div>
      <Footer />
    </div>
  );
}