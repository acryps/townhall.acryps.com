import { InterpreterMessage } from "..";

export interface InterpreterProvider {
	request(messages: InterpreterMessage[]): Promise<string>;
}
