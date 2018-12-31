import Color = require('color');

export const mq = {
	phone: '@media (max-width: 720px) and (min-width: 0px)',
	phoneOrTablet: '@media (max-width: 1024px) and (min-width: 0px)',
	tablet: '@media (max-width: 1024px) and (min-width: 720px)',
	tabletOrDesktop: '@media (min-width: 720px)',
	desktop: '@media (min-width: 1024px)',
};

export class CSSUtils {
	public static linearGradient(angle: number, fromColor: Color, toColor: Color, from: number, to: number): string {
		return `linear-gradient(${angle.toString()}deg, ${fromColor.toString()} ${from}%, ${toColor.toString()} ${to}%)`;
	}
}
