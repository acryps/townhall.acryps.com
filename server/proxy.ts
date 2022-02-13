import fetch from "node-fetch";
import { ManagedServer } from "./managed/server";

export class Proxy {
    constructor(app: ManagedServer) {
        app.app.get("/images/map", (req, res) => fetch("http://10.30.0.3:8000/townhall/map.png").then(r => r.buffer()).then(r => res.end(r)));
        app.app.get("/images/isometric", (req, res) => fetch("http://10.30.0.3:8000/townhall/isometric.png").then(r => r.buffer()).then(r => res.end(r)));
    }
}