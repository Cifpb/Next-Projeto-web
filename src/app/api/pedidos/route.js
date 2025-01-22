import { NextResponse } from 'next/server';
import pool from '../../../lib/db';

export async function GET(request) {
    try {
      const { searchParams } = new URL(request.url);
      const estado = searchParams.get('estado'); 
  
      const client = await pool.connect();
      let query = 'SELECT * FROM pedidos';
      const values = [];
  
      if (estado) {
        query += ' WHERE estado = $1';
        values.push(estado);
      }
  
      const result = await client.query(query, values);
      client.release();
  
      return NextResponse.json(result.rows);
    } catch (error) {
      console.error('Erro listando pedidos:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  
  export async function POST(request) {
    try {
      const { prazo, metodo_pag, total, quantidade_total, estado, data } = await request.json();
  
      // Validação dos dados
      if (!prazo || !metodo_pag || !total || !quantidade_total || !estado || !data) {
        return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
      }
  
      const client = await pool.connect();
      const result = await client.query(
        'INSERT INTO pedidos (prazo, metodo_pag, total, quantidade_total, estado, data) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [prazo, metodo_pag, total, quantidade_total, estado, data]
      );
      client.release();
  
      return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  }
  