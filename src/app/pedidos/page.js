import "./pedidos.css";
import Header from "../header/header";
import Footer from "../footer/footer";
import MenuPed from "./menudepedidos/menu";
import Image from "next/image";
import ped from '../../../public/pedidos/cards/ped.png';
import db from "../../lib/db";

// Função para gerar um código aleatório de 6 a 7 caracteres (letras e números)
const gerarCodigoAleatorio = () => {
  const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let codigo = '';
  for (let i = 0; i < 4; i++) {  // Gera um código de 4 caracteres
    codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
  }
  return codigo;
};

// Função para atualizar o código aleatório no banco de dados
const atualizarCodigoAleatorio = async (idPedido) => {
  const codigo = gerarCodigoAleatorio();
  await db.query("UPDATE pedidos SET codigo_aleatorio = $1 WHERE id = $2", [codigo, idPedido]);
};

// Função para garantir que todos os pedidos tenham um código aleatório
const garantirCodigoAleatorio = async () => {
  const pedidos = await db.query("SELECT * FROM pedidos WHERE estado = 'Aguardando'");

  // Atualizar os códigos aleatórios para os pedidos "Aguardando"
  for (let pedido of pedidos.rows) {
    if (!pedido.codigo_aleatorio) {
      // Se não tiver código aleatório, gerar e atualizar
      await atualizarCodigoAleatorio(pedido.id);
    }
  }
};

export default async function Requests1() {
  // Garantir que os pedidos 'Aguardando' tenham código aleatório
  await garantirCodigoAleatorio();

  // Buscar pedidos do estado 'Aguardando'
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
                <p className="id-pedido">
                  <strong>PED{pedido.id}{pedido.codigo_aleatorio}</strong>
                </p>
                <p className="estado-pedido"><strong>{pedido.estado}...</strong></p>
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
