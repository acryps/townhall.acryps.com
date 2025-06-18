import { ViewModel } from "vlserver";
import { ManagedServer } from "../../managed/server";
import { createHash } from "crypto";

export class ChangeFrame {
	static cache = new Map<string, ChangeFrame>();

	hash: string;

	constructor(
		private image: Buffer,
		private captured: Date
	) {
		this.hash = createHash('md5').update(image).digest('hex');

		ChangeFrame.cache.set(this.hash, this);
	}

	static registerInterface(app: ManagedServer) {
		app.app.get('/change-frame/:hash', (request, response) => {
			const frame = ChangeFrame.cache.get(request.params.hash);

			if (!frame) {
				response.sendStatus(404);
				response.send('change frame does not exist');

				return;
			}

			response.contentType('image/png');
			response.end(frame.image);
		});
	}
}

export class ChangeFrameViewModel extends ViewModel<ChangeFrame> {
	hash;
	captured;
}
