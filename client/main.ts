import { HomeComponent } from "home/home.component";
import { Router } from "node_modules/vldom/router";
import { registerDirectives } from "node_modules/vldom-default-directives/index";
import { PageComponent } from "page.component";
import { Component } from "node_modules/vldom/component";
import { MapComponent } from "map/map.component";
import { Point } from "map/point";
import { HistoryComponent } from "map/history.component";
import { PropertiesComponent } from "properties/index";
import { PropertyComponent } from "property/index";

export class Application {
    static router: Router;

    static center = new Point(101, 183);

    static async main() {
        if (!location.hash) {
            location.hash = `#/map/${Application.center.x}/${Application.center.y}/3`;
        }

        this.router = new Router(
            PageComponent
                .route('/map/:x/:y/:zoom', MapComponent
                    .route('/history', HistoryComponent)
                )

                .route('/properties', PropertiesComponent)
                .route('/property/:id', PropertyComponent)
        );

        registerDirectives(Component, this.router);

        this.router.host(document.body);
        onhashchange = () => this.router.update();
    }
}