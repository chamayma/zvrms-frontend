import api from "./api";

const districtOfficerService = {

    async getAll(params) {

        const response = await api.get("/district-officers", {

            params

        });

        return response.data;

    },

    async create(data) {

        const response = await api.post("/district-officers", data);

        return response.data;

    },

    async update(id, data) {

        const response = await api.put(`/district-officers/${id}`, data);

        return response.data;

    },

    async delete(id) {

        await api.delete(`/district-officers/${id}`);

    }

};

export default districtOfficerService;