import React, { useEffect, useState } from 'react';
import axios from 'axios';

type Cliente = {
    id: number;
    nome: string;
    data_nascimento: string;
    telefone: string;
    cep: string;
    rua: string;
    bairro: string;
    email: string;
};

const ClienteList: React.FC = () => {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [newCliente, setNewCliente] = useState<Cliente>({
        id: 0,
        nome: '',
        data_nascimento: '',
        telefone: '',
        cep: '',
        rua: '',
        bairro: '',
        email: '',
    });

    useEffect(() => {
        fetchClientes();
    }, []);

    const fetchClientes = async () => {
        const response = await axios.get('http://localhost:8000/api/clientes/');
        setClientes(response.data);
    };

    const addCliente = async () => {
        const response = await axios.post('http://localhost:8000/api/clientes/', newCliente);
        setClientes([...clientes, response.data]);
        setNewCliente({
            id: 0,
            nome: '',
            data_nascimento: '',
            telefone: '',
            cep: '',
            rua: '',
            bairro: '',
            email: '',
        });  // Limpa o formulário
    };

    const updateCliente = async (id: number) => {
        const response = await axios.put(`http://localhost:8000/api/clientes/${id}/`, newCliente);
        setClientes(clientes.map(cliente => (cliente.id === id ? response.data : cliente)));
    };

    const deleteCliente = async (id: number) => {
        await axios.delete(`http://localhost:8000/api/clientes/${id}/`);
        setClientes(clientes.filter(cliente => cliente.id !== id));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold mb-6 text-gray-800">Cadastro de Clientes</h1>
            <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={newCliente.nome}
                    onChange={e => setNewCliente({ ...newCliente, nome: e.target.value })}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    placeholder="Data de Nascimento"
                    value={newCliente.data_nascimento}
                    onChange={e => setNewCliente({ ...newCliente, data_nascimento: e.target.value })}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Telefone"
                    value={newCliente.telefone}
                    onChange={e => setNewCliente({ ...newCliente, telefone: e.target.value })}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="CEP"
                    value={newCliente.cep}
                    onChange={e => setNewCliente({ ...newCliente, cep: e.target.value })}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Rua"
                    value={newCliente.rua}
                    onChange={e => setNewCliente({ ...newCliente, rua: e.target.value })}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    placeholder="Bairro"
                    value={newCliente.bairro}
                    onChange={e => setNewCliente({ ...newCliente, bairro: e.target.value })}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={newCliente.email}
                    onChange={e => setNewCliente({ ...newCliente, email: e.target.value })}
                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button onClick={addCliente} className="bg-blue-500 text-white rounded-lg p-3 hover:bg-blue-600 transition">Adicionar Cliente</button>
            </div>
            <ul>
                {clientes.map(cliente => (
                    <li key={cliente.id} className="flex justify-between items-center p-4 mb-2 border border-gray-300 rounded-lg bg-gray-50 shadow-sm">
                        <div>
                            <p className="font-semibold text-lg text-gray-800">{cliente.nome}</p>
                            <p className="text-gray-600">{cliente.data_nascimento}</p>
                            <p className="text-gray-600">{cliente.telefone}</p>
                            <p className="text-gray-600">{cliente.cep}</p>
                            <p className="text-gray-600">{cliente.rua}</p>
                            <p className="text-gray-600">{cliente.bairro}</p>
                            <p className="text-gray-600">{cliente.email}</p>
                        </div>
                        <div>
                            <button onClick={() => updateCliente(cliente.id)} className="bg-yellow-500 text-white rounded-lg p-2 mx-1 hover:bg-yellow-600 transition">Editar</button>
                            <button onClick={() => deleteCliente(cliente.id)} className="bg-red-500 text-white rounded-lg p-2 mx-1 hover:bg-red-600 transition">Excluir</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ClienteList;
