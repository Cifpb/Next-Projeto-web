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

export default function UpdateForm({ cliente, onClose, onSave }) {

    const [telefone, setTelefone] = useState('');
    const [data_nascimento, setDataNascimento] = useState('');
    const [erroDataNascimento, setErroDataNascimento] = useState('');
    const [nome_completo, setNome_completo] = useState('');
    const [erroAPI, setErroAPI] = useState('');
    const [paises, setPaises] = useState([]);
    const [estados, setEstados] = useState([]);

    //Conecção com o BD
    const [formData, setFormData] = useState(initializeFormData(cliente));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cliente) {
            setFormData(initializeFormData(cliente));
        }
        setPaises(['Brasil', 'Estados Unidos', 'Canadá']);
    }, [cliente]);

    const handleChange = ({ target: { name, value } }) => {
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePaisChange = async (e) => {
        const paisSelecionado = e.target.value;
        setFormData((prev) => ({ ...prev, pais: paisSelecionado, estado: '' }));

        // Se o Brasil for selecionado, busca os estados
        if (paisSelecionado === 'Brasil') {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const data = await response.json();
            setEstados(data.map((estado) => estado.nome));
        } else {
            setEstados([]); // Limpa os estados para outros países
        }
    };

    const handleSave = async () => {
        setLoading(true);
        setErroAPI('');

        try {
            const response = await fetch('/api/update', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.status === 200) {
                onSave(formData);
                onClose();
            } else {
                setErroAPI(data.error || 'Erro ao salvar dados.');
            }
        } catch (error) {
            setErroAPI('Erro inesperado. Tente novamente mais tarde.');
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
                {erroAPI && <div className="erro">{erroAPI}</div>}
                <label>Nome Completo:</label>
                <input
                    name="nome_completo"
                    className='inputs'
                    value={nome_completo || formData.nome_completo}
                    onChange={handleChange}
                />
                {erroDataNascimento && <div className="erro">{erroDataNascimento}</div>}
                <label>Data de Nascimento:</label>
                <input
                    name="data_nascimento"
                    className='inputs'
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
                    className='inputs'
                    placeholder="XXX.XXX.XXX-XX"
                    value={formData.cpf}
                    onChange={handleChange}
                />

                <label>Telefone:</label>
                <input
                    name="telefone"
                    className='inputs'
                    placeholder="+00 00 00000-0000"
                    value={telefone || formData.telefone}
                    onChange={(e) => {
                        handleTelChange(e);
                        handleChange(e);
                    }}
                />

                <div className="select-group">
                    <div>
                        <label>País:</label>
                        <select
                            name="pais"
                            value={formData.pais}
                            onChange={handlePaisChange}
                        >
                            <option value="">Selecione um país</option>
                            {paises.map((pais) => (
                                <option key={pais} value={pais}>
                                    {pais}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label>Estado:</label>
                        <select
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            disabled={!formData.pais || estados.length === 0}
                        >
                            <option value="">Selecione um estado</option>
                            {estados.map((estado) => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="actions">
                    <button onClick={onClose} disabled={loading}>Cancelar</button>
                    <button onClick={handleSave} disabled={loading}>Salvar</button>
                </div>
            </div>
        </div>
    );
}
