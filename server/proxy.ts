import fetch from "node-fetch";
import { HistoryEntry } from "./history";
import { ManagedServer } from "./managed/server";
import { TileSet } from "./tile";

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { Chunk } from "./game/chunk";

const md5 = require('js-md5');

export class Proxy {
    static chunkCacheDirectory = '../.chunks';

    static source = process.env.TOWNHALL_SERVER_ADDRESS || 'http://10.30.0.3:8000/townhall';
    static region = process.env.TOWNHALL_REGION_DIRECTORY || 'http://10.30.0.3:8000/minecraft/world/region';

    constructor(app: ManagedServer) {
        const tileSets = new Map<string, TileSet[]>();

        let history;
        
        Proxy.getHistory().then(res => history = res);

        setInterval(async () => {
            history = await Proxy.getHistory();
        }, 1000 * 60);

        app.app.get('/images/map/:name/:x/:y', async (req, res) => {
            for (let entry of history || []) {
                if (entry.name == req.params.name) {
                    if (!tileSets[entry.name]) {
                        tileSets[entry.name] = new TileSet(`${Proxy.source}/${entry.path}/map.png`);
                    }

                    return tileSets[entry.name].read(+req.params.x, +req.params.y).then(r => res.end(r));
                }
            }

            res.sendStatus(500);
            res.send('invalid history item');
        });

        let tubes;
        
        Proxy.getTubes().then(res => tubes = res);

        setInterval(async () => {
            tubes = await Proxy.getTubes();
        }, 1000 * 60);

        app.app.get('/images/tube/:z/:x/:y', async (req, res) => {
            for (let entry of tubes || []) {
                if (entry == req.params.z) {
                    if (!tileSets[entry]) {
                        tileSets[entry] = new TileSet(`${Proxy.source}/tube-${entry}.png`);
                    }

                    return tileSets[entry].read(+req.params.x, +req.params.y).then(r => res.end(r));
                }
            }

            res.sendStatus(500);
            res.send('invalid tube item');
        });

        const map = new TileSet(`${Proxy.source}/map.png`);

        app.app.get('/images/map/:x/:y', (req, res) => map.read(+req.params.x, +req.params.y).then(tile => res.end(tile)));
        app.app.get('/images/map', (req, res) => fetch(`${Proxy.source}/map.png`).then(r => r.buffer()).then(r => res.end(r)));

        app.app.get('/chunk/:x.:y', async (req, res) => {
            const x = +req.params.x;
            const y = +req.params.y;

            const path = join(Proxy.chunkCacheDirectory, `${x}.${y}.json`);

            if (existsSync(path)) {
                return res.end(readFileSync(path));
            }

            const chunk = await Chunk.fetch(x, y);

            if (!chunk) {
                return res.json(null);
            }
            
            const data = chunk.toJSON();
            writeFileSync(path, JSON.stringify(data));

            res.json(data);
        });

        app.app.get('/images/isometric', (req, res) => fetch(`${Proxy.source}/isometric.png`).then(r => r.buffer()).then(r => res.end(r)));
    }

    static getHistory() {
        return fetch(`${Proxy.source}/`).then(r => r.text()).then(html => {
            const entries: HistoryEntry[] = [];

            for (let link of html.match(/><a href\=\"[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}%3A[0-9]{2}%3A[0-9]{2}%2B[0-9]{2}%3A[0-9]{2}/g)) {
                const url = link.split('"')[1];

                const entry = new HistoryEntry();
                entry.name = md5(url);
                entry.path = url;

                const parts = url.split(/[-T]|\%[0-9A-F]{2}/g).map(s => +s);
                entry.date = new Date(Date.UTC(parts[0], parts[1], parts[2], parts[3], 0, 0));

                entries.push(entry);
            }

            return entries.sort((a, b) => a.path > b.path ? -1 : 1);
        });
    }

    static getTubes(): Promise<number[]> {
        return fetch(`${Proxy.source}/`).then(r => r.text()).then(html => {
            const entries: number[] = [];

            for (let name of html.match(/tube-[0-9]+/g)) {
                entries.push(+name.split('-')[1]);
            }

            return entries.sort((a, b) => a - b).filter((c, i, a) => a.indexOf(c) == i);
        });
    }

    static async readChunk(x: number, y: number) {
        if (!existsSync(this.chunkCacheDirectory)) {
            mkdirSync(this.chunkCacheDirectory);
        }

        const path = join(this.chunkCacheDirectory, `${x}.${y}.source.json`);

        if (existsSync(path)) {
            return JSON.parse(readFileSync(path).toString());
        }

        const data = await fetch(`${this.source}/world/${+x}.${+y}.json`).then(res => res.text());

        try {
            const chunk = JSON.parse(data);
            writeFileSync(path, data);

            return chunk;
        } catch {
            return null;
        }
    }
}