import { NextResponse } from 'next/server';
import db from '../../../lib/db';

export async function GET(request) {
    try {
        // Obtém o cookie 'clienteId' e extrai apenas o valor
        const clienteIdCookie = request.cookies.get('clienteId'); // Busca o cookie chamado clienteId da requisição.
        const clienteId = clienteIdCookie?.value; // Contém metadados, incluindo o valor do cookie (clienteIdCookie.value).

       // O operador ?. evita erros ao acessar propriedades de valores undefined ou null.
       // Se clienteIdCookie for undefined (cookie ausente), clienteId será atribuído como undefined em vez de lançar erro.

        if (!clienteId || isNaN(clienteId)) { // Se o clienteID não existir ou o valor não é um número válido (isNaN(clienteId)).
            return NextResponse.json({ error: 'Usuário não autenticado ou ID inválido.' }, { status: 400 });
        }

        const client = await db.connect();

        // Consulta para buscar os dados do cliente
        const result = await client.query(
            'SELECT nome_completo, email, data_nascimento, cpf, telefone, pais, estado FROM cliente WHERE id = $1',
            [parseInt(clienteId, 10)] 
            // O clienteId é necessário aqui para identificar de forma única o cliente no banco de dados.
        );
        client.release();

        const cliente = result.rows[0];

        if (!cliente) {
            return NextResponse.json({ error: 'Cliente não encontrado.' }, { status: 404 });
        }

        return NextResponse.json(cliente, { status: 200 });

    } catch (error) {
        console.error('Erro ao buscar dados do cliente:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
