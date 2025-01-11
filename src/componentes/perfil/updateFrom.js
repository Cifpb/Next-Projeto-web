'use client';
import { useState, useEffect } from 'react';

const initializeFormData = (cliente) => ({
    nome_completo: cliente?.nome_completo || '',
    data_nascimento: cliente?.data_nascimento || '',
    cpf: cliente?.cpf || '',
    telefone: cliente?.telefone || '',
    cidade: cliente?.cidade || '',
    bairro: cliente?.bairro || '',
    rua: cliente?.rua || '',
    email: cliente?.email || ''
});

export default function UpdateForm({ cliente, onClose, onSave }) {
    const [telefone, setTelefone] = useState('');
    const [formData, setFormData] = useState(initializeFormData(cliente));
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cliente) {
            setFormData(initializeFormData(cliente));
        }
    }, [cliente]);

    const handleChange = ({ target: { name, value } }) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
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
            value = value.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3-$4');
            setTelefone(value);
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <h2>Editar Perfil</h2>

                <label>Nome Completo:</label>
                <input name="nome_completo" value={formData.nome_completo} onChange={handleChange} />

                <label>Data de Nascimento:</label>
                <input name="data_nascimento" type="date" value={formData.data_nascimento} onChange={handleChange} />

                <label>CPF:</label>
                <input name="cpf" value={formData.cpf} onChange={handleChange} />

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

                <label>Cidade:</label>
                <input name="cidade" value={formData.cidade} onChange={handleChange} />

                <label>Rua:</label>
                <input name="rua" value={formData.rua} onChange={handleChange} />

                <label>Bairro:</label>
                <input name="bairro" value={formData.bairro} onChange={handleChange} />

                <div className="actions">
                    <button onClick={onClose} disabled={loading}>Cancelar</button>
                    <button onClick={handleSave} disabled={loading}>Salvar</button>
                </div>
            </div>
        </div>
    );
}
