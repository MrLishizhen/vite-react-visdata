import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import Router from "./router";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter basename="/vite_vis/">
            <Router />
        </BrowserRouter>
    </React.StrictMode>
);
