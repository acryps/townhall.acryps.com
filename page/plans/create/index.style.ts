import { child, marginTop } from "@acryps/style";
import { fieldStyle } from "../../shared/field.style";
import { buttonStyle } from "../../shared/index.style";
import { pageGutter } from "../../index.style";

export const createPlanStyle = () => child('ui-create-plan',
	fieldStyle(),

	child('ui-action',
		buttonStyle(),

		marginTop(pageGutter)
	)
);
