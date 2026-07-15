import api from "./api";

const shehiaService = {

    async getMine() {

        const response = await api.get("/shehia/my");

        return response.data;

    },

    async getByDistrict(districtId) {

        const response = await api.get(`/shehia/district/${districtId}`);

        return response.data;

    }

};

export default shehiaService;