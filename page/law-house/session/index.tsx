import { Component } from "@acryps/page";
import { LawHouseService, LawHouseSessionProtocolViewModel, LawHouseSessionViewModel } from "../../managed/services";
import { ResidentBadgeListComponent } from "../../shared/resident-badge-list";
import { speakIcon } from "../../assets/icons/managed";
import { Time } from "../../../interface/time";

export class LawHouseSessionPage extends Component {
	declare parameters: { id };

	static voices = new Map<string, { voice: SpeechSynthesisVoice, pitch: number }>();

	session: LawHouseSessionViewModel;
	protocolElements = new Map<LawHouseSessionProtocolViewModel, Element>();

	async onload() {
		this.session = await new LawHouseService().getSession(this.parameters.id);
		this.session.protocol.sort((a, b) => +a.said - +b.said);
	}

	render() {
		return <ui-session>
			<ui-scope>
				{this.session.scope.name}
			</ui-scope>

			<ui-date>
				Started {this.session.started.toLocaleString()}
			</ui-date>

			{this.session.ended && <ui-date>
				Ended {this.session.started.toLocaleString()}
			</ui-date>}

			<ui-sessionaries>
				{new ResidentBadgeListComponent(this.session.sessionaries.map(sessionary => sessionary.resident))}
			</ui-sessionaries>

			<ui-actions>
				{window.speechSynthesis && <ui-action ui-click={() => this.play()}>
					{speakIcon()} Listen to Session
				</ui-action>}
			</ui-actions>

			<ui-protocol>
				{this.session.protocol.map(item => this.renderProtocol(item))}
			</ui-protocol>
		</ui-session>;
	}

	renderProtocol(item: LawHouseSessionProtocolViewModel) {
		const element = <ui-item>
			<ui-message>
				{item.message}
			</ui-message>

			<ui-tagline>
				<ui-time>
					{item.said.toLocaleTimeString()}
				</ui-time>

				{item.person && <ui-name>
					{item.person.givenName} {item.person.familyName}
				</ui-name>}
			</ui-tagline>
		</ui-item>;

		this.protocolElements.set(item, element);

		return element;
	}

	play() {
		if (speechSynthesis.speaking) {
			return;
		}

		// assign voices to residents that do not have one yet
		const voices = speechSynthesis.getVoices().filter(voice => voice.lang.startsWith('en'));
		const defaultVoice = voices.shift();

		for (let sessionary of this.session.sessionaries) {
			if (!LawHouseSessionPage.voices.has(sessionary.resident.id)) {
				const voice = voices[Math.floor(voices.length * Math.random())];
				const pitch = (-8 / 79) * new Time(sessionary.resident.birthday).age() + (687.4 / 79);

				LawHouseSessionPage.voices.set(sessionary.resident.id, {
					voice,
					pitch
				});
			}
		}

		// next
		let protocolIndex = 0;
		let activeProtocolElement: Element;

		const next = () => {
			const protocol = this.session.protocol[protocolIndex];

			if (!protocol) {
				return;
			}

			activeProtocolElement?.removeAttribute('ui-active');

			activeProtocolElement = this.protocolElements.get(protocol);

			activeProtocolElement.setAttribute('ui-active', '');
			activeProtocolElement.scrollIntoView({
				behavior: 'smooth',
				block: 'center'
			});

			const utterance = new SpeechSynthesisUtterance(protocol.message);

			if (protocol.person) {
				const resident = LawHouseSessionPage.voices.get(protocol.person.id);

				utterance.voice = resident.voice;
				utterance.pitch = resident.pitch;
			} else {
				utterance.voice = defaultVoice;
			}

			utterance.onend = () => {
				protocolIndex++;

				setTimeout(() => next(), 100);
			};

			speechSynthesis.speak(utterance);
		};

		next();
	}
}
