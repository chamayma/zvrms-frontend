import api from "./api";

const voterService = {

    async getAll(params) {

        const response = await api.get("/voters", {

            params

        });

        return response.data;

    },

    async create(data) {

        const response = await api.post("/voters", data);

        return response.data;

    },

    async update(id,data) {

        const response = await api.put(

            `/voters/${id}`,

            data

        );

        return response.data;

    },

    async delete(id) {

        await api.delete(`/voters/${id}`);

    },

    async getById(id){

        const response = await api.get(`/voters/${id}`);

        return response.data;

    },

    async getMine() {

    const response = await api.get("/voters/my");

    return response.data;

},

};

export default voterService;