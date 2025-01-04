"use client";
import { useState, useEffect } from 'react';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import style from '../../app/cadastrar/page.module.css';

export default function ClienteForm({ onAddCliente, etapa }) {

  const [nome_completo, setNome_completo] = useState('');
  const [telefone, setTelefone] = useState('');
  const [data_nascimento, setDataNascimento] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [erro, setErro] = useState('');
  const [erroEmail, setErroEmail] = useState(''); 

  let handleTelChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, '');

    if (value.length <= 13) {
      // Adicionar a formatação para o número de telefone com código do país
      value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3-$4');
      setTelefone(value);
    }
  };

  let autMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  useEffect(() => {

    setFormValid(
      email.length >= 10 &&
      email.length <= 150 &&
      senha.length >= 8 &&
      senha.length <= 12 
    );
  }, [email, senha]);

  useEffect(() => {
    const clienteParcial = JSON.parse(localStorage.getItem('cliente_parcial'));
    if (clienteParcial) {
      setNome_completo(clienteParcial.nome_completo || '');
      setTelefone(clienteParcial.telefone || '');
      setDataNascimento(clienteParcial.data_nascimento || '');
    }
  }, []);

  const router = useRouter();

  /*const handleSubmit = async (e) => {
    e.preventDefault();
    setErro(''); // Limpa erros anteriores

    const clienteCompleto = { nome_completo, telefone, data_nascimento, email, senha };
    try {
      const response = await fetch('/api/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteCompleto)
      });

      if (!response.ok) {
        const data = await response.json();
        setErro(data.error || 'Erro ao cadastrar cliente.');
        return;
      }

      await onAddCliente(clienteCompleto);
      localStorage.removeItem('cliente_parcial');

      // Redireciona para a tela de conclusão
      router.push('/cadastrar/concluido');
    } catch (error) {
      setErro('Erro inesperado. Tente novamente mais tarde.');
      console.error(error);
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErro('');
    setErroEmail(''); // Limpa o erro de e-mail
  
    const clienteCompleto = { nome_completo, telefone, data_nascimento, email, senha };
    try {
      const response = await fetch('/api/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(clienteCompleto)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        if (response.status === 400 && data.error.includes('E-mail')) {
          setErroEmail(data.error); // Define erro específico para e-mail inválido
        } else {
          setErro(data.error || 'Erro ao cadastrar cliente.');
        }
        return;
      }
  
      await onAddCliente(clienteCompleto);
      localStorage.removeItem('cliente_parcial');
      router.push('/cadastrar/concluido');
  
    } catch (error) {
      setErro('Erro inesperado. Tente novamente mais tarde.');
      console.error(error);
    }
  };  

  return (
    <form onSubmit={handleSubmit}>

      {/* Renderizar dados pessoais */}
      {etapa === "dados-pessoais" && (
        <>
          <div className={style.dados}>
            <p><label>
              <strong>Nome Completo:<br /></strong>
              <input
                type="text"
                className={style.inputComum}
                placeholder="Nome Completo"
                maxLength="50"
                minLength="15"
                required
                value={nome_completo}
                onChange={(e) => setNome_completo(e.target.value)}
              />
            </label></p>

            <p><label>
              <strong>Telefone:<br /></strong>
              <input
                type="tel"
                className={style.inputComum}
                value={telefone}
                onChange={handleTelChange}
                placeholder="+00 00 00000-0000"
              />
            </label></p>

            <p><label>
              <strong>Data de Nascimento:</strong>
              <input
                type="date"
                className={style.inputComum}
                max="2007-01-01"
                min="1944-01-01"
                required
                value={data_nascimento}
                onChange={(e) => setDataNascimento(e.target.value)}
              />
            </label></p>

            <Link href="/cadastrar/dados-secundarios">
              <button
                type="button"
                className={style.proximo}
                onClick={() => {
                  localStorage.setItem('cliente_parcial', JSON.stringify({
                    nome_completo,
                    telefone,
                    data_nascimento
                  }));
                }}
              >
                Prosseguir
              </button>
            </Link>


          </div>
        </>
      )}

      {erro && <div className={style.erro_email}>{erro}</div>}
      {erroEmail && <div className={style.erro_email}>{erroEmail}</div>}

      {/* Renderizar dados secundários */}
      {etapa === "dados-secundarios" && (
        <>
          <div className={style.dadosEmail}>
            <p><label>
              <strong>E-mail:<br /></strong>
              <input
                type="email"
                className={style.inputComum}
                placeholder="E-mail"
                maxLength="150"
                minLength="10"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label></p>

            <label>
              <div className="senha">
                <strong>Senha:<br /></strong>
                <input
                  type={mostrarSenha ? "text" : "password"}
                  className={style.inputComum}
                  id="senha"
                  placeholder="Senha"
                  maxLength="12"
                  minLength="8"
                  required
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                />
                <button type="button" className={style.icone_olho} onClick={autMostrarSenha}>
                  {mostrarSenha ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>
            </label>
          </div>

          <div className={style.botoes}>
            <Link href="dados-pessoais" className={style.volta}>Voltar</Link>
            <button
              type="submit"
              className={style.proximo_1}
              disabled={!formValid}>
              Prosseguir
            </button>
          </div>
        </>
      )}
    </form>
  );
}
