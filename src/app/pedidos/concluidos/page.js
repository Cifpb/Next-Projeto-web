import "../pedidos.css";
import Header from '../../header/header';
import Footer from "../../footer/footer";
import MenuPed from "../menudepedidos/menu";
import Image from "next/image";
import ped from '../../../../public/pedidos/cards/ped.png';
import db from '../../../lib/db';

export default async function Requests3() {

  const pedidosConclu = await db.query("SELECT * FROM pedidos WHERE estado = 'Concluído'");

  return (
    <div className='Tela-pedidos'>
      <Header />
      <div className='pedidos'>
        <MenuPed />
        <div className="cards-conj-pedido">
          {pedidosConclu.rows.length > 0 ? (
            pedidosConclu.rows.map((pedido, index) => (
              <div className="card-pedido" key={index}>
                <Image className="img-pedido" src={ped} alt="Imagem de Pedido" />
                <p className="id-pedido"><strong>PED{pedido.id}{pedido.codigo_aleatorio}</strong></p>
                <div className="valor-pedido1">
                  <p className="valor-total-pedido">Total:</p>
                  <p className="valor-pedido2"><strong>{
                  Number(pedido.total).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                  }</strong></p>
                </div>
                <p className="data-pedido"> <strong> {
                  pedido.data_conclusao ? new Date(pedido.data_conclusao).toLocaleDateString() : ''
                }
                </strong>
                </p>
              </div>
            ))
          ) : (
            <p className="infor-pedido">Nenhum pedido encontrado.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
