import React from 'react';
import '../pedidos.css';
import Image from "next/image";
import ped from "../../../../public/pedidos/cards/ped.png";
import ped1 from "../../../../public/pedidos/cards/ped1.png";
import ped2 from "../../../../public/pedidos/cards/ped2.png";
import ped3 from "../../../../public/pedidos/cards/ped3.png";

// Lista de Pedidos Solicitados
let pedidosSoli = [
    { 
        img: ped,
        id: 'PEDIDO F45367HG',
        estado: 'Aguardando...'
    },
    { 
        img: ped1,
        id: 'PEDIDO G85367HG',
        estado: 'Aguardando...'
    },
    { 
        img: ped2,
        id: 'PEDIDO J75367HG',
        estado: 'Aguardando...'
    },
    { 
        img: ped3,
        id: 'PEDIDO M035367H',
        estado: 'Aguardando...'
    },
    { 
        img: ped,
        id: 'PEDIDO Kfd367HG',
        estado: 'Aguardando...'
    },
    { 
        img: ped2,
        id: 'PEDIDO PVF367HG',
        estado: 'Aguardando...'
    },
    { 
        img: ped3,
        id: 'PEDIDO HBN367HG',
        estado: 'Aguardando...'
    },
];

const PedidosSolicitados = ({ pedidosSoli = [] }) => {
    return (
        <div className="cards-conj-pedido">
            {pedidosSoli.map((pedido, index) => (
                <div className="card-pedido" key={index}>
                    <Image className="img-pedido" src={pedido.img} alt="Imagem de Pedido" />
                    <p className="id-pedido"><strong>{pedido.id}</strong></p>
                    <p className="estado-pedido"><strong>{pedido.estado}</strong></p>
                </div>
            ))}
        </div>
    );
};

// Lista de Pedidos em Andamento
let pedidosAndamen = [
    { 
        img: ped,
        id: 'PEDIDO F45367HG',
        valor: 'R$500,00'
    },
    { 
        img: ped1,
        id: 'PEDIDO G55367HG',
        valor: 'R$100,00'
    },
    { 
        img: ped3,
        id: 'PEDIDO KS5367HG',
        valor: 'R$950,00'
    },
    { 
        img: ped,
        id: 'PEDIDO OM5367HG',
        valor: 'R$350,00'
    },
];

const PedidosAndamento = ({ pedidosAndamen = [] }) => {
    return (
        <div className="cards-conj-pedido">
            {pedidosAndamen.map((pedido, index) => (
                <div className="card-pedido" key={index}>
                    <img className="img-pedido" src={pedido.img} alt="Imagem de Pedido" />
                    <p className="id-pedido"><strong>{pedido.id}</strong></p>
                    <div className="valor-pedido1">
                        <p className="valor-total-pedido"> Total:</p>
                        <p className="valor-pedido2"><strong>{pedido.valor}</strong></p>
                    </div>
                </div>
            ))}
        </div>
    );
};
// Lista de Pedidos em Concluídos 

let pedidosConclu = [
    { 
        img: ped,
        id: 'PEDIDO F45367HG',
        valor: 'R$500,00',
        data: '13/01/2024'
    },
    { 
        img: ped1,
        id: 'PEDIDO G55367HG',
        valor: 'R$100,00',
        data: '25/07/2023'
    },
    { 
        img: ped3,
        id: 'PEDIDO KS5367HG',
        valor: 'R$950,00',
        data: '02/10/2023'
    },
    { 
        img: ped,
        id: 'PEDIDO OM5367HG',
        valor: 'R$350,00',
        data: '30/05/2024'
    },
];
const PedidosConcluidos = ({ pedidosConclu = [] }) => {
    return(
     <div className="cards-conj-pedido">
    {pedidosConclu.map((pedido, index) => (
        <div className="card-pedido">
        <img className="img-pedido" src={pedido.img} alt="img-Ped" />
        <p className="id-pedido"><strong>{pedido.id}</strong></p>
        <div className="valor-pedido1">
          <p className="valor-total-pedido">Total:</p>
          <p className="valor-pedido2"><strong>{pedido.valor}</strong></p>
        </div>
        <p className="data-pedido">{pedido.data}</p>
      </div>
      ))}
      </div>
    );
}


export { pedidosSoli, PedidosSolicitados, pedidosAndamen, PedidosAndamento, pedidosConclu, PedidosConcluidos};
