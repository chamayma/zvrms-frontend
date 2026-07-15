import { useNavigate } from "react-router-dom";
import {
    FaUserPlus,
    FaUsers,
    FaChartBar,
    FaFileDownload
} from "react-icons/fa";

function QuickActions() {

    const navigate = useNavigate();

    return (

        <div className="dashboard-card h-100">

            <h5 className="fw-bold mb-4">

                Quick Actions

            </h5>

            <div className="d-grid gap-3">

                <button
                    className="btn btn-primary"
                    onClick={() => navigate("/director/system-officers")}
                >

                    <FaUserPlus className="me-2"/>

                    Create System Officer

                </button>

                <button
                    className="btn btn-outline-dark"
                    onClick={() => navigate("/director/system-officers")}
                >

                    <FaUsers className="me-2"/>

                    View System Officers

                </button>

                <button
                    className="btn btn-outline-dark"
                    onClick={() => navigate("/director/reports")}
                >

                    <FaChartBar className="me-2"/>

                    View Reports

                </button>

                <button
                    className="btn btn-outline-dark"
                >

                    <FaFileDownload className="me-2"/>

                    Export Summary

                </button>

            </div>

        </div>

    );

}

export default QuickActions;