import { NextResponse } from "next/server";
import pool from "../../../../lib/db";


export async function GET(req, { params }) {
 try {
   const { id } = params;
   const client = await pool.connect();


   // Consulta para buscar todos os produtos
   const { rows: produtos } = await client.query(
     "SELECT * FROM produtos WHERE id = $1", [id]
   );


   client.release();


   return NextResponse.json(produtos[0], { status: 200 });
 } catch (error) {
   console.error("Erro ao buscar produtos:", error);
   return NextResponse.json({ message: "Erro no servidor" }, { status: 500 });
 }
}
