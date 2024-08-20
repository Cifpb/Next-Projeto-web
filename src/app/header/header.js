import Image from "next/image";
import Himg1 from "../../../public/header/logo-sala.svg";
import Himg2 from "../../../public/header/zap.svg";
import Himg3 from "../../../public/header/youtube.svg";
import Himg4 from "../../../public/header/face.svg";;
import Himg5 from "../../../public/header/insta.svg";
import Himg6 from "../../../public/header/tiktok.svg";
import "./header.css"
import Link from 'next/link';


export default function Header(){
return (
  <div className="tela-cab">
    <div className="retangulo">
      <div className="parte1" />
      <div className="parte2" />
      <div className="parte1" />
    </div>
    <div className="Header">
  
      <Image src={Himg1} alt= "Logo" className= "logoCab"/>
      <div className="icones-cab">
        <a
          href="https://api.whatsapp.com/send/?phone=558386795396&text&type=phone_number&app_absent=0" target="_blank" >
           <Image src={Himg2} alt="Ícone 1" className="icone-cab"/>
        </a>
        <a href="//www.facebook.com/saladamidiaoficial" target="_blank"> <Image src={Himg4} alt="Ícone 2" className="icone-cab"/></a>
        <a href="https://www.instagram.com/saladamidiaoficial/?igsh=ZTRneTAzd2RoZHF1n" target="_blank">
        <Image src={Himg5} alt="Ícone 3" className="icone-cab"/>
        </a>

<a href="https://www.tiktok.com/@saladamidiamusic?_t=8IZjclsasaM&_r=1" target="_blank"> 
 <Image src={Himg6} alt="Ícone 4" className="icone-cab"/>
        </a>
        <a href="https://www.youtube.com/@MhoysesDesign" target="_blank">
           <Image src={Himg3} alt="Ícone 5" className="icone-cab"/>
        </a>
      </div>
      <div className="linha-cab" />
      <div className="botoes-cab">
        <Link href="/inicio" className="botao-cab"> INÍCIO </Link>
        <Link href="/sobre" className="botao-cab"> SOBRE </Link>
        <Link href="/catalogo" className="botao-cab"> CATÁLOGO </Link>
        <Link href="/pedidos" className="botao-cab"> PEDIDOS </Link>
        <Link href="/login" className="botao-cab botao-login"> LOGIN </Link>
      </div>
    </div>
  </div>
);
}