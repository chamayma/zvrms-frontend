import { useEffect, useState } from "react";
import {
    FaUserCircle,
    FaCalendarAlt,
    FaClock
} from "react-icons/fa";

import logo from "../../assets/images/logo.png";
import authService from "../../services/authService";

function Topbar() {

    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {

        const timer = setInterval(() => {

            setCurrentTime(new Date());

        }, 1000);

        return () => clearInterval(timer);

    }, []);

    const fullName = authService.getFullName();

    const role = authService.getRole();

    return (

        <div className="topbar">

            <div className="topbar-left">

                <img
                    src={logo}
                    alt="ZEC Logo"
                />

                <div>

                    <div className="topbar-title text-truncate" style={{ maxWidth: '40vw' }}>

                        Zanzibar Voter Registration Monitoring System

                    </div>

                    <div className="topbar-subtitle d-none d-sm-block">

                        Government of Zanzibar

                    </div>

                </div>

            </div>

            <div className="topbar-right d-flex align-items-center">

                <div className="text-end me-4 d-none d-lg-block">

                    <div>

                        <FaCalendarAlt className="me-2"/>

                        {currentTime.toLocaleDateString()}

                    </div>

                    <div>

                        <FaClock className="me-2"/>

                        {currentTime.toLocaleTimeString()}

                    </div>

                </div>

                <div className="dropdown">

                    <button
                        className="btn btn-light dropdown-toggle shadow-sm"
                        data-bs-toggle="dropdown"
                    >

                        <FaUserCircle
                            size={22}
                            className="me-2"
                        />

                        {fullName}

                    </button>

                    <ul className="dropdown-menu dropdown-menu-end">

                        <li>

                            <span className="dropdown-item-text">

                                <strong>

                                    {role.replaceAll("_", " ")}

                                </strong>

                            </span>

                        </li>

                        <li>

                            <hr className="dropdown-divider"/>

                        </li>

                        <li>

                            <button
                                className="dropdown-item"
                                onClick={() => window.location.href="#/profile/change-password"}
                            >

                                Change Password

                            </button>

                        </li>

                        <li>

                            <button
                                className="dropdown-item"
                                onClick={() => authService.logout()}
                            >

                                Logout

                            </button>

                        </li>

                    </ul>

                </div>

            </div>

        </div>

    );

}

export default Topbar;