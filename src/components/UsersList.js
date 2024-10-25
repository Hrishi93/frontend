import React, {useState , useEffect} from 'react';
import axios from 'axios';
import './UsersList.css';

const UsersList = () => {

    const [users, setUsers] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editUser, setEditUser] = useState({});

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5003/getusers");
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5003/delete/${id}`);
            fetchUsers();
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };

    const editUserHandler = (user) => {
        setIsEditing(true);
        setEditUser(user);
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditUser({ ...editUser, [name]: value });
    };

    const submitEditUser = async (id) => {
        try {
            await axios.put(`http://localhost:5003/update/${id}`, editUser);
            setIsEditing(false);
            fetchUsers();
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };
    
    
  return (
    <div className="user-list-container">
    <h2>User List</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            {users.map((user) => (
                <tr key={user._id}>
                    {isEditing && editUser._id === user._id ? (
                        <>
                            <td>
                                <input
                                    type="text"
                                    name="name"
                                    value={editUser.name}
                                    onChange={handleEditInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="mail"
                                    value={editUser.mail}
                                    onChange={handleEditInputChange}
                                />
                            </td>
                            <td>
                                <button className="save-btn" onClick={() => submitEditUser(user._id)}>
                                    Save
                                </button>
                                <button className="cancel-btn" onClick={() => setIsEditing(false)}>
                                    Cancel
                                </button>
                            </td>
                        </>
                    ) : (
                        <>
                            <td>{user.name}</td>
                            <td>{user.mail}</td>
                            <td>
                                <button className="edit-btn" onClick={() => editUserHandler(user)}>
                                    Edit
                                </button>
                                <button className="delete-btn" onClick={() => deleteUser(user._id)}>
                                    Delete
                                </button>
                            </td>
                        </>
                    )}
                </tr>
            ))}
        </tbody>
    </table>
</div>
  )
}

export default UsersList
