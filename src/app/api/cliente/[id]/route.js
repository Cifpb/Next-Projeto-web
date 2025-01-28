import { NextResponse } from 'next/server';
import pool from "../../../../lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Verifica se o ID foi fornecido
    if (!id) {
      return NextResponse.json({ error: 'ID do cliente não fornecido' }, { status: 400 });
    }

    const client = await pool.connect();

    // Verifica se o ID é válido antes de executar a query
    const result = await client.query('DELETE FROM cliente WHERE id = $1', [id]);

    client.release();

    // Verifica se um cliente foi removido
    if (result.rowCount === 0) {
      return NextResponse.json({ error: 'Cliente não encontrado' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Cliente removido com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro removendo cliente:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
