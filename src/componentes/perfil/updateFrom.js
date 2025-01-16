'use client';
import { useState, useEffect } from 'react';

const initializeFormData = (cliente) => ({
    nome_completo: cliente?.nome_completo || '',
    data_nascimento: cliente?.data_nascimento || '',
    cpf: cliente?.cpf || '',
    telefone: cliente?.telefone || '',
    pais: cliente?.pais || '',
    estado: cliente?.estado || '',
    email: cliente?.email || ''
});

const validarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.substring(10, 11));
};

const formatarCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]/g, ''); // Remove caracteres não numéricos
    if (cpf.length <= 11) {
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }
    return cpf;
};

export default function UpdateForm({ cliente, onClose, onSave }) {

    const [telefone, setTelefone] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [erroDataNascimento, setErroDataNascimento] = useState('');
    const [nome_completo, setNome_completo] = useState('');
    const [erroCPF, setErroCPF] = useState('');

    //Conecção com o BD
    const [formData, setFormData] = useState(initializeFormData(cliente));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cliente) {
            setFormData(initializeFormData(cliente));
        }
    }, [cliente]);

    const handleChange = ({ target: { name, value } }) => {
        if (name === 'cpf') {
            value = formatarCPF(value); // Aplica a formatação
            setErroCPF(validarCPF(value) ? '' : 'CPF inválido'); // Valida o CPF
        }
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    /*const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };*/

    const handleSave = async () => {

        if (!validarCPF(formData.cpf)) {
            setErroCPF('CPF inválido. Verifique os dados.');
            return;
        }

        setLoading(true);
        
        try {
            const response = await fetch('/api/update', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 200) {
                onSave(formData); // Atualiza os dados
                onClose(); // Fecha o modal
            } else {
                console.error('Erro ao salvar dados:', data.error);
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
        } finally {
            setLoading(false);
        }
    };

    let handleTelChange = (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
    
        if (value.length <= 13) {
          // Adicionar a formatação para o número de telefone com código do país
          value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3-$4');
          setTelefone(value);
        }
      };

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

      /*useEffect(() => {
        const nomeValido = nome_completo.length >= 10 && nome_completo.length <= 150;
        const telefoneNumerico = telefone.replace(/\D/g, '');
        const telefoneValido = telefoneNumerico.length === 13;
        const dataValida = data_nascimento !== '';
      
        // Atualizar a validade do formulário com base em todas as condições
        setFormValidDP(nomeValido && telefoneValido && dataValida);
      }, [nome_completo, telefone, data_nascimento]);*/

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Perfil</h2>
                <label>Nome Completo:</label>
                <input
                    name="nome_completo"
                    value={nome_completo || formData.nome_completo}
                    onChange={handleChange}
                />
                {erroDataNascimento && <div className="erro">{erroDataNascimento}</div>}
                <label>Data de Nascimento:</label>
                <input
                    name="data_nascimento"
                    type="date"
                    value={data_nascimento || formData.data_nascimento}
                    onChange={(e) => {
                        handleChange(e);
                        handleDataNascimentoChange(e);
                    }}
                />
                <label>CPF:</label>
                <input
                    name="cpf"
                    placeholder="XXX.XXX.XXX-XX"
                    value={formData.cpf}
                    onChange={handleChange}
                />
                {erroCPF && <div className="erro">{erroCPF}</div>}
                <label>Telefone:</label>
                <input
                    name="telefone"
                    placeholder="+00 00 00000-0000"
                    value={telefone || formData.telefone}
                    onChange={(e) => {
                        handleTelChange(e);
                        handleChange(e);
                    }}
                />
                <label>País:</label>
                <input
                    name="pais"
                    value={formData.pais}
                    onChange={handleChange}
                />
                <label>Estado:</label>
                <input
                    name="estado"
                    value={formData.estado}
                    onChange={handleChange}
                />
                <div className="actions">
                    <button onClick={onClose} disabled={loading}>Cancelar</button>
                    <button onClick={handleSave} disabled={loading}>Salvar</button>
                </div>
            </div>
        </div>
    );
}
