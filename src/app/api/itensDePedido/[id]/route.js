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

export async function PUT(request, { params }) {
  try {
    const { id } = params; // ID do item a ser atualizado
    const { quantidade } = await request.json(); // Nova quantidade recebida

    const client = await db.connect();

    // Verifica se o item existe no banco antes de atualizar
    const checkItem = await client.query('SELECT id FROM itemdepedido WHERE id = $1', [id]);
    if (checkItem.rowCount === 0) {
      client.release();
      return NextResponse.json({ error: 'Item não encontrado' }, { status: 404 });
    }

    // Atualiza o item de pedido
    const result = await client.query(
      'UPDATE itemdepedido SET quantidade = $1 WHERE id = $2',
      [quantidade, id]
    );

    client.release();

    return NextResponse.json({ message: 'Item atualizado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro atualizando item:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}

