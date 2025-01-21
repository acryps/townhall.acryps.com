import { child } from "@acryps/style";
import { boxed } from "../shared/boxed.style";
import { proposeBillStyle } from "./propose/index.style";
import { honestiumStyle } from "./honestium/index.style";
import { billStyle } from "./bill/index.style";

export const voteStyle = () => child('ui-vote',
	boxed(),

	proposeBillStyle(),
	honestiumStyle(),
	billStyle()
)
