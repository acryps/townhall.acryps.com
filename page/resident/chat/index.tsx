import { Component } from "@acryps/page";
import { ChatInteractionViewModel, ChatService, LifeService, ResidentViewModel } from "../../managed/services";
import { toSimulatedAge } from "../../../interface/time";
import { px } from "@acryps/style";
import { InteractionsComponent } from "./interactions";
import { pusher } from "./index.style";
import { ResidentPage } from "..";

export class ChatPage extends Component {
	declare parent: ResidentPage;
	declare parameters: { chat };

	input: HTMLElement;
	textarea: HTMLTextAreaElement;

	sentInteraction: ChatInteractionViewModel;

	chat: ChatInteractionViewModel[];
	interactions: InteractionsComponent;

	async onload() {
		this.chat = await new ChatService().read(this.parameters.chat);
	}

	render() {
		requestAnimationFrame(() => {
			// handle keyboard events
			const updatePusher = () => {
				pusher.update(px(this.textarea.offsetHeight));
			};

			this.textarea.focus();
			updatePusher();

			this.textarea.onkeypress = event => {
				updatePusher();

				if (event.key == 'Enter') {
					event.preventDefault();

					this.send();
				}
			}
		});

		return <ui-chat>
			<ui-resident>
				<img src={`/resident/image/${this.parent.resident.tag}`} />

				<ui-name>
					<ui-given-name>
						{this.parent.resident.givenName}
					</ui-given-name>

					<ui-family-name>
						{this.parent.resident.familyName}
					</ui-family-name>
				</ui-name>

				<ui-age>
					Born {this.parent.resident.birthday.toLocaleDateString()}, aged {toSimulatedAge(this.parent.resident.birthday)}
				</ui-age>

				<ui-legal>
					All chats are recorded and may be used later on to deepen the lore.
					Don't be evil please.
					The residents don't read all the news and will tell you a lot of details that are just not correct.
				</ui-legal>
			</ui-resident>

			{this.interactions = new InteractionsComponent(this.parent.resident, this.chat)}

			{this.input = <ui-input>
				<ui-container>
					{this.textarea = <textarea placeholder={`Your message to ${this.parent.resident.givenName}`} />}

					<ui-action ui-click={() => this.send()}>
						Send
					</ui-action>
				</ui-container>
			</ui-input>}
		</ui-chat>;
	}

	send() {
		if (!this.textarea.value.trim()) {
			return;
		}

		this.sentInteraction = new ChatInteractionViewModel();
		this.sentInteraction.question = this.textarea.value.trim();

		this.textarea.value = '';

		this.chat.push(this.sentInteraction);
		this.interactions.update();

		new ChatService().send(this.parameters.chat, this.sentInteraction.question).then(responses => {
			this.chat.splice(this.chat.indexOf(this.sentInteraction), 1);

			this.chat.push(...responses);
			this.interactions.update();

			this.textarea.focus();
		});
	}
}
