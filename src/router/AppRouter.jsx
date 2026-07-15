import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";

import DirectorDashboard from "../pages/director/Dashboard";
import SystemOfficer from "../pages/director/SystemOfficer";
import Reports from "../pages/director/Reports";

import SystemDashboard from "../pages/systemOfficer/Dashboard";
import DistrictOfficer from "../pages/systemOfficer/DistrictOfficer";
import SystemReports from "../pages/systemOfficer/Reports";

import DistrictDashboard from "../pages/districtOfficer/Dashboard";
import RegisterVoter from "../pages/districtOfficer/RegisterVoter";
import Voters from "../pages/districtOfficer/Voters";
import DistrictReports from "../pages/districtOfficer/Reports";

import ChangePassword from "../pages/profile/ChangePassword";

function ProtectedRoute({ children, roles }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    if (!token) {

        return <Navigate to="/" replace />;

    }

    if (!roles.includes(role)) {

        return <Navigate to="/" replace />;

    }

    return children;

}

function AppRouter() {

    return (

        <HashRouter>

            <Routes>

                <Route
                    path="/"
                    element={<Login />}
                />

                {/* Director */}

                <Route
                    path="/director/dashboard"
                    element={
                        <ProtectedRoute roles={["DIRECTOR"]}>
                            <DirectorDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/director/system-officers"
                    element={
                        <ProtectedRoute roles={["DIRECTOR"]}>
                            <SystemOfficer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/director/reports"
                    element={
                        <ProtectedRoute roles={["DIRECTOR"]}>
                            <Reports />
                        </ProtectedRoute>
                    }
                />

                {/* System Officer */}

                <Route
                    path="/system/dashboard"
                    element={
                        <ProtectedRoute roles={["SYSTEM_OFFICER"]}>
                            <SystemDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/system/district-officers"
                    element={
                        <ProtectedRoute roles={["SYSTEM_OFFICER"]}>
                            <DistrictOfficer />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/system/reports"
                    element={
                        <ProtectedRoute roles={["SYSTEM_OFFICER"]}>
                            <SystemReports />
                        </ProtectedRoute>
                    }
                />

                {/* District Officer */}

                <Route
                    path="/district/dashboard"
                    element={
                        <ProtectedRoute roles={["DISTRICT_OFFICER"]}>
                            <DistrictDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/district/register-voter"
                    element={
                        <ProtectedRoute roles={["DISTRICT_OFFICER"]}>
                            <RegisterVoter />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/district/voters"
                    element={
                        <ProtectedRoute roles={["DISTRICT_OFFICER"]}>
                            <Voters />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/district/reports"
                    element={
                        <ProtectedRoute roles={["DISTRICT_OFFICER"]}>
                            <DistrictReports />
                        </ProtectedRoute>
                    }
                />

                {/* Profile */}

                <Route
                    path="/profile/change-password"
                    element={
                        <ProtectedRoute roles={["DIRECTOR", "SYSTEM_OFFICER", "DISTRICT_OFFICER"]}>
                            <ChangePassword />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />

            </Routes>

        </HashRouter>

    );

}

export default AppRouter;