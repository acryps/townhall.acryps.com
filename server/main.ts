import { DbClient, RunContext } from "vlquery"; 
import { Inject, StaticFileRoute, ViewModel } from "vlserver";
import { ManagedServer } from "./managed/server";
import { DbContext } from "./managed/database";

import * as path from "path";
import { Proxy } from "./proxy";

console.log("connecting to database...");
DbClient.connectedClient = new DbClient({ max: 2 });

DbClient.connectedClient.connect().then(() => {
    console.log("connected to database!");

    const app = new ManagedServer();
    const db = new DbContext(new RunContext());

    ViewModel.globalFetchingContext = db;

    new Proxy(app);

    app.createInjector = context => new Inject({
        Context: context,
        DbContext: db
    });

    app.use(new StaticFileRoute("/scripts", path.join(__dirname, "..", "..", "client", "dist", "scripts.js")));
    app.use(new StaticFileRoute("/styles", path.join(__dirname, "..", "..", "client", "dist", "styles.css")));
    app.use(new StaticFileRoute("/node_modules", path.join(__dirname, "..", "..", "client", "node_modules")));
    app.use(new StaticFileRoute("/", path.join(__dirname, "..", "..", "client", "assets")));

    app.start(+process.env.PORT || 7420);
});