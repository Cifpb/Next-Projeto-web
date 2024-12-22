import "./pedidos.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import MenuPed from "./menudepedidos/menu";
import Image from "next/image";
import ped from '../../../public/pedidos/cards/ped.png';
import db from "@/lib/db";

export default async function Requests1() {
  const pedidos = await db.query("SELECT * FROM pedidos WHERE estado = 'Aguardando'");

  return (
    <div className="Tela-pedidos">
      <Header />
      <div className="pedidos">
        <MenuPed />
        <div className="cards-conj-pedido">
          {pedidos.rows.length > 0 ? (
            pedidos.rows.map((pedido, index) => (
              <div className="card-pedido" key={index}>
                <Image className="img-pedido" src={ped} alt="Imagem de Pedido" />
                <p className="id-pedido"><strong>{pedido.id}</strong></p>
                <p className="estado-pedido"><strong>{pedido.estado}</strong></p>
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
};