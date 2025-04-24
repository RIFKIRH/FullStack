import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUser] = useState([]);
    const [errorMessage, setErrorMessage] = useState(""); // Tambahkan state untuk pesan error

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/users");
            setUser(response.data); // Simpan data ke state
        } catch (error) {
            setErrorMessage("Failed to fetch users. Please try again.");
            console.error("Error fetching users:", error);
        }
    };

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            getUsers(); // Refresh the user list after deletion
        } catch (error) {
            setErrorMessage("Failed to delete user. Please try again.");
            console.error("Error deleting user:", error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                <Link to="/add" className="button is-success">Add New</Link>
                <table className="table is-striped is-hoverable is-fullwidth mt-3">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Gender</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.id}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.gender}</td>
                                <td>
                                    <Link to={`/edit/${user.id}`} className="button is-small is-info">Edit</Link>
                                    <button
                                        onClick={() => deleteUser(user.id)}
                                        className="button is-small is-danger"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;