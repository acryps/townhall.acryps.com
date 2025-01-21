import { createCanvas, createImageData } from 'canvas';
import { DbContext } from './managed/database';
import { writeFileSync } from 'fs';

export class MovementHeatmap {
	size = 2000;
	
	// how far pixles should be incremented
	// will always be *2+1
	spread = 2;
	
	constructor(
		private database: DbContext
	) {}
	
	async render() {
		const players = await this.database.player.toArray();
		
		const map = [];
		let highest = 0;
		
		for (let offset = 0; offset < this.size * this.size; offset++) {
			map.push(0);
		}
		
		for (let player of players) {
			const movements = await player.movements
				.orderByAscending(movement => movement.time)
				.toArray();
			
			for (let movement of movements) {
				for (let y = movement.y - this.spread; y < movement.y + this.spread; y++) {
					for (let x = movement.x - this.spread; x < movement.x + this.spread; x++) {
						const offset = this.size * Math.round(y + this.size / 2) + Math.round(x + this.size / 2);
						
						if (offset >= 0 && offset < this.size * this.size) {
							highest = Math.max(highest, ++map[offset]);
						}
					}
				}
			}
		}
		
		const canvas = createCanvas(this.size, this.size);
		const context = canvas.getContext('2d');
		const buffer = context.getImageData(0, 0, this.size, this.size);
		
		for (let y = 0; y < this.size; y++) {
			for (let x = 0; x < this.size; x++) {
				const offset = y * this.size + x;
				const intensity = map[offset] / highest;
				const color = this.intensityToColor(intensity);
				
				buffer.data[offset * 4] = color.red;
				buffer.data[offset * 4 + 1] = color.green;
				buffer.data[offset * 4 + 2] = color.blue;
				buffer.data[offset * 4 + 3] = Math.min(intensity * 4, 1) * 0xff;
			}
		}
		
		context.putImageData(buffer, 0, 0);
		console.debug('heatmap');
		writeFileSync('movement-heat-map.png', canvas.toBuffer('image/png'));
	}
	
	intensityToColor(value: number) {
		const hue = (1 - value) * 120;
		
		const chroma = 1;
		const x = chroma * (1 - Math.abs((hue / 60) % 2 - 1));
		let red = 0, green = 0, blue = 0;
		
		if (hue < 60) {
			red = chroma; 
			green = x; 
			blue = 0;
		} else {
			red = x; 
			green = chroma; 
			blue = 0;
		}
		
		red = Math.floor(red * 0xff);
		green = Math.floor(green * 0xff);
		blue = Math.floor(blue * 0xff);
		
		return { red, green, blue };
	}
}
