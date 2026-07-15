import api from "./api";

const authService = {

    async login(username, password) {

        const response = await api.post("/auth/login", {

            username,

            password

        });

        const user = response.data;

        localStorage.setItem("token", user.token);
        localStorage.setItem("username", user.username);
        localStorage.setItem("role", user.role);
        localStorage.setItem("fullName", user.fullName);

        if (user.districtId) {

            localStorage.setItem("districtId", user.districtId);

        }

        if (user.districtName) {

            localStorage.setItem("districtName", user.districtName);

        }

        return user;

    },

    logout() {

        localStorage.clear();

        window.location.href = "#/";

    },

    getRole() {

        return localStorage.getItem("role");

    },

    getFullName() {

        return localStorage.getItem("fullName");

    },

    getDistrictId() {

        return localStorage.getItem("districtId");

    },

    getDistrictName() {

        return localStorage.getItem("districtName");

    },

    async changePassword(data) {

    const response = await api.put(

        "/auth/change-password",

        data

    );

    return response.data;

},

};

export default authService;