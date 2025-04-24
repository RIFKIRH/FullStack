/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const [errorMessage, setErrorMessage] = useState(""); // Tambahkan state untuk pesan error
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getUsersById();
    }, []);

    const getUsersById = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/users/${id}`);
            setName(response.data.name);
            setEmail(response.data.email);
            setGender(response.data.gender);
        } catch (error) {
            setErrorMessage("Failed to fetch user data.");
            console.log(error);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                name,
                email,
                gender,
            });
            navigate("/"); // Redirect ke halaman daftar pengguna setelah berhasil
        } catch (error) {
            setErrorMessage("Failed to update user. Please try again.");
            console.log(error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                {errorMessage && <p className="has-text-danger">{errorMessage}</p>}
                <form onSubmit={handleUpdateUser}>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input
                                className="input"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Gender</label>
                        <div className="control">
                            <div className="select is-fullwidth">
                                <select
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                >
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <button type="submit" className="button is-success">
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditUser;