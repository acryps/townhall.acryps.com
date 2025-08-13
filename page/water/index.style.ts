import { child, display } from "@acryps/style";
import { createWaterBodyStyle } from "./create/index.style";
import { waterBodyStyle } from "./water-body/index.style";

export const waterStyle = () => child('ui-water',
	display('block'),

	createWaterBodyStyle(),
	waterBodyStyle()
)
