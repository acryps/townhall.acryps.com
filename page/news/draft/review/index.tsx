import { Component } from "@acryps/page";
import { DraftAnswerViewModel, DraftQuestionViewModel, DraftReviewViewModel, PublicationService } from "../../../managed/services";

export class DraftReviewPage extends Component {
	declare parameters: { id: string };

	draft: DraftReviewViewModel;
	writing = false;

	async onload() {
		this.draft = await new PublicationService().getDraftReview(this.parameters.id);
	}

	get allAnswered() {
		return this.draft.draftQuestions.length > 0 && this.draft.draftQuestions.every(question => question.answerId);
	}

	render() {
		if (!this.draft.interpreted || (this.writing && !this.draft.published)) {
			setTimeout(() => this.reload(), 1000);
		}

		return <ui-draft-review>
			{!this.draft.interpreted && <ui-status>
				Interpreting your draft...
			</ui-status>}

			{this.draft.interpreted && !this.draft.published && <ui-questions>
				{this.draft.draftQuestions.map(question => <ui-question>
					<ui-prompt>{question.question}</ui-prompt>
					<ui-detail>{question.detail}</ui-detail>

					<ui-answers>
						{question.answers.map(answer => <ui-answer>
							{answer.id == question.answerId
								? <ui-selected ui-click={() => this.select(question, answer)} />
								: <ui-select ui-click={() => this.select(question, answer)} />}

							{answer.id == question.answerId ? <textarea
								$ui-value={answer.content}
								ui-change={() => this.editAnswer(answer)}
								rows={2}
							/> : <ui-text ui-click={() => this.select(question, answer)}>
								{answer.content}
							</ui-text>}
						</ui-answer>)}
					</ui-answers>
				</ui-question>)}
			</ui-questions>}

			{this.allAnswered && !this.draft.published && !this.writing && <ui-actions>
				<ui-action ui-click={() => this.write()}>
					Write Article
				</ui-action>
			</ui-actions>}

			{this.writing && !this.draft.published && <ui-status>
				Writing article...
			</ui-status>}

			{this.draft.published && <ui-actions>
				<ui-action ui-href={`../../../article/${this.draft.id}`}>
					View Article
				</ui-action>
			</ui-actions>}
		</ui-draft-review>;
	}

	async select(question: DraftQuestionViewModel, answer: DraftAnswerViewModel) {
		question.answerId = answer.id;
		this.update();

		await new PublicationService().selectAnswer(question.id, answer.id);
	}

	editAnswer(answer: DraftAnswerViewModel) {
		new PublicationService().editAnswer(answer.id, answer.content);
	}

	async write() {
		this.writing = true;
		this.update();

		await new PublicationService().writeDraft(this.draft.id);

		this.reload();
	}
}
