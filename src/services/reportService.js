import api from "./api";

const reportService = {

    async getAll(params) {

        const response = await api.get("/reports", {

            params

        });

        return response.data;

    },

    async exportPdf(params) {

        const response = await api.get("/reports/pdf", {

            params,

            responseType: "blob"

        });

        return response.data;

    },

    async exportExcel(params) {

        const response = await api.get("/reports/excel", {

            params,

            responseType: "blob"

        });

        return response.data;

    },

    async getDistrictReports(params) {

    const response = await api.get("/reports/district", {

        params

    });

    return response.data;

},

async exportDistrictPdf(params) {

    const response = await api.get("/reports/district/pdf", {

        params,

        responseType: "blob"

    });

    return response.data;

},

async exportDistrictExcel(params) {

    const response = await api.get("/reports/district/excel", {

        params,

        responseType: "blob"

    });

    return response.data;

},

};



export default reportService;