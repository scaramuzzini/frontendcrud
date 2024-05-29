import { useState } from "react";
import api from "../api";

const UserForm = ({ fetchUsers }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/users', {
                name: name,
                email: email
            });
            fetchUsers();
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Falha ao salvar usuário', error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                id="name"
                placeholder="Nome do Usuário"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                type="text"
                id="email"
                placeholder="Email do usuário"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Enviar</button>
        </form>
    )

}

export default UserForm;