
import { getprodutoById } from "@/lib/produto";

export async function getServerSideProps(context) {
  const { id } = context.params;
  const produto = await getprodutoById(id);

  if (!produto) {
    return { notFound: true };
  }

  return {
    props: { produto },
  };
}

export default function ProdutoDetalhes({ produto }) {
  return (
    <div>
      <h1>{produto.nome}</h1>
      <p>Categoria: {produto.categoria}</p>
      <p>Descrição: {produto.descricao}</p>
      <p>Preço: R$ {produto.valor}</p>
      {/* Adicione outros detalhes conforme necessário */}
    </div>
  );
}
