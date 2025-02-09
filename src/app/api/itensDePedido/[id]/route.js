import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = params; // id do produto a ser removido

    const client = await db.connect();

    // Excluir o item de pedido que tenha o produto correspondente
    await client.query('DELETE FROM itemdepedido WHERE  produto_id = $1 OR id = $1', [id]);

    client.release();
    return NextResponse.json({ message: 'Item removido com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro removendo item:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

