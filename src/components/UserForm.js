import { useEffect, useState } from "react";
import api from "../api";

const UserForm = ({ fetchUsers, userToEdit, setUserToEdit, addUser }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        if (userToEdit) {
            setName(userToEdit.name);
            setEmail(userToEdit.email);
        }
    }, [userToEdit]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (userToEdit) {
                await api.put(`/users/${userToEdit.id}`, {
                    name: name,
                    email: email
                });
                setUserToEdit(null);
            } else { //only new users
                const response = await api.post('/users', {
                    name: name,
                    email: email
                });
                //Como a API não salva o usuário, adicionamos o novo usuário a lista
                addUser(response.data);
            }
            //fetchUsers();
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