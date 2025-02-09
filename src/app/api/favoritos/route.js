import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request) {
    try {
      const clienteIdCookie = request.cookies.get('clienteId'); 
      const clienteId = clienteIdCookie?.value; 

      if (!clienteId || isNaN(clienteId)) { 
          return NextResponse.json({ error: 'Não autenticado' }, { status: 400 });
      }
  
      const client = await db.connect();
      const result = await client.query(`
        SELECT p.id, p.nome_produto, p.oferta, p.valor
        FROM favoritos f
        JOIN produtos p ON f.id_produto = p.id
        WHERE f.id_cliente = $1
      `, [clienteId]);
      client.release();
  
      const produtos = result.rows.map(produto => ({
        id: produto.id,
        oferta: produto.oferta,
        nome_produto: produto.nome_produto,
        valor: produto.valor,
      }));
  
      return NextResponse.json(produtos);
    } catch (error) {
      console.error('Erro ao buscar favoritos:', error);
      return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
    }
  }  

export async function POST(request) {
  try {
    const clienteId = request.cookies.get('clienteId')?.value;
    if (!clienteId) return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });

    const { id_produto } = await request.json();
    const client = await db.connect();

    // Verifica se já é favorito
    const check = await client.query('SELECT * FROM favoritos WHERE id_cliente = $1 AND id_produto = $2', [clienteId, id_produto]);

    if (check.rows.length > 0) {
      // Se já é favorito, remove
      await client.query('DELETE FROM favoritos WHERE id_cliente = $1 AND id_produto = $2', [clienteId, id_produto]);
      client.release();
      return NextResponse.json({ message: 'Produto removido dos favoritos' });
    } else {
      // Se não é favorito, adiciona
      await client.query('INSERT INTO favoritos (id_cliente, id_produto) VALUES ($1, $2)', [clienteId, id_produto]);
      client.release();
      return NextResponse.json({ message: 'Produto adicionado aos favoritos' });
    }
  } catch (error) {
    console.error('Erro ao modificar favoritos:', error);
    return NextResponse.json({ error: 'Erro interno' }, { status: 500 });
  }
}


