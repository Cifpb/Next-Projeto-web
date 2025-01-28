import { NextResponse } from 'next/server';
import db from '../../../../lib/db';

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    // const parsedId = parseInt(id, 10);

    const client = await db.connect();
    await client.query('DELETE FROM cliente WHERE id = $1', [parsedId]);
    client.release();
    return NextResponse.json({ message: 'Cliente removido com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro removendo cliente:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
