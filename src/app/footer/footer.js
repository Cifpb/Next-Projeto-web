import "./footer.css";
import Image from "next/image";
import Rimg from "../../../public/footer/logo.svg";
import Rimg1 from "../../../public/footer/whatsapp.svg";
import Rimg2 from "../../../public/footer/youtube.svg";
import Rimg3 from "../../../public/footer/facebook.svg";
import Rimg4 from "../../../public/footer/instagram.svg";
import Rimg5 from "../../../public/footer/tiktok.svg";

export default function Footer() {

return (
  <div className="tela-rodape">
    <div className= "footer">
      <div className="retanguloFooter">
        <div className="parte1" />
        <div className="parte2" />
        <div className="parte1" />
      </div>
      <footer className="rodape">
        <Image src={Rimg} alt= "logo" className= "logo"/>
        <div className="lista2">
          <h2>SOBRE</h2>
          <div className="lista4">
            <p>Agência de Publicidade e Marketing Digital</p>
            <p>Rua Eufrásio Câmara, 518</p>
            <p>Esperança PB</p>
            <p>CEP: 58135-000</p>
          </div>
        </div>
        <div className="lista2">
          <h2>HORÁRIO DE ATENDIMENTO</h2>
          <div className="lista4" >
            <p>Segunda a Sexta, das 08h às 18h</p>
          </div>
        </div>
        <div className="lista2">
          <h2>CONTATOS</h2>
          <div className="lista3">
            <a href="https://api.whatsapp.com/send/?phone=558386795396&text&type=phone_number&app_absent=0" target="_blank">
              <Image src={Rimg1} alt= "wats" className= "wats"/></a>
            <a href="https://www.youtube.com/@MhoysesDesign" target="_blank"> 
              <Image src={Rimg2} alt= "youtube" className= "youtube"/></a>
            <a href="//www.facebook.com/saladamidiaoficial" target="_blank">
              <Image src={Rimg3} alt= "facebook" className= "facebook"/></a>
            <a href="https://www.instagram.com/saladamidiaoficial/?igsh=ZTRneTAzd2RoZHF1n" target="_blank">
              <Image src={Rimg4} alt= "instagram" className= "instagram"/></a>
            <a href="https://www.tiktok.com/@saladamidiamusic?_t=8IZjclsasaM&_r=1" target="_blank">
              <Image src={Rimg5} alt= "tiktok" className= "tiktok"/></a>
          </div>
        </div>
      </footer>
    </div>
  </div>
  );
}

