import { NextResponse } from "next/server";
import pool from "../../../lib/db";

export async function GET() {
  try {
    const client = await pool.connect();

    // Consulta para buscar todos os produtos
    const { rows: produtos } = await client.query(
      "SELECT id, nome_produto, descricao, valor, oferta, prazo_minimo, prazo_maximo FROM produtos"
    );

    client.release();

    return NextResponse.json(produtos, { status: 200 });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    return NextResponse.json({ message: "Erro no servidor" }, { status: 500 });
  }
}
