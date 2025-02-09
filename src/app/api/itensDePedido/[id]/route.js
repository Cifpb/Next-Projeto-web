import { NextResponse } from 'next/server';
import db from '../../../../lib/db';


export async function DELETE(request, { params }) {
 try {
   const { id } = params;


   const client = await db.connect();
   await client.query('DELETE FROM itemdepedido WHERE id = $1', [id]);
   client.release();
   return NextResponse.json({ message: 'Item removido com sucesso' }, { status: 200 });
 } catch (error) {
   console.error('Erro removendo item:', error);
   return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
 }
}

