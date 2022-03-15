import { HomeComponent } from "home/home.component";
import { Router } from "node_modules/vldom/router";
import { registerDirectives } from "node_modules/vldom-default-directives/index";
import { PageComponent } from "page.component";
import { Component } from "node_modules/vldom/component";
import { MapComponent } from "map/map.component";
import { PropertyComponent } from "map/property.component";
import { Point } from "map/point";
import { HistoryComponent } from "map/history.component";

export class Application {
    static router: Router;

    static center = new Point(35, 184);

    static async main() {
        if (!location.hash) {
            location.hash = `#/${Application.center.x}/${Application.center.y}/3`;
        }

        this.router = new Router(PageComponent, {
            '/:x/:y/:zoom': {
                component: MapComponent,
                children: {
                    '/history': HistoryComponent, 
                    '/property/:id': PropertyComponent,
                    // "/borough/:id": BoroughViewModel
                }
            }
        });

        registerDirectives(Component, this.router);

        this.router.host(document.body);
        onhashchange = () => this.router.update();
    }
}