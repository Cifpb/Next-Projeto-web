import { NextResponse } from "next/server";
import pool from '../../../lib/db';


// Função GET para pegar todos os itens do carrinho de um cliente
export async function GET(request) {
 try {
   // Obter o cliente_id do cookie e garantir que seja um número
   const cliente_id = parseInt(request.cookies.get('clienteId')?.value, 10);
   if (!cliente_id) {
     return NextResponse.json({ message: 'Cliente não autenticado' }, { status: 401 });
   }


   // Conectar ao banco de dados
   const client = await pool.connect();


   // Buscar todos os itens do carrinho do cliente
   const { rows: cartItems } = await client.query(
     'SELECT * FROM carrinho WHERE cliente_id = $1',
     [cliente_id]
   );


   if (cartItems.length > 0) {
     let itensPedido = [];


     for (let item of cartItems) {
       const res = await client.query('SELECT * FROM itemdepedido WHERE id = $1', [item.itempedido_id]);
       itensPedido.push(res.rows[0]);
     }
     client.release();
     return NextResponse.json(itensPedido, { status: 200 });
   }


   client.release();


   // Retorna os itens do carrinho
   return NextResponse.json({ message: 'Carrinho não encontrado para o cliente dado' }, { status: 404 });
 } catch (error) {
   console.error(error);
   return NextResponse.json({ message: 'Erro ao buscar carrinho' }, { status: 500 });
 }
}
