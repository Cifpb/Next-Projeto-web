"use client";
import React, { useEffect, useState } from "react";
import Cad from "../../../../public/cadastrar/cad.png";
import style from '../page.module.css';
import Header from "../../header/header";
import Footer from "../../footer/footer";
import Image from "next/image";
import Link from 'next/link';
import ClienteForm from '../../../componentes/cliente/clienteFrom';

export default function Register2() {

  // Conecção com o BD
  const [clientes, setClientes] = useState([])

  useEffect(() => {
    fetchClientes()
  }, [])

  const fetchClientes = async () => {
    const response = await fetch('/api/cliente')
    const data = await response.json()
    setClientes(data)
  }

  const addCliente = async (cliente) => {
    const response = await fetch('/api/cliente', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cliente),
    })
    if (response.ok) {
      fetchClientes()
    }
  }

  return (
    <div className={style.tela_cadastro}>
      <Header />
      <div className={style.cadastro}>
        <div className={style.pt1}>
          <Image src={Cad} alt="imagem" className={style.imagem} />
          <p className={style.texto}><strong>Cadastre-se <br />para obter<br /> nossos Serviços.</strong></p>
        </div>
        <div className={style.retanguloAmarelo}>
          <div className={style.etapas}>
            <p><strong>Seus dados</strong></p>
            <p><strong>Email e senha</strong></p>
            <p><strong>Concluído!</strong></p>
          </div>
          <div className={style.nave} style={{ textAlign: 'center' }}>
            <input type="radio" id="radio1" name="radios" value="opcao1" disabled />
            <input type="radio" id="radio2" name="radios" value="opcao2" defaultChecked />
            <input type="radio" id="radio3" name="radios" value="opcao3" disabled />
          </div>

          <ClienteForm onAddCliente={addCliente} etapa="dados-secundarios" />

        </div>
      </div>
      <Footer />
    </div>
  );
}
