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
    const [formData, setFormData] = useState(initializeFormData(cliente));
    const [pais, setPais] = useState([]);
    const [estado, setEstado] = useState([]);
    const [erroDataNascimento, setErroDataNascimento] = useState('');
    const [erroAPI, setErroAPI] = useState('');
    const [formValid, setFormValid] = useState(false);
    const [loading, setLoading] = useState(false);


    const formatarCPF = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length <= 11) {
            value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        }
        return value;
    };


    const formatarTelefone = (value) => {
        value = value.replace(/\D/g, '');
        if (value.length <= 13) {
            value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3-$4');
        }
        return value;
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
            setErroDataNascimento('A idade máxima permitida é de 85 anos.');
            return false;
        }
        setErroDataNascimento('');
        return true;
    };


    const handleChange = ({ target: { name, value } }) => {
        let newValue = value;
   
        if (name === 'cpf') {
            // Remove caracteres não numéricos e limita a 11 dígitos
            newValue = value.replace(/\D/g, '').slice(0, 11);
            newValue = formatarCPF(newValue);
        }
   
        if (name === 'telefone') {
            // Remove caracteres não numéricos e limita a 13 dígitos
            newValue = value.replace(/\D/g, '').slice(0, 13);
            newValue = formatarTelefone(newValue);
        }
   
        if (name === 'data_nascimento') {
            validarDataNascimento(value);
        }
   
        setFormData((prev) => ({ ...prev, [name]: newValue }));
    };
   


    const handlePaisChange = async (e) => {
        const paisSelecionado = e.target.value;
        setFormData((prev) => ({ ...prev, pais: paisSelecionado, estado: '' }));


        if (paisSelecionado === 'Brasil') {
            const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
            const data = await response.json();
            setEstado(data.map((estado) => estado.nome));
        } else {
            setEstado([]);
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


    useEffect(() => {
        const nomeValido = formData.nome_completo.length >= 10 && formData.nome_completo.length <= 150;
        const cpfValido = formData.cpf.replace(/\D/g, '').length === 11;
        const telefoneValido = formData.telefone.replace(/\D/g, '').length === 13;
        const dataValida = formData.data_nascimento !== '' && !erroDataNascimento;
        const paisValido = formData.pais !== '';
        const estadoValido = formData.estado !== '';

        setFormValid(nomeValido && cpfValido && telefoneValido && dataValida && paisValido && estadoValido);
    }, [formData, erroDataNascimento]);


    useEffect(() => {
        if (cliente) {
            setFormData(initializeFormData(cliente));
        }
        setPais(['Brasil']);
    }, [cliente]);


    return (
        <div className="modal">
            <div className="modal-content">
                <h2 className="editarT">Editar Perfil</h2>
                {erroAPI && <div className="erro">{erroAPI}</div>}
                <label>Nome Completo:</label>
                <input
                    name="nome_completo"
                    placeholder="Nome Completo"
                    className='inputs'
                    value={formData.nome_completo}
                    onChange={handleChange}
                />
                <label>Data de Nascimento:</label>
                {erroDataNascimento && <div className="erro">{erroDataNascimento}</div>}
                <input
                    name="data_nascimento"
                    className='inputs'
                    type="date"
                    value={formData.data_nascimento}
                    onChange={handleChange}
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
                    value={formData.telefone}
                    onChange={handleChange}
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
                            {pais.map((pais) => (
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
                            disabled={!formData.pais || estado.length === 0}
                        >
                            <option value="">Selecione um estado</option>
                            {estado.map((estado) => (
                                <option key={estado} value={estado}>
                                    {estado}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="actions">
                    <button className='cancelar_bnt' onClick={onClose} disabled={loading}>Cancelar</button>
                    <button className='salvar_bnt' onClick={handleSave} disabled={!formValid || loading}>Salvar</button>
                </div>
            </div>
        </div>
    );
}


