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

    // Configura o cookie seguro com o clienteId
    const response = NextResponse.json({ message: 'Login bem-sucedido' }, { status: 200 });
    response.cookies.set('clienteId', cliente.id, {
      sameSite: 'strict', // Previne envio de cookies de sites externos
      maxAge: 60 * 60 * 24, // 1 dia em segundos
      path: '/', // O cookie é acessível por toda a aplicação
    });

    /*httpOnly: true, // Impede acesso via JavaScript
    secure: process.env.NODE_ENV === 'production', // Só HTTPS em produção*/

    return response; // Retorna a resposta com o cookie configurado

  } catch (error) {
    console.error('Erro ao verificar login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}