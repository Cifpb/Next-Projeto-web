import PRimg from '../../../public/perfil/foto-perfil.png';
import Header from '../header/header';
import Footer from '../footer/footer';
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import './perfil.css';

export default function Profile() {
  return (
    <div className='tela-perfil-completa'>
      <Header />
      <div className="tela-perfil">
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

          <div className="retangulo dados-pessoais">
            <h3 className="titulo-dados">Dados Pessoais</h3>
            <div className="conteudo-dados">
              <div className="coluna-esquerda">
                <div className="campo">
                  <p className="rotulo">Nome:</p>
                  <p className="valor">Pato Cachorro Galinha e Elefante</p>
                </div>
                <div className="campo">
                  <p className="rotulo">Data de nascimento:</p>
                  <p className="valor">21/03/2022</p>
                </div>
                <div className="campo">
                  <p className="rotulo">CPF:</p>
                  <p className="valor">000.000.000-00</p>
                </div>
              </div>

              <div className="coluna-direita">
                <div className="campo">
                  <p className="rotulo">Telefone:</p>
                  <p className="valor">83 999999-9999</p>
                </div>
                <div className="campo">
                  <p className="rotulo">Endereço:</p>
                  <p className="valor">Rua Manoel Rodrigues, 123, Bairro Criativo D+, Esperança - PB.</p>
                </div>
                <div className="icones-acoes">
                  <TbEdit className="icone-editar" />
                  <RiDeleteBin6Line className="icone-deletar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
