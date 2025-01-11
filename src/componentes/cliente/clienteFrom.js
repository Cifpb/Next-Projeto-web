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
  const [formValidDP, setFormValidDP] = useState(false);
  const [erro, setErro] = useState('');
  const [erroEmail, setErroEmail] = useState('');
  const [erroDataNascimento, setErroDataNascimento] = useState('');

  const validarDataNascimento = (data) => {
    const hoje = new Date();
    const dataSelecionada = new Date(data);

    const idadeMinima = new Date(hoje.getFullYear() - 18, hoje.getMonth(), hoje.getDate());
    const idadeMaxima = new Date(hoje.getFullYear() - 85, hoje.getMonth(), hoje.getDate());

    if (dataSelecionada > idadeMinima) {
      setErroDataNascimento('Você precisa ter no mínimo 18 anos para se cadastrar.');
      return false;
    } else if (dataSelecionada < idadeMaxima) {
      setErroDataNascimento('A idade máxima permitida é de 80 anos.');
      return false;
    }
    setErroDataNascimento('');
    return true;
  };

  const handleDataNascimentoChange = (e) => {
    const data = e.target.value;
    setDataNascimento(data);

    if (data) {
      validarDataNascimento(data);
    }
  };

  useEffect(() => {

    const nomeValido = nome_completo.length >= 10 && nome_completo.length <= 150;
    const telefoneNumerico = telefone.replace(/\D/g, '');
    const telefoneValido = telefoneNumerico.length === 13;
    // const dataValida = validarDataNascimento(data_nascimento);
    const dataValida = data_nascimento !== '';
  
    // Atualizar a validade do formulário com base em todas as condições
    setFormValidDP(nomeValido && telefoneValido && dataValida);
  }, [nome_completo, telefone, data_nascimento]);

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
      {erroDataNascimento && <div className={style.erro}>{erroDataNascimento}</div>}
      {etapa === "dados-pessoais" && (
        <>
          <div className={style.dados}>
            <p><label>
              <strong>Nome Completo:<br /></strong>
              <input
                type="text"
                className={style.inputComum}
                placeholder="Nome Completo"
                maxLength="150"
                minLength="10"
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
                required
                value={data_nascimento}
                onChange={handleDataNascimentoChange}
              />
            </label></p>

            <Link href="/cadastrar/dados-secundarios">
              <button
                type="button"
                className={style.proximo}
                disabled={!formValidDP}
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

      {erro && <div className={style.erro}>{erro}</div>}
      {erroEmail && <div className={style.erro}>{erroEmail}</div>}

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
