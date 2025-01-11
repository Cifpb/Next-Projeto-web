import { useState } from 'react';
import style from '../../app/login/page.module.css';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function ClienteLogin() {
    
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [erro, setErro] = useState('');
    const router = useRouter();

    const autMostrarSenha = () => {
        setMostrarSenha(!mostrarSenha);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErro(''); // Limpar erro ao tentar login

        const dadosLogin = { email, senha };

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(dadosLogin)
            });

            const data = await response.json();

            if (response.ok) {
                // Login bem-sucedido, redireciona o usuário para a página inicial
                sessionStorage.setItem('logado', 'true'); // Salva no sessionStorage
                localStorage.setItem('email', email); // Salva o e-mail no localStorage
                router.push('/');
            } else {
                // Se houver erro, mostra a mensagem de erro
                setErro(data.error || 'Erro ao realizar o login.');
            }
        } catch (error) {
            setErro('Erro inesperado. Tente novamente mais tarde.');
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className={style.formulario_grupo}>
                <input
                    type="email"
                    id="email"
                    placeholder="E-mail"
                    required
                    autoComplete="off"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>

            <div className={style.formulario_grupo}>
                <input
                    type={mostrarSenha ? "text" : "password"}
                    id="password"
                    placeholder="Senha"
                    minLength={8}
                    maxLength={12}
                    required
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />
                <button
                    type="button"
                    className={style.icone_eye}
                    onClick={autMostrarSenha}
                >
                    {mostrarSenha ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
            </div>

            {erro && <div className={style.erro_login}>{erro}</div>}

            <div className={style.formulario_links}>
                <Link href="/redefinir-senha">Esqueceu a senha?</Link>
                <div className={style.formulario_grupo}>
                    <center>
                        <input type="submit" value="Entrar" />
                    </center>
                </div>
                <span className={style.texto_criar_conta}>Ainda não tem conta?</span>
                <Link href="/cadastrar/dados-pessoais">Cadastre-se</Link>
            </div>
        </form>
    );
}
