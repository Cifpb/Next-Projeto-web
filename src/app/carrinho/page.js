"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import { HiShoppingCart } from "react-icons/hi";
import { MdFavoriteBorder, MdRemove, MdAdd } from "react-icons/md";
import { TbHeartPlus } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import Footer from "../footer/footer";

export default function Cart() {
  const [cart, setCart] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [janelaModal, setJanelaModal] = useState(false);
  const [produtoId, setProdutoId] = useState(null);
  const [selecionados, setSelecionados] = useState({});
  const [todosSelecionados, setTodosSelecionados] = useState(false);

  useEffect(() => {
    // Simulando o carregamento do carrinho
    const localCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(localCart);

    const novosSelecionados = {};
    localCart.forEach(item => {
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

  const aumentarQuantidade = (index) => {
    const newCart = [...cart];
    newCart[index].quantidade += 1;
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const diminuirQuantidade = (index) => {
    const newCart = [...cart];
    if (newCart[index].quantidade > 1) {
      newCart[index].quantidade -= 1;
      setCart(newCart);
      localStorage.setItem('cart', JSON.stringify(newCart));
    }
  };

  const removerItem = (productId) => {
    const newCart = cart.filter(item => item.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const calcularSubtotal = () => {
    return cart.reduce((subtotal, item) => {
      if (selecionados[item.id]) {
        const precoFloat = parseFloat(item.price.replace(",", "."));
        subtotal += item.quantidade * precoFloat;
      }
      return subtotal;
    }, 0);
  };

  const openModal = (id) => {
    setProdutoId(id);
    setJanelaModal(true);
  };

  const closeModal = () => {
    setJanelaModal(false);
  };

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

  const getMensagemPagamento = () => {
    switch (metodoPagamento) {
      case "pix":
        return "Pagamento finalizado na hora. Você pode finalizar o seu Pix por meio do QR code ou código do banco que preferir! Este código será válido por 24 horas.";
      case "credito":
        return "Pagamento com cartão de crédito. Podem ser aplicados juros, verifique o valor total antes de confirmar a compra.";
      case "debito":
        return "Pagamento com cartão de débito. O valor será debitado na hora da compra.";
      default:
        return "";
    }
  };

  const calcularPrazoEstimado = () => {
    let prazoMinimoTotal = 0;
    let prazoMaximoTotal = 0;

    cart.forEach(item => {
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
    });

    return { prazoMinimoTotal, prazoMaximoTotal };
  };

  const { prazoMinimoTotal, prazoMaximoTotal } = calcularPrazoEstimado();

  return (
    <div className="tela-cart">
      <div className="menuCart">
        <div className="espaco-d"></div>
        <div className="obj-esquerda">
          <Link href="/favoritos">
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
                    onClick={selecionarTodos}
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
                      <Link href={`/produtos-e-servicos/${item.subCategory}`}>
                        <img src={item.imgCart} className="produto-imagem" alt="Produto" />
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
                    <button className="listaFav-bnt" onClick={() => openModal(item.id)}>
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
              <header className="resumo-text">Resumo da Compra</header>
            </center>
            <div className="informacao">
              {prazoMinimoTotal > 0 && prazoMaximoTotal > 0 && (
                <p className="prazo">
                  Prazo Estimado: {prazoMinimoTotal} a {prazoMaximoTotal} dias úteis
                </p>
              )}
              <br />
              <div className="metodos-pagamento">
                <div className="metodo-pagamento">
                  <input
                    type="radio"
                    id="pix"
                    className="metodo_pagamento"
                    name="metodoPagamento"
                    onChange={() => setMetodoPagamento("pix")}
                  />
                  <label htmlFor="pix">PIX</label>
                </div>
                <div className="metodo-pagamento">
                  <input
                    type="radio"
                    id="credito"
                    className="metodo_pagamento"
                    name="metodoPagamento"
                    onChange={() => setMetodoPagamento("credito")}
                  />
                  <label htmlFor="credito">Cartão de Crédito</label>
                </div>
                <div className="metodo-pagamento">
                  <input
                    type="radio"
                    id="debito"
                    className="metodo_pagamento"
                    name="metodoPagamento"
                    onChange={() => setMetodoPagamento("debito")}
                  />
                  <label htmlFor="debito">Cartão de Débito</label>
                </div>
              </div>
              {metodoPagamento && (
                <p className="metodo-msg">
                  {getMensagemPagamento()}
                </p>
              )}
            </div>
            <div className="total">
              <span className="titulo">Subtotal:</span>
              <span className="val">
                R${" "}
                {calcularSubtotal().toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
            {metodoPagamento && (
              <div className="total">
                <span className="titulo">Total com Juros:</span>
                <span className="val">
                  R${" "}
                  {calcularTotalComJuros().toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            )}
          </div>
        </aside>
      </div>

      {janelaModal && (
        <div className="modal">
          <div className="conteudo-modal">
            <button className="fechar" onClick={closeModal}>X</button>
            <h2>Confirmação</h2>
            <p>Você realmente deseja adicionar esse item aos favoritos?</p>
            <button>Adicionar aos Favoritos</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
