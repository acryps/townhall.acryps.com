import { Component } from "@acryps/page";
import { ArticlePreviewModel, PublicationService } from "../../managed/services";
import { deleteIcon } from "../../assets/icons/managed";

export class ArticleMediaEditorComponent extends Component {
	constructor(
		private article: ArticlePreviewModel
	) {
		super();
	}

	render() {
		return <ui-media>
			{this.article.images.map(image => <ui-image>
				<img src={`/article/image/${image.id}`} />

				<input
					$ui-value={image.caption}
					ui-change={() => new PublicationService().captionImage(image.id, image.caption)}
				/>

				<ui-action ui-click={async () => {
					this.article.images.splice(this.article.images.indexOf(image), 1);
					this.update();

					await new PublicationService().removeImage(image.id);
				}}>
					{deleteIcon()}
				</ui-action>
			</ui-image>)}

			<ui-action ui-click={() => {
				const input = document.createElement('input');
				input.type = 'file';
				input.accept = 'image/*';

				input.onchange = () => {
					const image = new Image();

					image.onload = () => {
						const canvas = document.createElement('canvas');
						canvas.width = image.width;
						canvas.height = image.height;

						const context = canvas.getContext('2d');
						context.drawImage(image, 0, 0);

						canvas.toBlob(async blob => {
							this.article.images.push(await new PublicationService().uploadImage(this.article.id, blob));

							this.update();
						}, 'image/webp');
					};

					image.src = URL.createObjectURL(input.files[0]);
				};

				input.click();
			}}>
				Upload Image
			</ui-action>
		</ui-media>
	}
}
