"use client";
import { useState, useEffect } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { MdFavoriteBorder, MdRemove, MdAdd } from "react-icons/md";
import { TbHeartPlus } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import Footer from "../footer/footer";
import Link from 'next/link';
import style from "./page.module.css";
import Image from "next/image";
import LogotipoC from "../../../public/produtos/carrinho/icon1.png";
import FlyerC from "../../../public/produtos/carrinho/icon2.png";
import MotionC from "../../../public/produtos/carrinho/icon4.png";
import ProjGraficoC from "../../../public/produtos/carrinho/icon3.png";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [selecionados, setSelecionados] = useState({});
  const [todosSelecionados, setTodosSelecionados] = useState(false);
  const [modalAberto, setModalAberto] = useState(false);
  const [janelaModal, setJanelaModal] = useState(false);
  const [produtoId, setProdutoId] = useState(null);


  const fetchCarrinho = async () => {
    const res = await fetch('/api/itensDePedido');

    if (res.ok) {
      const itensCarrinho = await res.json();
      setCart(itensCarrinho);
    }
  }

  useEffect(() => {
    fetchCarrinho();

    const novosSelecionados = {};
    cart.forEach(item => {
      novosSelecionados[item.id] = selecionados[item.id] || false;
    });
    setSelecionados(novosSelecionados);
  }, []);

  useEffect(() => {
    const allSelected = cart.length > 0 && cart.every(item => selecionados[item.id]);
    setTodosSelecionados(allSelected);
  }, [selecionados, cart]);


  const selecionarTodos = () => {
    if (todosSelecionados) {
      setSelecionados({});
      setTodosSelecionados(false);
    } else {
      const novosSelecionados = {};
      cart.forEach(item => {
        novosSelecionados[item.id] = true;
      });
      setSelecionados(novosSelecionados);
      setTodosSelecionados(true);
    }
  };

  const alterarSelecionado = (id) => {
    setSelecionados(prevSelecionados => {
      const novosSelecionados = { ...prevSelecionados, [id]: !prevSelecionados[id] };
      return novosSelecionados;
    });
  };

  const handleSolicitarPedido = () => {
    if (temProdutoSelecionado && metodoPagamento) {
      setModalAberto(true); // Abre o modal quando o pedido for solicitado
    } else {
      alert('Por favor, selecione pelo menos um item e escolha um método de pagamento!');
    }
  };
  

  // Função para verificar se algum item foi selecionado para habilitar o botão
  const temProdutoSelecionado = Object.values(selecionados).includes(true);

  // Atualiza a quantidade de um item no carrinho e no banco de dados
  const atualizarQuantidadeNoBanco = async (id, novaQuantidade) => {
    const res = await fetch(`/api/itensDePedido/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ quantidade: novaQuantidade }), // Envia a nova quantidade
    });

    if (res.ok) {
      return true;
    } else {
      console.error("Erro ao atualizar a quantidade no banco.");
      return false;
    }
  };

  // Aumenta a quantidade de um item no carrinho
  const aumentarQuantidade = async (index) => {
    const newCart = [...cart];
    newCart[index].quantidade += 1;
    setCart(newCart);

    const item = cart[index];
    const sucesso = await atualizarQuantidadeNoBanco(item.id, item.quantidade);

    if (sucesso) {
      localStorage.setItem('cart', JSON.stringify(newCart));
    } else {
      // Se falhar, revertê a atualização do estado local
      newCart[index].quantidade -= 1;
      setCart(newCart);
    }
  };

  // Diminui a quantidade de um item no carrinho
  const diminuirQuantidade = async (index) => {
    const newCart = [...cart];
    if (newCart[index].quantidade > 1) {
      newCart[index].quantidade -= 1;
      setCart(newCart);

      const item = cart[index];
      const sucesso = await atualizarQuantidadeNoBanco(item.id, item.quantidade);

      if (sucesso) {
        localStorage.setItem('cart', JSON.stringify(newCart));
      } else {
        // Se falhar, revertê a atualização do estado local
        newCart[index].quantidade += 1;
        setCart(newCart);
      }
    }
  };

  const calcularTotal = () => {
    return cart.reduce((subtotal, item) => {
      if (selecionados[item.id]) {
        // Usa o preco do item e multiplica pela quantidade
        const precoFloat = parseFloat(item.preco.replace(",", "."));
        subtotal += item.quantidade * precoFloat;
      }
      return subtotal;
    }, 0);
  };

  const moverProdFav = async (id, produto_id) => {
    try {
      // Verificar se o produto já está nos favoritos
      const resFavoritos = await fetch('/api/favoritos', {
        method: 'GET',
      });
      const favoritos = await resFavoritos.json();

      // Verificar se o produto já está na lista de favoritos
      const produtoFavorito = favoritos.find((fav) => fav.id === produto_id || fav.id === id);

      if (produtoFavorito) {
        // O produto já está nos favoritos, apenas remove do carrinho
        await handleRemoveItem(id); // Usando a função para remover item do carrinho
        setJanelaModal(false); // Fecha o modal
        fetchCarrinho(); // Atualiza o carrinho
      } else {
        // O produto não está nos favoritos, adiciona e remove do carrinho
        console.log('Produto não encontrado nos favoritos, adicionando...');
        const addFavoritoResponse = await adicionarProdutoFavoritos(produto_id);
        if (addFavoritoResponse) {
          await handleRemoveItem(id); // Usando a função para remover item do carrinho
          setJanelaModal(false); // Fecha o modal
          fetchCarrinho(); // Atualiza o carrinho
        } else {
          console.error('Erro ao adicionar o produto aos favoritos');
        }
      }
    } catch (error) {
      console.error('Erro ao mover para favoritos:', error);
    }
  };

  // Função para adicionar produto aos favoritos
  const adicionarProdutoFavoritos = async (produto_id) => {
    try {
      const clienteId = getCookie('clienteId');
      const res = await fetch('/api/favoritos', {
        method: 'POST',
        body: JSON.stringify({ id_produto: produto_id }),
        headers: {
          'Content-Type': 'application/json',  // Certifique-se de definir o tipo de conteúdo correto
        },
      });
      const data = await res.json();

      if (data.message === 'Produto adicionado aos favoritos') {
        console.log('Produto adicionado aos favoritos');
        return true;  // Retorna verdadeiro indicando que o produto foi adicionado
      } else {
        console.error('Erro ao adicionar produto aos favoritos');
        return false;  // Retorna falso em caso de erro
      }
    } catch (error) {
      console.error('Erro ao adicionar produto aos favoritos:', error);
      return false;  // Retorna falso em caso de erro
    }
  };

  // Função para remover item do carrinho (usada no moverProdFav)
  const handleRemoveItem = async (id) => {
    const res = await fetch(`/api/itensDePedido/${id}`, {
      method: 'DELETE'
    });

    if (res.ok) {
      // Atualizar o estado do carrinho para refletir a remoção do item
      const newCart = cart.filter(item => item.id !== id);
      setCart(newCart);
    } else {
      console.error('Erro ao remover item do carrinho');
    }
  };

  const openModal = (id) => {
    setProdutoId(id);
    setJanelaModal(true);
  };


  const closeModal = () => {
    setJanelaModal(false);
  };

  const getMensagemPagamento = () => {
    switch (metodoPagamento) {
      case "pix":
        return "Após a solicitação do pedido, o pagamento via PIX será realizado diretamente com o proprietário. Você receberá a chave PIX e poderá esclarecer qualquer dúvida pelo WhatsApp.";
      case "credito":
        return "O pagamento via maquininha está disponível. A taxa da transação será combinada diretamente com o designer pelo WhatsApp após a solicitação do pedido.";
      case "debito":
        return "O pagamento via maquininha está disponível. A taxa da transação será combinada diretamente com o designer pelo WhatsApp após a solicitação do pedido.";
      default:
        return "";
    }
  };

  return (
    <div className={style.telaCart}>
      <div className={style.menuCart}>
        <div className={style.espacoD}></div>
        <div className={style.objEsquerda}>
          <Link href="/favoritos">
            <button type="button" className={style.btnFavoritoCart}>
              <MdFavoriteBorder />
            </button>
          </Link>
          <button type="button" className={style.btnCarrinhoCart}>
            <HiShoppingCart />
          </button>
        </div>
      </div>
      <center>
        <div className={style.tituloCart}>MEU CARRINHO</div>
        <div className={style.decoracaoLinhaCart}></div>
      </center>

      <div className={style.conteudo}>
        <section>
          <table className={style.carrinhoTable}>
            <thead className={style.carrinhoThead}>
              <tr className={style.carrinhoTr}>
                <th className={style.carrinhoTh}>
                  <button
                    className={`${style.selectProduct} ${todosSelecionados ? style.selected : ""}`}
                    onClick={selecionarTodos}
                  ></button>
                  <span className={style.thText}>Todos</span>
                </th>
                <th className={style.carrinhoTh}>Produto</th>
                <th className={style.carrinhoTh}>Preço</th>
                <th className={style.carrinhoTh}>Quantidade</th>
                <th className={style.carrinhoTh}>Total</th>
                <th className={style.carrinhoTh}></th>
              </tr>
            </thead>
            <tbody className={style.carrinhoTbody}>
              {(cart.map((item, index) => (
                <tr className={style.carrinhoTr} key={item.id}>
                  <td className={style.carrinhoTd}>
                    <button
                      className={`${style.selectProduct} ${selecionados[item.id] ? style.selected : ""}`}
                      onClick={() => alterarSelecionado(item.id)}
                    />
                  </td>
                  <td className={style.carrinhoTd}>
                    <div className={style.produtoImagemCart}>
                      <Image
                        src={
                          item.produto_id === 1 ? LogotipoC :
                            item.produto_id === 2 ? FlyerC :
                              item.produto_id === 3 ? MotionC :
                                item.produto_id === 4 ? ProjGraficoC :
                                  null
                        }
                        alt="Produto"
                        className={style.produtoImagem}
                        width={100}
                        height={115}
                      />
                    </div>
                  </td>
                  <td className={style.carrinhoTd}>
                    R${" "}
                    {parseFloat(item.preco).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className={style.carrinhoTd}>
                    <div className={style.quantidade}>
                      {item.quantidade > 1 ? (
                        <>
                          <button onClick={() => diminuirQuantidade(index)}>
                            <MdRemove />
                          </button>
                          <span className={style.quantidade}>{item.quantidade}</span>
                          <button onClick={() => aumentarQuantidade(index)}>
                            <MdAdd />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => handleRemoveItem(item.id)}>
                            <RiDeleteBin6Line />
                          </button>
                          <span className={style.quantidade}>{item.quantidade}</span>
                          <button onClick={() => aumentarQuantidade(index)}>
                            <MdAdd />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td className={style.totalProd}>
                    R${" "}
                    {(item.quantidade * parseFloat(item.preco.replace(",", "."))).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td className={style.carrinhoTd}>
                    <button className={style.listaFavBnt} onClick={() => openModal(item.id)}>
                      <TbHeartPlus />
                    </button>
                  </td>
                </tr>
              ))
              )}
            </tbody>
          </table>
        </section>
        <aside className={style.carrinhoAside}>
          <div className={style.caixa}>
            <center>
              <header className={style.resumoText}>Resumo da Compra</header>
            </center>
            <div className={style.informacao}>
              <div className={style.metodosPagamento}>
                <div className={style.metodoPagamento}>
                  <input
                    type="radio"
                    id="pix"
                    className={style.metodoPagamento}
                    name="metodoPagamento"
                    value="pix"
                    onChange={() => setMetodoPagamento("pix")}
                  />
                  <label htmlFor="pix">Pix</label>
                  {metodoPagamento === "pix" && (
                    <div className={style.mensagemPagamento}>
                      {getMensagemPagamento()}
                    </div>
                  )}
                </div>
                <div className={style.metodoPagamento}>
                  <input
                    type="radio"
                    id="debito"
                    className={style.metodoPagamento}
                    name="metodoPagamento"
                    value="debito"
                    onChange={() => setMetodoPagamento("debito")}
                  />
                  <label htmlFor="debito">Cartão de Débito</label>
                  {metodoPagamento === "debito" && (
                    <div className={style.mensagemPagamento}>
                      {getMensagemPagamento()}
                    </div>
                  )}
                </div>
                <div className={style.metodoPagamento}>
                  <input
                    type="radio"
                    id="credito"
                    className={style.metodoPagamento}
                    name="metodoPagamento"
                    value="credito"
                    onChange={() => setMetodoPagamento("credito")}
                  />
                  <label htmlFor="credito">Cartão de Crédito</label>
                  {metodoPagamento === "credito" && (
                    <div className={style.mensagemPagamento}>
                      {getMensagemPagamento()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <footer>
              <span className={style.textoAbaixo}>Total:</span>
              <span className={style.totalFinal}>
                R${" "}
                {calcularTotal().toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </footer>
          </div>
          <center>
            <button type="button" className={style.bntFinalizarCart} onClick={handleSolicitarPedido} disabled={!temProdutoSelecionado || !metodoPagamento}>
              SOLICITAR PEDIDO
            </button>
            <ModalPedido modalAberto={modalAberto} fecharModal={() => setModalAberto(false)} />
          </center>
        </aside>
      </div>
      {janelaModal && (
        <div className={style.fundomodalC}>
          <div className={style.confirmModalC}>
            <p className={style.textModalCart}>
              Tem certeza que deseja mover o produto do carrinho de
              compras para a lista de favoritos?
            </p>
            <div className={style.modalButtonsC}>
              <button className={style.btnnoCart} onClick={closeModal}>
                NÃO
              </button>
              <button className={style.btnyesCart} onClick={() => moverProdFav(produtoId)}>
                SIM
              </button>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}

const ModalPedido = ({ modalAberto, fecharModal }) => {
  return (
    modalAberto && (
      <div className={style.modalOverlay}>
        <div className={style.modal}>
          <h2 className={style.tituloModal}>Pedido Encaminhado!</h2>
          <p className={style.mensagemModal}>
            Seu pedido foi encaminhado para o designer.
            <br />
            Para dar continuidade à solicitação de pedido, entre em contato com WhatsApp da nossa empresa, para maiores detalhes:
          </p>
          <a
            href="https://api.whatsapp.com/send/?phone=558386795396&text&type=phone_number&app_absent=0"
            target="_blank"
            rel="noopener noreferrer"
            className={style.whatsappLink}
          >
            Empresa Sala da Mídia - WhatsApp
          </a>
          <Link href="/pedidos">
            <button onClick={fecharModal} className={style.pedidosSolicitadosBtn}> Pedidos Solicitados </button>
          </Link>
        </div>
      </div>
    )
  );
};
