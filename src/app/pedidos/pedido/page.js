import React from 'react';
import '../pedidos.css';
import Aceito from "../../../../public/pedidos/status/aceito.png";
import Ampulheta from  "../../../../public/pedidos/status/ampulheta.png";
import Pronto from  "../../../../public/pedidos/status/pronto.png";
import Entregue from  "../../../../public/pedidos/status/entregue.png";
import ped from "../../../../public/pedidos/cards/ped.png";
import ped1 from "../../../../public/pedidos/cards/ped1.png";
import ped2 from "../../../../public/pedidos/cards/ped2.png";
import ped3 from "../../../../public/pedidos/cards/ped3.png";
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Image from "next/image";
import MenuPed from "../menudepedidos/menu";
import Pix from "../../../../public/pedidos/status/pix.png"

function Pedido() {
  return (
    <div className="tela-pedidos">
    <Header/>
    <div className="pedidos">
     <MenuPed/>
      <div className="tela-pedido">
        <div className="dados-pedido">
          <div className="imagens-pedido">
          <Image className="imagePed" src={ped3} alt="Imagem de pedido" />
          <Image className="imagePed" src={ped2} alt="Imagem de pedido" />
          <Image className="imagePed" src={ped1} alt="Imagem de pedido" />
          </div>
          <p className="id-pedidoSolicitado">
            <strong>-PEDIDO PED1U66Y</strong>
          </p>
          <p className="data-pedidoSolicitado">
            PEDIDO EFETUADO: 02/01/2025
          </p>
          <p className="data-pedidoSolicitado">
            PEDIDO CONCLUÍDO: 07/01/2025
          </p>
          <div className="parte-inferiorPed">
            <div className="metodo-pagamentoPed">
              <p><strong>Método de Pagamento:</strong></p>
              <div className="blocopag">
              <Image className="imgpag" src={Pix}/>
              <p className="opcao-pagamentoPed">Pix</p>
              </div>
            </div>
            <div className="valorfinal-ped">
              <p className="total-pedidoPed">Total:</p>
              <p className="valor-pedidoPed">
                <strong> R$ 1.400,00</strong>
              </p>
            </div>
          </div>
        </div>
        <div className="status-pedido">
          <div className="status-item">
            <Image src={Aceito} className="icon-status" alt="Ícone de status de pedido" />
            <div className="status-info">
              <p className="status-data">03/01/2025</p>
              <p className="status-titulo">Pedido Aceito</p>
              <p className="status-descricao">Seu pedido foi aceito pelo designer.</p>
            </div>
          </div>
          <div className="status-item">
            <Image src={Ampulheta} className="icon-status" alt="Ícone de status de pedido" />
            <div className="status-info">
              <p className="status-data">05/01/2025</p>
              <p className="status-titulo">Em Desenvolvimento</p>
              <p className="status-descricao">Seus trabalhos estão em fase de desenvolvimento.</p>
            </div>
          </div>
          <div className="status-item">
            <Image src={Pronto} className="icon-status" alt="Ícone de status de pedido" />
            <div className="status-info">
              <p className="status-data">06/01/2025</p>
              <p className="status-titulo">Pedido Finalizado</p>
              <p className="status-descricao">Seu pedido está pronto!</p>
            </div>
          </div>
          <div className="status-item">
            <Image src={Entregue} className="icon-status" alt="Ícone de status de pedido" />
            <div className="status-info">
              <p className="status-data">07/01/2025</p>
              <p className="status-titulo">Pedido Entregue</p>
              <p className="status-descricao">Seu pedido foi entregue. Caso encontre algum problema, por favor entre em contato com o designer.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  );
}

export default Pedido;
