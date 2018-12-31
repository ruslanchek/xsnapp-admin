import Color = require('color');
import { css } from 'react-emotion';

export const COLORS = {
	GRAY: Color('#8E91AE'),
	GRAY_LIGHT: Color('#E5E7F9'),
	WHITE: Color('#FFFFFF'),
	BLACK: Color('#0F1128'),
	BLACK_LIGHT: Color('#0F1128').lighten(0.7),
	BLACK_EXTRA_LIGHT: Color('#0F1128').lighten(1),
	RED: Color('#F14669'),
	BLUE_LIGHT: Color('#E9F1FB'),
	BLUE_LIGHT_ACTIVE: Color('#D3E4F7'),
	BLUE: Color('#0061E5'),
	BLUE_SELECTED: Color('#017AD5').alpha(0.05),
	BLUE_HOVER: Color('#017AD5').alpha(0.038),
	GREEN: Color('#00FFFF'),
	FACEBOOK: Color('#3B5998'),
};

export const THEME = {
	FONT:
		'-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
	HEADER_HEIGHT: 50,
	HEADER_THRESHOLD: 100,
	FOOTER_HEIGHT: 50,
	NAV_HEIGHT: 0,
	CURRENCY_ICON_SIZE: 36,
	SECTION_PADDING_H: 20,
	SECTION_PADDING_V: 15,
	FONT_SIZE_H1: 28,
	FONT_SIZE_REGULAR: 14,
	FONT_SIZE_BIG: 22,
	FONT_SIZE_MEDIUM: 18,
	FONT_SIZE_SMALL: 12,
	FONT_SIZE_TINY: 10,
	BOX_SHADOW_ELEVATION_MINIMAL: `0 1px 2px 0 ${COLORS.BLACK.alpha(
		0.07,
	).toString()}`,
	BOX_SHADOW_ELEVATION_MINIMAL_INVERTED: `0 -1px 2px 0 ${COLORS.BLACK.alpha(
		0.07,
	).toString()}`,
	BOX_SHADOW_ELEVATION_1: `0 3px 9px 0 ${COLORS.BLACK.alpha(0.12).toString()}`,
	BOX_SHADOW_ELEVATION_2: `0 8px 15px 0 ${COLORS.BLACK.alpha(0.09).toString()}`,
	PAGE_SIDE_PADDING_DESKTOP: 40,
	PAGE_SIDE_PADDING_PHONE: 20,
	PAGE_MAX_WIDTH: 1600,
	INPUT_HEIGHT: 46,
};

export const COMMON_STYLES = {
	BOLD: css`
		font-weight: 600;
	`,

	LINK: css`
		color: ${COLORS.GREEN.toString()};
		text-decoration: none;
		outline: none;

		&:link {
			color: ${COLORS.GREEN.toString()};
		}

		&:visited {
			color: ${COLORS.GREEN.toString()};
		}

		&:hover {
			color: ${COLORS.GREEN.lighten(1.25).toString()};
		}

		&:active {
			color: ${COLORS.GREEN.lighten(1).toString()};
		}
	`,

	LINK_WHITE: css`
		color: ${COLORS.WHITE.toString()};
		text-decoration: 'none';

		&:link {
			color: ${COLORS.WHITE.toString()};
		}

		&:visited {
			color: ${COLORS.WHITE.toString()};
		}

		&:hover {
			color: ${COLORS.WHITE.alpha(0.6).toString()};
		}

		&:active {
			color: ${COLORS.WHITE.alpha(0.75).toString()};
		}
	`,

	SMALL_TEXT: css`
		font-size: ${THEME.FONT_SIZE_SMALL}px;
	`,

	FILTER_ACCENT: css`
		color: ${COLORS.BLACK.toString()};
		font-weight: 600;
	`,
};
