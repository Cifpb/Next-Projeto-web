import { NextResponse } from 'next/server';
import db from '../../../../lib/db';


export async function GET(request, { params }) {
 try {
   // Obter o cliente_id do cookie, já que o cliente está logado e garantir que seja um número
   const cliente_id = parseInt(request.cookies.get('clienteId')?.value, 10);
   if (!cliente_id) {
     return NextResponse.json({ message: 'Cliente não autenticado' }, { status: 401 });
   }


   const { id } = params;


   const client = await db.connect();
   const itemdepedido = await client.query('SELECT * FROM itemdepedido WHERE produto_id = $1', [id]);
   let itemdepedido_id = itemdepedido.rows[0]?.id;


   const res = await client.query('SELECT * FROM carrinho WHERE cliente_id = $1 AND itempedido_id = $2', [cliente_id, itemdepedido_id]);
   client.release();
   return NextResponse.json(res.rows, { status: 200 });
 } catch (error) {
   console.error('Erro recuperando item:', error);
   return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
 }
}


export async function DELETE(request, { params }) {
 try {
   const { id } = params;

   const client = await db.connect();
   await client.query('DELETE FROM carrinho WHERE itempedido_id = $1', [id]);
   client.release();
   return NextResponse.json({ message: 'Item removido com sucesso' }, { status: 200 });
 } catch (error) {
   console.error('Erro removendo item:', error);
   return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
 }
}
