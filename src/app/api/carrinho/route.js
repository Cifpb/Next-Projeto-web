import { NextResponse } from "next/server";
import pool from '../../../lib/db';  


// Função POST para adicionar ou atualizar item no carrinho
export async function POST(req, res) {
  try {
    const { cliente_id, itemdepedido_id, quantidade } = req.body;

    // Verifica se todos os parâmetros necessários foram passados
    if (!cliente_id || !itemdepedido_id || !quantidade) {
      return res.status(400).json({ message: 'Dados inválidos!' });
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
      return res.status(200).json(updatedItem[0]);
    }

    // Caso o item não esteja no carrinho, inserir um novo item
    const { rows: newItem } = await client.query(
      'INSERT INTO carrinho (cliente_id, itemdepedido_id, quantidade) VALUES ($1, $2, $3) RETURNING *',
      [cliente_id, itemdepedido_id, quantidade]
    );

    client.release();
    return res.status(201).json(newItem[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro no servidor' });
  }
}

// Função GET para pegar todos os itens do carrinho de um cliente
export async function GET(req, res) {
  try {
    const { cliente_id } = req.query;  // Recebe o cliente_id pela query

    if (!cliente_id) {
      return res.status(400).json({ message: 'Cliente ID é necessário!' });
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
    return res.status(200).json(cartItems);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao buscar carrinho' });
  }
}
