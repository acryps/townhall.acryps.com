import { PageComponent } from "./page";
import { MapComponent } from "./map/map.component";
import { Point } from "./map/point";
import { HistoryComponent } from "./map/history.component";
import { PropertiesComponent } from "./properties/index";
import { PropertyComponent } from "./property/index";
import { GameService, PlayerViewModel, Service } from "./managed/services";
import { PathRouter, Router } from "@acryps/page/built/router";
import { Component } from "@acryps/page/built/component";
import { registerDirectives } from "@acryps/page-default-directives/built/index";

export class Application {
    static router: Router;

    static players: PlayerViewModel[];

    static center = new Point(101, 183);

    static async main() {
        Service.baseUrl = '/';

        if (location.pathname == '/') {
            location.pathname = `/map/${Application.center.x}/${Application.center.y}/3`;
        }

        this.players = await new GameService().getPlayers();

        this.router = new PathRouter(
            PageComponent
                .route('/map/:x/:y/:zoom', MapComponent
                    .route('/history', HistoryComponent)
                )

                .route('/properties', PropertiesComponent)
                .route('/property/:id', PropertyComponent)
        );

        registerDirectives(Component, this.router);

        this.router.host(document.body);
    }
}

Application.main();