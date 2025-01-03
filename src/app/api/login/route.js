import { NextResponse } from 'next/server';
import db from '../../../lib/db';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    const { email, senha } = await request.json();
    const client = await db.connect();

    // Busca no banco de dados um cliente com o e-mail informado
    const result = await client.query('SELECT * FROM cliente WHERE email = $1', [email]);
    // Obtém o primeiro registro encontrado (se existir)
    const cliente = result.rows[0];

    // Verifica se o cliente existe (e-mail foi encontrado no banco)
    // Se existir, compara a senha informada com a senha criptografada usando bcrypt.compare
    // Se não existir, define diretamente como false
    const senhaCorreta = cliente ? await bcrypt.compare(senha, cliente.senha) : false;
    // Libera a conexão com o banco de dados
    client.release();

    // Se o cliente não existir (e-mail errado) ou a senha estiver incorreta
    if (!cliente || !senhaCorreta) {
      return NextResponse.json({ error: 'Usuário ou senha inválidos' }, { status: 401 });
    }

    // Se passar pelas verificações, significa que o login foi bem-sucedido
    return NextResponse.json({ message: 'Login bem-sucedido' }, { status: 200 });

  } catch (error) {
    // Em caso de erro inesperado, exibe no console e retorna um status 500
    console.error('Erro ao verificar login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
