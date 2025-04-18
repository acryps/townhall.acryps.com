import { Font, fontStyle, fontWeight } from "@acryps/style";

export const bold = new Font('minecraft', fontWeight('bold'))
	.addSource('/assets/font/bold.otf');

export const boldItalic = new Font('minecraft', fontWeight('bold'), fontStyle('italic'))
	.addSource('/assets/font/bold-italic.otf');

export const regular = new Font('minecraft', fontWeight('normal'))
	.addSource('/assets/font/regular.otf');

export const regularItalic = new Font('minecraft', fontWeight('normal'), fontStyle('italic'))
	.addSource('/assets/font/regular-italic.otf');

export const headline = new Font('retro-byte', fontWeight('normal'))
	.addSource('/assets/font/headline.ttf');

export const micro = new Font('wendy-neue', fontWeight('normal'))
	.addSource('/assets/font/micro.ttf');
