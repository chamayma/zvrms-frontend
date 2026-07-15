import api from "./api";

const dashboardService = {

    async getDirectorDashboard() {

        const response = await api.get("/dashboard/director");

        return response.data;

    },

    async getSystemDashboard() {

        const response = await api.get("/dashboard/system-officer");

        return response.data;

    },

    async getDistrictDashboard() {

        const response = await api.get("/dashboard/district-officer");

        return response.data;

    }

};

export default dashboardService;