import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

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
        // Tampilkan pop-up konfirmasi menggunakan SweetAlert2
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/users/${id}`);
                    getUsers(); // Refresh daftar pengguna setelah penghapusan
                    Swal.fire("Deleted!", "The user has been deleted.", "success");
                } catch (error) {
                    setErrorMessage("Failed to delete user. Please try again.");
                    console.error("Error deleting user:", error);
                    Swal.fire("Error!", "Failed to delete user.", "error");
                }
            }
        });
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