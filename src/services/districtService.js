import api from "./api";

const districtService = {

    async getAll() {

        const response = await api.get("/districts");

        return response.data;

    }

};

export default districtService;