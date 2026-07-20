import {
    FaHome,
    FaUsers,
    FaUserTie,
    FaClipboardList,
    FaFilePdf,
    FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import logo from "../../assets/images/logo.png";
import authService from "../../services/authService";

function Sidebar() {

    const role = authService.getRole();


    const logout = () => {

        authService.logout();

    };

    return (

        <aside className="sidebar">

            <div className="sidebar-logo">

                <img

                    src={logo}

                    alt="ZEC"

                />

                <h4 className="mt-3 fw-bold">

                    ZVRMS

                </h4>

                <small>

                    Government of Zanzibar

                </small>

            </div>

           <hr className="text-secondary"/>

            <div className="sidebar-menu">

    {role === "DIRECTOR" && (

        <>

            <small className="text-uppercase fw-bold text-dark ms-3 mb-2 d-block">
                MAIN
            </small>

            <NavLink to="/director/dashboard">
                <FaHome />
                <span>Dashboard</span>
            </NavLink>

            <small className="text-uppercase fw-bold text-dark ms-3 mt-4 mb-2 d-block">
                MANAGEMENT
            </small>

            <NavLink to="/director/system-officers">
                <FaUsers />
                <span>System Officers</span>
            </NavLink>

            <NavLink to="/director/reports">
                <FaFilePdf />
                <span>Reports</span>
            </NavLink>

        </>

    )}

    {role === "SYSTEM_OFFICER" && (

        <>

            <small className="text-uppercase fw-bold text-dark ms-3 mb-2 d-block">
                MAIN
            </small>

            <NavLink to="/system/dashboard">
                <FaHome />
                <span>Dashboard</span>
            </NavLink>

            <small className="text-uppercase fw-bold text-dark ms-3 mt-4 mb-2 d-block">
                MANAGEMENT
            </small>

            <NavLink to="/system/district-officers">
                <FaUserTie />
                <span>District Officers</span>
            </NavLink>

            <NavLink to="/system/reports">
                <FaFilePdf />
                <span>Reports</span>
            </NavLink>

        </>

    )}

    {role === "DISTRICT_OFFICER" && (

        <>

            <small className="text-uppercase fw-bold text-dark ms-3 mb-2 d-block">
                MAIN
            </small>

            <NavLink to="/district/dashboard">
                <FaHome />
                <span>Dashboard</span>
            </NavLink>

            <small className="text-uppercase fw-bold text-dark ms-3 mt-4 mb-2 d-block">
                VOTERS
            </small>

            <NavLink to="/district/register-voter">
                <FaClipboardList />
                <span>Register New Card</span>
            </NavLink>

            <NavLink to="/district/voters">
                <FaUsers />
                <span>Cards Issued</span>
            </NavLink>

            <small className="text-uppercase fw-bold text-dark ms-3 mt-4 mb-2 d-block">
                REPORTS
            </small>

            <NavLink to="/district/reports">
                <FaFilePdf />
                <span>Reports</span>
            </NavLink>

        </>

    )}

</div>

<div className="mt-auto p-3 border-top">

                <button

                    className="btn btn-danger w-100 mt-3"

                    onClick={logout}

                >

                    <FaSignOutAlt className="me-2"/>

                    <span>Logout</span>

                </button>

            </div>

        </aside>

    );

}

export default Sidebar;