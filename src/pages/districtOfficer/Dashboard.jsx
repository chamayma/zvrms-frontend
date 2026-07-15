/* eslint-disable react-hooks/immutability */
import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import DashboardCard from "../../components/cards/DashboardCard";
import dashboardService from "../../services/dashboardService";

import {

    FaUsers,
    FaMale,
    FaFemale,
    FaMapMarkerAlt

} from "react-icons/fa";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            const data = await dashboardService.getDistrictDashboard();

            setDashboard(data);

        }

        catch(error){

            console.log(error);

        }

    }

    if(!dashboard){

        return(

            <MainLayout>

                <h3>Loading...</h3>

            </MainLayout>

        );

    }

    return(

        <MainLayout>

            <h2 className="mb-4">

                District Officer Dashboard

            </h2>

            <div className="row">

                <DashboardCard

                    title="Registered Voters"

                    value={dashboard.totalVoters}

                    icon={<FaUsers/>}

                />

                <DashboardCard

                    title="Male"

                    value={dashboard.totalMale}

                    icon={<FaMale/>}

                />

                <DashboardCard

                    title="Female"

                    value={dashboard.totalFemale}

                    icon={<FaFemale/>}

                />

                <DashboardCard

                    title="Shehia"

                    value={dashboard.totalShehia}

                    icon={<FaMapMarkerAlt/>}

                />

            </div>

        </MainLayout>

    );

}

export default Dashboard;