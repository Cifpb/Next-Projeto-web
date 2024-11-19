"use client";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { MdFavoriteBorder, MdRemove, MdAdd } from "react-icons/md";
import { TbHeartPlus } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useFavoriteContext } from "./context/FavoritesContext";
import { useCartContext } from "./context/CartContext";
import Footer from "./Footer";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCartContext();
  const { addFavorite } = useFavoriteContext();
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [janelaModal, setJanelaModal] = useState(false);
  const [produtoId, setProdutoId] = useState(null);
  const [selecionados, setSelecionados] = useState({});
  const [todosSelecionados, setTodosSelecionados] = useState(false);

  // Atualiza o estado de selecionados quando o carrinho muda
  useEffect(() => {
    const novosSelecionados = {};
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      novosSelecionados[item.id] = selecionados[item.id] || false;
    }
    setSelecionados(novosSelecionados);
  }, [cart]);

  // Verifica se todos os itens estão selecionados ou se o carrinho está vazio
  useEffect(() => {
    let allSelected = cart.length > 0;
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (!selecionados[item.id]) {
        allSelected = false;
        break;
      }
    }
    setTodosSelecionados(allSelected);
  }, [selecionados]);

  // Selecionador de Todos os Produtos
  const selecionarTodos = () => {
    if (todosSelecionados) {
      // Desselecionar todos
      setSelecionados({});
      setTodosSelecionados(false);
    } else {
      // Selecionar todos
      const novosSelecionados = {};
      for (let i = 0; i < cart.length; i++) {
        const item = cart[i];
        novosSelecionados[item.id] = true;
      }
      setSelecionados(novosSelecionados);
      setTodosSelecionados(true);
    }
  };

  // Selecionador dos Produtos
  const alterarSelecionado = (id) => {
    const novoSelecionados = {};
    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];
      if (item.id === id) {
        novoSelecionados[id] = !selecionados[id];
      } else {
        novoSelecionados[item.id] = selecionados[item.id];
      }
    }
    setSelecionados(novoSelecionados);
  };

  const aumentarQuantidade = (index) => {
    updateQuantity(cart[index].id, cart[index].quantidade + 1);
  };

  const diminuirQuantidade = (index) => {
    if (cart[index].quantidade > 1) {
      updateQuantity(cart[index].id, cart[index].quantidade - 1);
    }
  };

  const removerItem = (productId) => {
    removeFromCart(productId);
  };

  const calcularSubtotal = () => {
      let subtotalOutrosProdutos = 0;

      for (let i = 0; i < cart.length; i++) {
          const item = cart[i];
          if (selecionados[item.id]) {
              const precoFloat = parseFloat((item.price || "0").replace(",", "."));
              subtotalOutrosProdutos += item.quantidade * precoFloat;
          }
      }

      return subtotalOutrosProdutos;
  };

  // Janela do Modal (Caixinha de Diálogo)

  const { favorite } = useFavoriteContext();

  const moverProdFav = (id) => {
    // Encontra o item específico do carrinho que será movido para favoritos
    const itemModal = cart.find((item) => item.id === id);
    if (itemModal) {
      // Verifica se o produto já está nos favoritos
      const isFavorite = favorite.some((item) => item.id === id);

      if (!isFavorite) {
        // Se o produto não estiver nos favoritos, adiciona
        addFavorite(itemModal);
      }

      removeFromCart(id); // Remove o item do carrinho
      setJanelaModal(false); // Fecha o modal após o movimento
    }
  };

  const openModal = (id) => {
    setProdutoId(id); // Define o ID do produto a ser movido para os favoritos
    setJanelaModal(true);
  };

  const closeModal = () => {
    setJanelaModal(false);
  };

  // Métodos de Pagamento
  const calcularTotalComJuros = () => {
    const subtotal = calcularSubtotal();
    let juros = 0;

    if (metodoPagamento === "credito") {
      juros = 0.02;
    } else if (metodoPagamento === "debito") {
      juros = 0.01;
    }

    return subtotal * (1 + juros);
  };

  // Mensagens dos Métodos de Pagamento
  const getMensagemPagamento = () => {
    if (metodoPagamento === "pix") {
      return "Pagamento finalizado na hora. Você pode finalizar o seu Pix por meio do QR code ou código do banco que preferir! Mas fique atento, este código só será válido por 24 horas.";
    } else if (metodoPagamento === "credito") {
      return "Pagamento realizado com cartão de crédito. Lembre-se, podem ser aplicados juros dependendo da sua administradora de cartão. Verifique o valor total antes de confirmar a compra.";
    } else if (metodoPagamento === "debito") {
      return "Pagamento realizado com cartão de débito. A transação será processada imediatamente e o valor será debitado da sua conta na hora da compra.";
    }
    return "";
  };

  // Prazo
  const calcularPrazoEstimado = () => {
    let prazoMinimoTotal = 0;
    let prazoMaximoTotal = 0;

    for (let i = 0; i < cart.length; i++) {
      const item = cart[i];

      if (selecionados[item.id]) {
        let prazoMin = 0;
        let prazoMax = 0;

        if (item.subCategory === "Logotipo/Identidade Visual") {
          prazoMin = 2;
          prazoMax = 4;
        } else if (item.subCategory === "Flyer") {
          prazoMin = 2;
          prazoMax = 4;
        } else if (item.subCategory === "Projetos Gráficos") {
          prazoMin = 10;
          prazoMax = 15;
        } else if (item.subCategory === "Motion") {
          prazoMin = 1;
          prazoMax = 3;
        }

        prazoMinimoTotal += prazoMin * item.quantidade;
        prazoMaximoTotal += prazoMax * item.quantidade;
      }
    }

    return { prazoMinimoTotal, prazoMaximoTotal };
  };

  const { prazoMinimoTotal, prazoMaximoTotal } = calcularPrazoEstimado();

  return (
    <div className="tela-cart">
      <div className="menuCart">
        <div className="espaco-d"></div>
        <div className="obj-esquerda">
          <Link to="/favoritos">
            <button type="button" className="btn-favorito-Cart">
              <MdFavoriteBorder />
            </button>
          </Link>
          <button type="button" className="btn-carrinho-Cart">
            <HiShoppingCart />
          </button>
        </div>
      </div>
      <center>
        <div className="titulo-cart">MEU CARRINHO</div>
        <div className="decoracao-linhaCart"></div>
      </center>

      <div className="conteudo">
        <section>
          <table>
            <thead>
              <tr>
                <th>
                  <button
                    className={`select-product ${todosSelecionados ? "selected" : ""}`}
                    onClick={() => selecionarTodos()}
                  ></button>
                  <span className="th-text">Todos</span>
                </th>
                <th>Produto</th>
                <th>Preço</th>
                <th>Quantidade</th>
                <th>Total</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id}>
                  <td>
                    <button
                      className={`select-product ${selecionados[item.id] ? "selected" : ""}`}
                      onClick={() => alterarSelecionado(item.id)}
                    />
                  </td>
                  <td>
                    <div className="produto-imagemCart">
                      <Link to={`/produtos-e-servicos/${item.subCategory}`}>
                        <img
                          src={item.imgCart}
                          className="produto-imagem"
                          alt="Produto"
                        />
                      </Link>
                    </div>
                  </td>
                  <td>R$ {item.price}</td>
                  <td>
                    <div className="quantidade">
                      {item.quantidade > 1 ? (
                        <>
                          <button onClick={() => diminuirQuantidade(index)}>
                            <MdRemove />
                          </button>
                          <span className="quantidade">{item.quantidade}</span>
                          <button onClick={() => aumentarQuantidade(index)}>
                            <MdAdd />
                          </button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => removerItem(item.id)}>
                            <RiDeleteBin6Line />
                          </button>
                          <span className="quatidade">{item.quantidade}</span>
                          <button onClick={() => aumentarQuantidade(index)}>
                            <MdAdd />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="totalprod">
                    R${" "}
                    {(
                      item.quantidade * parseFloat(item.price.replace(",", "."))
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>
                  <td>
                    <button
                      className="listaFav-bnt"
                      onClick={() => openModal(item.id)}
                    >
                      <TbHeartPlus />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <aside>
          <div className="caixa">
            <center>
              {" "}
              <header className="resumo-text">Resumo da Compra</header>{" "}
            </center>
            <div className="informacao">
              {prazoMinimoTotal > 0 && prazoMaximoTotal > 0 && (
                <p className="prazo">
                  Prazo Estimado: {prazoMinimoTotal} a {prazoMaximoTotal} dias
                  úteis
                </p>
              )}
              <br />
              <div className="metodos-pagamento">
                <div className="metodo-pagamento">
                  <input
                    type="radio"
                    id="pix"
                    className="metodo_pagamento"
                    name="metodo_pagamento"
                    value="pix"
                    onChange={() => setMetodoPagamento("pix")}
                  />
                  <label htmlFor="pix">Pix</label>
                  {metodoPagamento === "pix" && (
                    <div className="mensagem-pagamento">
                      {getMensagemPagamento()}
                    </div>
                  )}
                </div>
                <div className="metodo-pagamento">
                  <input
                    type="radio"
                    id="Debito"
                    className="metodo_pagamento"
                    name="metodo_pagamento"
                    value="debito"
                    onChange={() => setMetodoPagamento("debito")}
                  />
                  <label htmlFor="Debito">Cartão de Débito</label>
                  {metodoPagamento === "debito" && (
                    <div className="mensagem-pagamento">
                      {getMensagemPagamento()}
                    </div>
                  )}
                </div>
                <div className="metodo-pagamento">
                  <input
                    type="radio"
                    id="Credito"
                    className="metodo_pagamento"
                    name="metodo_pagamento"
                    value="credito"
                    onChange={() => setMetodoPagamento("credito")}
                  />
                  <label htmlFor="Credito">Cartão de Crédito</label>
                  {metodoPagamento === "credito" && (
                    <div className="mensagem-pagamento">
                      {getMensagemPagamento()}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div id="subtotal" className="sub">
              <span className="texto-abaixo">Sub-total:</span>
              <span>
                R${" "}
                {calcularSubtotal().toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            <footer>
              <span className="texto-abaixo">Total:</span>
              <span className="total_final">
                R${" "}
                {calcularTotalComJuros().toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </footer>
          </div>
          <center>
            <Link to="/">
              <button type="button" className="bnt-finalizarCart">
                Finalizar Compra
              </button>
            </Link>
          </center>
        </aside>
      </div>

      {/* Janela Modal (Caixa de Diálogo) */}
      {janelaModal && (
        <div className="fundo-modalC">
          <div className="confirm-modalC">
            <p className="text-modalCart">
              Tem certeza que deseja mover o produto do carrinho de
              compras para a lista de favoritos?
            </p>
            <div className="modal-buttonsC">
              <button className="btn-noCart" onClick={() => closeModal()}>
                NÃO
              </button>
              <button
                className="btn-yesCart"
                onClick={() => moverProdFav(produtoId)}
              >
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