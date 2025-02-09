"use client";
import React, { useState, useEffect } from "react";
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
import MotionC from "../../../public/produtos/carrinho/icon3.png";
import ProjGraficoC from "../../../public/produtos/carrinho/icon4.png";


export default function Cart() {
  const [cart, setCart] = useState([]);
  const [metodoPagamento, setMetodoPagamento] = useState("");
  const [janelaModal, setJanelaModal] = useState(false);
  const [produtoId, setProdutoId] = useState(null);
  const [selecionados, setSelecionados] = useState({});
  const [todosSelecionados, setTodosSelecionados] = useState(false);


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
        const precoFloat = parseFloat(item.preco.replace(",", "."));
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
              {cart.map((item, index) => (
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
                  <td className={style.carrinhoTd}>R$ {item.preco}</td>
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
                          <button onClick={() => removerItem(item.id)}>
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
              ))}
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
                {calcularSubtotal().toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </footer>
          </div>
          <center>
            <Link href="/">
              <button type="button" className={style.bntFinalizarCart}>
                SOLICITAR PEDIDO
              </button>
            </Link>
          </center>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
