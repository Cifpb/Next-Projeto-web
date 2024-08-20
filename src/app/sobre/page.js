import "./About.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import Aimg1 from "../../../public/about/foto.jpg";
import Aimg2 from "../../../public/about/logo-sala.png";
import Image from "next/image";

export default function About() {

  return(
  
    <div className="About">
     <Header />
      <div className="sobre-empresa">
        <div className="container">
          <div className="text-sobre">
            <p className="text-s"><strong>SOBRE A EMPRESA</strong></p> <br />
            <p>
              A empresa Sala da Mídia foi criada em 2017 com o intuito de modificar
              o jeito e os métodos que as agências convencionais trabalham. Com
              especialidade em mídia visual para artistas e eventos, trazemos uma
              forma humanizada de atendimento e entrega dos serviços. Trabalhando
              com grandes marcas e artistas, criamos um grande vinculo no mercado,
              abrangindo nossos serviços em todo Brasil e exterior, onde já
              prestamos serviços para clientes da Suíça, França e EUA.
            </p>
            <p>
              A Sala é uma agência que busca resolver os problemas do cliente e
              engrandecer a imagem de forma natural. Ultimamente, vemos uma
              robotização muito grande na área. Na parte de criação de marca,
              buscamos chegar na ideia desejada pelo cliente, trazendo referência
              modernas sem perder o lado convencional de criação.
            </p>
            <p>
              Garantimos o melhor preço e prazo do mercado com um atendimento
              totalmente diferenciado. Ao contratar nossos serviços, você sentirá
              diferença e verá que realmente vestimos a camisa da empresa, onde
              iremos agregar valor e irreverência.
            </p>
            <p> Vem fazer parte do time da Sala!</p>
          </div>
          <div className="divisao" />
          <div className="img-sobre">
            <Image src={Aimg2} alt= "foto"/>
          </div>
        </div>
      </div>
      <div className="sobre-empresa2">
        <div className="container">
          <div className="img-dono">
            <Image src={Aimg1} alt= "foto"/>
          </div>
          <div className="divisao" />
          <div className="text-dono">
            <p className="text-s"><strong>DONO DA EMPRESA</strong></p> <br />
            <p>
              Moises de Luna Santos, mais conhecido como Mhoyses Design, iniciou sua
              carreira como Designer gráfico em meados de 2012/2013, com apenas 16
              anos. Com uma relação grande no meio musical da região e amizades com
              artistas regionais e nacionais, seus trabalhos iam sendo cada vez mais
              conhecidos por grandes escritórios do ramo de eventos e carreira
              artística musical. Com uma grande demanda, ele via a necessidade de
              criar uma empresa que abrangesse a sua clientela e os seus trabalhos.
              Atualmente, atua como Designer de Mídia Visual, Produtor Artístico e
              Empresário, possuindo uma extensa quantidade de clientes em suas mais
              variadas especificidades, tanto do meio artístico/eventos como em
              geral de empresas, negócios e profissionais liberais.
            </p>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
}