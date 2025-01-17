import { ViewModel } from "vlserver";
import { ChatInteraction } from "../../../managed/database";

export class ChatInteractionViewModel extends ViewModel<ChatInteraction> {
	id;

	question;
	response;

	responded;
	containsInformationRequest;
}
