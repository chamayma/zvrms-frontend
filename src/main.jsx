import React from "react";
import ReactDOM from "react-dom/client";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "./assets/css/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(

    <React.StrictMode>

        <App />

        <ToastContainer

        position="top-right"

        autoClose={3000}

        hideProgressBar={false}

        newestOnTop

        closeOnClick

        pauseOnHover

        draggable

        theme="light"

    />

    </React.StrictMode>

);