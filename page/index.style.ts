import { child, fontFamily, root } from "@acryps/style";
import { homeStyle } from "./home/index.style";
import { bold, boldItalic, regular, regularItalic } from "./assets/font/index.style";

export const pageStyle = () => root(
	bold,
	boldItalic,
	regular,
	regularItalic,
	
	fontFamily(regular.name),
	
	child('body',
		child('ui-page',
			homeStyle()
		)
	)
)
