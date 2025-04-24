import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import SweetAlert2

const AddUser = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("Male");
    const navigate = useNavigate();

    const saveUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post("http://localhost:5000/users", {
                name,
                email,
                gender,
            });

            // Tampilkan pesan sukses menggunakan SweetAlert2
            Swal.fire({
                title: "Success!",
                text: "User has been added successfully.",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                navigate("/"); // Redirect ke halaman daftar pengguna setelah berhasil
            });
        } catch (error) {
            console.error("Error adding user:", error);

            // Tampilkan pesan error menggunakan SweetAlert2
            Swal.fire({
                title: "Error!",
                text: "Failed to add user. Please try again.",
                icon: "error",
                confirmButtonText: "OK",
            });
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                <form onSubmit={saveUser}>
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
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddUser;