import { NextResponse } from 'next/server';
import db from '../../../lib/db';

const validarCPF = (cpf) => {
  cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 1; i <= 9; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
  }
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(cpf.substring(9, 10))) return false;

  soma = 0;
  for (let i = 1; i <= 10; i++) {
    soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
  }
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.substring(10, 11));
};

export async function PUT(request) {
  try {
    const clienteIdCookie = request.cookies.get('clienteId');
    const clienteId = clienteIdCookie?.value;

    if (!clienteId || isNaN(clienteId)) {
      return NextResponse.json({ error: 'Usuário não autenticado ou ID inválido.' }, { status: 400 });
    }

    const { nome_completo, data_nascimento, cpf, telefone, pais, estado } = await request.json();

    if (!validarCPF(cpf)) {
      return NextResponse.json({ error: 'CPF inválido.' }, { status: 400 });
    }

    const client = await db.connect();

    await client.query(
      `UPDATE cliente SET 
        nome_completo = $1, 
        data_nascimento = $2, 
        cpf = $3, 
        telefone = $4, 
        pais = $5,
        estado = $6
       WHERE id = $7`,
      [nome_completo, data_nascimento, cpf, telefone, pais, estado, parseInt(clienteId, 10)]
    );

    client.release();

    return NextResponse.json({ message: 'Dados atualizados com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
