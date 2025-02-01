import db from './db';

export async function getprodutoById(id) {
        const result = await db.query('SELECT * FROM produtos WHERE id = $1', [id]);
        return result.rows[0];
}