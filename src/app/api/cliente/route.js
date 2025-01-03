import { NextResponse } from "next/server";
import db from '../../../lib/db';
import bcrypt from 'bcrypt'; //Criptografia

// Método GET para obter todos os clientes
export async function GET() {
  try {
    // Conecta ao banco de dados
    const client = await db.connect();
    
    // Executa a consulta para obter todos os clientes
    const result = await client.query('SELECT * FROM cliente');
    
    // Libera a conexão do banco de dados
    client.release();
    
    // Retorna os dados dos clientes como resposta
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error('Erro ao listar clientes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { nome_completo, telefone, data_nascimento, email, senha } = await request.json();
    const client = await db.connect();
    
    // Verificar se o email já existe
    const emailExistente = await client.query(
      'SELECT * FROM cliente WHERE email = $1',
      [email]
    );

    if (emailExistente.rows.length > 0) {
      client.release();
      return NextResponse.json(
        { error: 'E-mail já cadastrado. Por favor, use outro para continuar.' }, 
        { status: 400 }
      );
    }

    // Criptografar a senha usando bcrypt
    const hashedPassword = await bcrypt.hash(senha, 10); // O '10' é o saltRounds, o nível de segurança (mais alto é mais seguro)

    // Inserir novo cliente com a senha criptografada
    const result = await client.query(
      'INSERT INTO cliente (nome_completo, telefone, data_nascimento, email, senha) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nome_completo, telefone, data_nascimento, email, hashedPassword] // Usando a senha criptografada
    );

    client.release();
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    console.error('Erro ao cadastrar cliente:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}
