import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function POST(request) {
  try {
    // Obtém o cookie 'clienteId' e extrai apenas o valor
    const clienteIdCookie = request.cookies.get('clienteId');
    const clienteId = clienteIdCookie?.value;

    if (!clienteId || isNaN(clienteId)) {
      return NextResponse.json({ error: 'Usuário não autenticado ou ID inválido.' }, { status: 400 });
    }

    const { nome_completo, data_nascimento, cpf, telefone, cidade, bairro, rua } = await request.json();

    const client = await db.connect();

    await client.query(
      `UPDATE cliente SET 
        nome_completo = $1, 
        data_nascimento = $2, 
        cpf = $3, 
        telefone = $4, 
        cidade = $5,
        bairro = $6,
        rua = $7
       WHERE id = $8`,
      [nome_completo, data_nascimento, cpf, telefone, cidade, bairro, rua, parseInt(clienteId, 10)]
    );

    client.release();

    return NextResponse.json({ message: 'Dados atualizados com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
