import { child, display, flexDirection, marginBottom, rem } from "@acryps/style";
import { boxed } from "../../shared/boxed.style";
import { fieldStyle, inputStyle } from "../../shared/field.style";

export const proposeBillStyle = () => child('ui-propose-bill',
	display('block'),

	fieldStyle(),

	child('ui-process',
		display('block')
	)
)
