import PRimg from '../../../public/perfil/foto-perfil.png';
import Header from '../header/header';
import Footer from '../footer/footer';
import Image from "next/image";
import './perfil.css';

export default function Profile(){
  return (
  <div className='tela-perfil-completa'>
    <Header/>
    <div className ="tela-perfil">
    <div className="perfil">
      <div className="retangulo foto-nome-email">
        <div className="foto-container">
          <Image src={PRimg} className="foto-perfil" alt="foto do perfil" />
        </div>
        <div>
          <h2 className="nome-perfil">Quarteto TCC</h2>
          <p className="email-perfil">quartetotcc78@gmail.com</p>
        </div>
      </div>
      <div className="retangulo dado-contato">
        <div className="dado-perfil">
          <p>
            <strong>Dados</strong>
          </p>
          <p>
            <strong>Nome: </strong>Pato Cachorro Galinha e Elefante
          </p>
          <p>
            <strong>Data de nascimento: </strong>21/03/2022
          </p>
          <p>
            <strong>CPF: </strong>000.000.000-00
          </p>
        </div>
        <div className="contato-perfil">
          <p>
            <strong>Contato</strong>
          </p>
          <p>
            <strong>Telefone: </strong>83 999999-9999
          </p>
          <button className="botao-editar">Editar dados</button>
        </div>
      </div>
    </div>
  </div>
  <Footer/>
  </div>
  )
}

