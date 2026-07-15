import api from "./api";

const systemOfficerService = {

    async getAll() {

        const response = await api.get("/system-officers");

        return response.data;

    },

    async create(data) {

        const response = await api.post("/system-officers", data);

        return response.data;

    },

    async update(id, data) {

        const response = await api.put(`/system-officers/${id}`, data);

        return response.data;

    },

    async delete(id) {

        await api.delete(`/system-officers/${id}`);

    }

};

export default systemOfficerService;