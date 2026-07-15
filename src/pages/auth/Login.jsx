import { useState } from "react";
import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import authService from "../../services/authService";

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const submit = async (e) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        try {

            await authService.login(username, password);

            authService.redirectDashboard();

        } catch (error) {

            setError(

                error.response?.data?.message ||

                "Invalid username or password."

            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div className="login-page">

            <div className="bubble b1"></div>
            <div className="bubble b2"></div>
            <div className="bubble b3"></div>

            <div className="login-card">

                <div className="text-center mb-4">

                    <img
                        src={logo}
                        alt="ZEC Logo"
                    />

                    <h2>

                        Zanzibar Electoral Commission

                    </h2>

                    <p>

                        Zanzibar Voter Registration
                        Monitoring System

                    </p>

                </div>

                {

                    error &&

                    <div className="alert alert-danger">

                        {error}

                    </div>

                }

                <form onSubmit={submit}>

                    <div className="mb-4">

                        <label className="form-label">

                            Username

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaUser/>

                            </span>

                            <input

                                className="form-control"

                                placeholder="Enter username"

                                value={username}

                                onChange={(e)=>

                                    setUsername(e.target.value)

                                }

                                required

                            />

                        </div>

                    </div>

                    <div className="mb-4">

                        <label className="form-label">

                            Password

                        </label>

                        <div className="input-group">

                            <span className="input-group-text">

                                <FaLock/>

                            </span>

                            <input

                                type={

                                    showPassword

                                        ?

                                        "text"

                                        :

                                        "password"

                                }

                                className="form-control"

                                placeholder="Enter password"

                                value={password}

                                onChange={(e)=>

                                    setPassword(e.target.value)

                                }

                                required

                            />

                            <button

                                type="button"

                                className="btn btn-light"

                                onClick={()=>

                                    setShowPassword(

                                        !showPassword

                                    )

                                }

                            >

                                {

                                    showPassword

                                        ?

                                        <FaEyeSlash/>

                                        :

                                        <FaEye/>

                                }

                            </button>

                        </div>

                    </div>

                    <div className="d-flex justify-content-between mb-4">

                        <div className="form-check">

                            <input

                                className="form-check-input"

                                type="checkbox"

                            />

                            <label className="form-check-label">

                                Remember me

                            </label>

                        </div>

                    </div>

                    <button

                        className="btn btn-login w-100"

                        disabled={loading}

                    >

                        {

                            loading

                                ?

                                "Signing In..."

                                :

                                "LOGIN"

                        }

                    </button>

                </form>

                <hr className="my-4"/>

                <div className="text-center">

                    <small>

                        Government of Zanzibar

                    </small>

                    <br/>

                    <small>

                        Zanzibar Electoral Commission

                    </small>

                </div>

            </div>

        </div>

    );

}

export default Login;