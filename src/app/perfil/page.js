'use client';
import { useState, useEffect } from 'react';
import PRimg from '../../../public/perfil/foto-perfil.png';
import Header from '../header/header';
import Footer from '../footer/footer';
import Image from "next/image";
import { TbEdit } from "react-icons/tb";
import { RiDeleteBin6Line } from "react-icons/ri";
import './perfil.css';
import UpdateFrom from '../../componentes/perfil/updateFrom';

export default function Profile() {
  const [cliente, setCliente] = useState(null);  
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedCliente, setUpdatedCliente] = useState(cliente);

  useEffect(() => {
    const fetchCliente = async () => {
      try {
        const response = await fetch('/api/perfil', {
          method: 'GET',
        });

        if (response.ok) {
          const data = await response.json();
          setCliente(data);
        } else {
          console.error('Erro ao buscar os dados do cliente.');
        }
      } catch (error) {
        console.error('Erro ao recuperar dados do cliente:', error);
      }
    };


    fetchCliente();
  }, []);


  // Exibe um carregamento enquanto os dados não estão disponíveis
  if (!cliente) {
    return <center style={{ marginTop: '25%', fontFamily: 'Century Gothic, sans-serif', fontSize: '1.5rem'  }}>Carregando...</center>;
  }

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = (newData) => {
    const updatedData = { ...newData, email: cliente.email }; // Garantir que o email seja incluído
    setUpdatedCliente(updatedData); // Atualiza os dados localmente após salvar
    // Aqui você pode chamar a função para enviar os dados à API se necessário
  };  

  return (
    <div className='tela-perfil-completa'>
      <Header />
      <div className="tela-perfil">
        <div className="perfil">
          <div className="retangulo foto-nome-email">
            <div className="foto-container">
              <Image src={PRimg} className="foto-perfil" alt="foto do perfil" />
            </div>
            <div>
              <h2 className="nome-perfil">{cliente.nome_completo}</h2>
              <p className="email-perfil">{cliente.email}</p>
            </div>
          </div>

          <div className="retangulo dados-pessoais">
            <h3 className="titulo-dados">Dados Pessoais</h3>
            <div className="conteudo-dados">
              <div className="coluna-esquerda">
                <div className="campo">
                  <p className="rotulo">Nome:</p>
                  <p className="valor">{cliente.nome_completo}</p>
                </div>
                <div className="campo">
                  <p className="rotulo">Data de nascimento:</p>
                  <p className="valor">{cliente.data_nascimento}</p>
                </div>
                <div className="campo">
                  <p className="rotulo">CPF:</p>
                  <p className="valor">{cliente.cpf}</p>
                </div>
              </div>

              <div className="coluna-direita">
                <div className="campo">
                  <p className="rotulo">Telefone:</p>
                  <p className="valor">{cliente.telefone}</p>
                </div>
                <div className="campo">
                  <p className="rotulo">Localização:</p>
                  <p className="valor">{`${cliente.pais}, ${cliente.estado}`}</p>
                </div>
                <div className="icones-acoes">
                  <TbEdit className="icone-editar" onClick={handleEdit} />
                  <RiDeleteBin6Line className="icone-deletar" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isEditing && (
        <UpdateFrom
          cliente={updatedCliente}
          onClose={() => setIsEditing(false)}
          onSave={handleSave}
        />
      )}
      <Footer />
    </div>
  );
}


