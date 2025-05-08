import { Font, fontStyle, fontWeight } from "@acryps/style";

export const boldFont = new Font('minecraft', fontWeight('bold'))
	.addSource('/assets/font/bold.otf');

export const boldItalicFont = new Font('minecraft', fontWeight('bold'), fontStyle('italic'))
	.addSource('/assets/font/bold-italic.otf');

export const regularFont = new Font('minecraft', fontWeight('normal'))
	.addSource('/assets/font/regular.otf');

export const regularItalicFont = new Font('minecraft', fontWeight('normal'), fontStyle('italic'))
	.addSource('/assets/font/regular-italic.otf');

export const headlineFont = new Font('retro-byte', fontWeight('normal'))
	.addSource('/assets/font/headline.ttf');

export const microFont = new Font('wendy-neue', fontWeight('normal'))
	.addSource('/assets/font/micro.ttf');
