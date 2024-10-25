import React , {useState} from 'react';
import axios from 'axios';
import './CreateUser.css';

const CreateUser = () => {

    const [name, setName] = useState('');
    const [mail, setMail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5003/createuser', { name, mail, password });
            setName('');
            setMail('');
            setPassword('');
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };
    
  return (
    <div className="create-user-container">
            <h2>Create User</h2>
            <form className="create-user-form" onSubmit={handleSubmit}>
                <label>Name</label>
                <input
                    type="text"
                    placeholder='Enter The Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <label>Email</label>
                <input
                    type="email"
                    placeholder='Enter The Email'
                    value={mail}
                    onChange={(e) => setMail(e.target.value)}
                    required
                />
                <label>Password</label>
                <input
                    type="password"
                    placeholder='Enter The Password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Create User</button>
            </form>
        </div>
  )
}

export default CreateUser
