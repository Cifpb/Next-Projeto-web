import { NextResponse } from "next/server";
import pool from '../../../lib/db';

// Função POST para adicionar ou atualizar item no carrinho
export async function POST(request) {
  try {
    // Obter o cliente_id do cookie, já que o cliente está logado e garantir que seja um número
    const cliente_id = parseInt(request.cookies.get('clienteId'), 10);
    if (!cliente_id) {
      return NextResponse.json({ message: 'Cliente não autenticado' }, { status: 401 });
    }

    const { itemdepedido_id, quantidade } = await request.json();

    // Verifica se todos os parâmetros necessários foram passados
    if (!itemdepedido_id || !quantidade) {
      return NextResponse.json({ message: 'Dados inválidos!' }, { status: 400 });
    }

    // Conectar ao banco de dados
    const client = await pool.connect();

    // Verificar se o item já está no carrinho do cliente
    const { rows: existingItem } = await client.query(
      'SELECT * FROM carrinho WHERE cliente_id = $1 AND itemdepedido_id = $2',
      [cliente_id, itemdepedido_id]
    );

    if (existingItem.length > 0) {
      // Se o item já estiver no carrinho, atualizar a quantidade
      const { rows: updatedItem } = await client.query(
        'UPDATE carrinho SET quantidade = quantidade + $1 WHERE cliente_id = $2 AND itemdepedido_id = $3 RETURNING *',
        [quantidade, cliente_id, itemdepedido_id]
      );

      client.release();
      return NextResponse.json(updatedItem[0], { status: 200 });
    }

    // Caso o item não esteja no carrinho, inserir um novo item
    const { rows: newItem } = await client.query(
      'INSERT INTO carrinho (cliente_id, itemdepedido_id, quantidade) VALUES ($1, $2, $3) RETURNING *',
      [cliente_id, itemdepedido_id, quantidade]
    );

    client.release();
    return NextResponse.json(newItem[0], { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 });
  }
}

// Função GET para pegar todos os itens do carrinho de um cliente
export async function GET(request) {
  try {
    // Obter o cliente_id do cookie e garantir que seja um número
    const cliente_id = parseInt(request.cookies.get('clienteId'), 10);
    if (!cliente_id) {
      return NextResponse.json({ message: 'Cliente não autenticado' }, { status: 401 });
    }

    // Conectar ao banco de dados
    const client = await pool.connect();

    // Buscar todos os itens do carrinho do cliente
    const { rows: cartItems } = await client.query(
      'SELECT * FROM carrinho WHERE cliente_id = $1',
      [cliente_id]
    );

    client.release();

    // Retorna os itens do carrinho
    return NextResponse.json(cartItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Erro ao buscar carrinho' }, { status: 500 });
  }
}
