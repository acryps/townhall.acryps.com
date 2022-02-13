import { HomeComponent } from "home/home.component";
import { Router } from "node_modules/vldom/router";
import { registerDirectives } from "node_modules/vldom-default-directives/index";
import { PageComponent } from "page.component";
import { Component } from "node_modules/vldom/component";
import { MapComponent } from "map/map.component";
import { PropertyComponent } from "map/property.component";

export class Application {
    static router: Router;

    static async main() {
        if (!location.hash) {
            location.hash = `#/home`;
        }

        this.router = new Router(PageComponent, {
            "/home": HomeComponent,
            "/map": {
                component: MapComponent,
                children: {
                    "/property/:id": PropertyComponent,
                    // "/borough/:id": BoroughViewModel
                }
            }
        });

        registerDirectives(Component, this.router);

        this.router.host(document.body);
        onhashchange = () => this.router.update();
    }
}